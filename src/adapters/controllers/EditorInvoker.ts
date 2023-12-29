import {
	AddColToRowCommand,
	AlignTextCommand,
	SetImageUrlCommand,
	AddRowToPageCommand,
	InputTextCommand,
	AddTextToColCommand,
	AddImageToColCommand,
	AddDraftToColCommand
} from '@application/interactors';
import { ElementGuardService }        from '@application/services';

import type { ImageBlock, TextBlock } from '@domain/entities';
import type {
	Column,
	Row,
	Page
} from '@domain/aggregates';
import type { ElementSearcherService } from '@application/services';
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
		private searcher: ElementSearcherService,
		private repository: ElementStateRepository,
		private updateView: () => void
	) {}

	addRow() {
		const command      = new AddRowToPageCommand(this.page);
		const newElementId = command.execute();

		this.saveAndRefresh();

		return newElementId;
	}

	addCol(elementId: number) {
		const element = this.searcher.findElementById<Row | Column>(this.page, elementId);

		if (!element?.getParentId()) {
			return null;
		}

		const targetRow = ElementGuardService.isColumn(element)
			? this.searcher.findElementById<Row>(this.page, element.getParentId())!
			: element;

		return this.addColToRow(targetRow);
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

	private addColToRow(row: Row) {
		const command      = new AddColToRowCommand(row);
		const newElementId = command.execute();

		// initialize col with draft block
		this.addDraftToCol(newElementId);

		this.saveAndRefresh();

		return newElementId;
	}

	private addDraftToCol(colId: number) {
		const col = this.searcher.findElementById<Column>(this.page, colId);

		if (col) {
			const command = new AddDraftToColCommand(col);
			command.execute();

			this.saveAndRefresh();
		}
	}

	private saveAndRefresh() {
		this.updateView();
		this.repository.save(this.page);
	}
}
