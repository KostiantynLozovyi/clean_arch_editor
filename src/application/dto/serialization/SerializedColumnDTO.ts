import { SerializedObjectDTO }     from '@application/dto/serialization/SerializedObjectDTO';
import { SerializedTextBlockDTO }  from '@application/dto/serialization/SerializedTextBlockDTO';
import { ImageBlock, TextBlock }   from '@domain/entities';
import { SerializedImageBlockDTO } from '@application/dto/serialization/SerializedImageBlockDTO';

import type { ColumnBlock }        from '@domain/aggregates/Column';
import type { Column }             from '@domain/aggregates';

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
			return null as any;
		}

		switch (true) {
			case block instanceof TextBlock: {
				return new SerializedTextBlockDTO(block as TextBlock);
			}

			case block instanceof ImageBlock: {
				return new SerializedImageBlockDTO(block as ImageBlock);
			}

			default: {
				return null;
			}
		}
	}
}
