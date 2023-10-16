import {
	AddColToRowCommand,
	AlignTextCommand,
	SetImageUrlCommand,
	AddRowToPageCommand,
	InputTextCommand,
	AddTextToColCommand,
	AddImageToColCommand
} from '@application/usecases';
import { isColumn } from '@adapters/views/utils/elementGuards';

import type {
	Column,
	ImageBlock,
	TextBlock,
	Row,
	Page
} from '@domain/entities';
import type { ElementSearcher }        from '@application/services';
import type { TextContent }            from '@domain/entities/TextBlock';
import type { ElementStateRepository } from '@domain/interfaces/repository/ElementStateRepository';

export class EditorInvoker {
	// for Undo/Redo feature
	// private commandHistory: Command[] = [];
	// private undoStack: Command[] = [];
	// private redoStack: Command[] = [];

	// we also can implement delete feature by using commands

	constructor(
		private page: Page,
		private searcher: ElementSearcher,
		private repository: ElementStateRepository,
		private updateView: () => void
	) {}

	addRow() {
		const command      = new AddRowToPageCommand(this.page);
		const newElementId = command.execute();

		this.saveAndRefresh();

		return newElementId;
	}

	addCol(rowId: number) {
		const rowOrCol = this.searcher.findElementById<Row>(this.page, rowId);

		if (isColumn(rowOrCol)) {
			const parent       = this.searcher.findElementById<Row>(
				this.page,
				rowOrCol.getParentId()
			);
			const command      = new AddColToRowCommand(parent!);
			const newElementId = command.execute();

			this.saveAndRefresh();

			return newElementId;
		}

		if (rowOrCol) {
			const command      = new AddColToRowCommand(rowOrCol);
			const newElementId = command.execute();

			this.saveAndRefresh();

			return newElementId;
		}

		return null;
	}

	addText(colId: number) {
		const col = this.searcher.findElementById<Column>(this.page, colId);

		if (col) {
			const command = new AddTextToColCommand(col);
			command.execute();

			this.saveAndRefresh();
		}
	}

	addImage(colId: number) {
		const col = this.searcher.findElementById<Column>(this.page, colId);

		if (col) {
			const command = new AddImageToColCommand(col);
			command.execute();

			this.saveAndRefresh();
		}
	}

	setAlign(textBlockId: number, alignment: TextContent['alignment']) {
		const textBlock = this.searcher.findElementById<TextBlock>(
			this.page,
			textBlockId
		);

		if (textBlock) {
			const command = new AlignTextCommand(textBlock, alignment);
			command.execute();

			this.saveAndRefresh();
		}
	}

	setText(textBlockId: number, text: string) {
		const textBlock = this.searcher.findElementById<TextBlock>(
			this.page,
			textBlockId
		);

		if (textBlock) {
			const command = new InputTextCommand(textBlock, text);
			command.execute();

			this.saveAndRefresh();
		}
	}

	setImageUrl(imageId: number, url: string) {
		const imageBlock = this.searcher.findElementById<ImageBlock>(this.page, imageId);

		if (imageBlock) {
			const command = new SetImageUrlCommand(imageBlock, url);
			command.execute();

			this.saveAndRefresh();
		}
	}

	private saveAndRefresh() {
		this.updateView();
		this.repository.save(this.page);
	}
}
