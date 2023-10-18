import { ImageBlock, TextBlock } from '@domain/entities';

import type {
	Column,
	Page,
	Row
} from '@domain/entities';
import type { ColumnBlock }    from '@domain/entities/Column';
import type { ElementVisitor } from '@domain/interfaces/usecases/ElementVisitor';

type SerializedObject = {
	__kind: string,
	id: number,
	parentId?: number | null,
	content: any
} | null;

export class SerializerVisitor implements ElementVisitor<SerializedObject> {
	visitTextBlock(block: TextBlock): SerializedObject {
		return {
			id      : block.getId(),
			content : block.getContent(),
			parentId: block.getParentId(),
			__kind  : 'TextBlock'
		};
	}

	visitImageBlock(block: ImageBlock): SerializedObject {
		return {
			id      : block.getId(),
			content : block.getContent(),
			parentId: block.getParentId(),
			__kind  : 'ImageBlock'
		};
	}

	visitColumn(col: Column): SerializedObject {
		return {
			id      : col.getId(),
			content : this.visitLeafBlock(col.getContent()),
			parentId: col.getParentId(),
			__kind  : 'Column'
		};
	}

	visitRow(row: Row): SerializedObject {
		return {
			id      : row.getId(),
			content : row.getContent().map(col => this.visitColumn(col)),
			parentId: row.getParentId(),
			__kind  : 'Row'
		};
	}

	visitPage(page: Page): SerializedObject {
		return {
			id      : page.getId(),
			content : page.getContent().map(row => this.visitRow(row)),
			parentId: null,
			__kind  : 'Page'
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
