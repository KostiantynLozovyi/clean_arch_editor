import { ImageBlock, TextBlock } from '@domain/entities';

import type {
	Column,
	Page,
	Row
} from '@domain/aggregates';
import type { ColumnBlock }    from '@domain/aggregates/Column';
import type { ElementVisitor } from '@domain/interfaces/usecases/ElementVisitor';

type SerializedObject = {
	__kind: string,
	id: number,
	parentId?: number | null,
	content: any
} | null;

export class SerializerVisitor implements ElementVisitor<SerializedObject> {
	visitTextBlock(textBlock: TextBlock): SerializedObject {
		return {
			id      : textBlock.getId(),
			content : textBlock.getContent(),
			parentId: textBlock.getParentId(),
			__kind  : textBlock.getKind()
		};
	}

	visitImageBlock(imageBlock: ImageBlock): SerializedObject {
		return {
			id      : imageBlock.getId(),
			content : imageBlock.getContent(),
			parentId: imageBlock.getParentId(),
			__kind  : imageBlock.getKind()
		};
	}

	visitColumn(col: Column): SerializedObject {
		return {
			id      : col.getId(),
			content : this.visitLeafBlock(col.getContent()),
			parentId: col.getParentId(),
			__kind  : col.getKind()
		};
	}

	visitRow(row: Row): SerializedObject {
		return {
			id      : row.getId(),
			content : row.getContent().map(col => this.visitColumn(col)),
			parentId: row.getParentId(),
			__kind  : row.getKind()
		};
	}

	visitPage(page: Page): SerializedObject {
		return {
			id      : page.getId(),
			content : page.getContent().map(row => this.visitRow(row)),
			parentId: null,
			__kind  : page.getKind()
		};
	}

	private visitLeafBlock<T extends ColumnBlock | null>(block: T): SerializedObject {
		if (!block) {
			return null as any;
		}

		switch (true) {
			case block instanceof TextBlock: {
				return this.visitTextBlock(block as TextBlock);
			}

			case block instanceof ImageBlock: {
				return this.visitImageBlock(block as ImageBlock);
			}

			default: {
				return null;
			}
		}
	}
}
