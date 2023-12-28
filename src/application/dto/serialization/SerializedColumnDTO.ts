import {
	DraftBlock,
	ImageBlock,
	TextBlock
} from '@domain/entities';

import { SerializedDraftBlockDTO } from './SerializedDraftBlockDTO';
import { SerializedImageBlockDTO } from './SerializedImageBlockDTO';
import { SerializedObjectDTO }     from './SerializedObjectDTO';
import { SerializedTextBlockDTO }  from './SerializedTextBlockDTO';

import type { Column }             from '@domain/aggregates';
import type { ColumnBlock }        from '@domain/aggregates/Column';

export class SerializedColumnDTO extends SerializedObjectDTO {
	constructor(column: Column) {
		super();
		this.id       = column.getId();
		this.parentId = column.getParentId();
		this.__kind   = column.getKind();
		this.content  = this.getContent(column.getContent());
	}

	private getContent<T extends ColumnBlock | null>(block: T) {
		if (!block) {
			return null;
		}

		switch (true) {
			case block instanceof TextBlock: {
				return new SerializedTextBlockDTO(block as TextBlock);
			}

			case block instanceof ImageBlock: {
				return new SerializedImageBlockDTO(block as ImageBlock);
			}

			case block instanceof DraftBlock: {
				return new SerializedDraftBlockDTO(block as DraftBlock);
			}

			default: {
				return null;
			}
		}
	}
}
