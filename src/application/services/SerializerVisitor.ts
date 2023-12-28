import {
	SerializedTextBlockDTO,
	SerializedImageBlockDTO,
	SerializedColumnDTO,
	SerializedRowDTO,
	SerializedPageDTO
} from '@application/dto/';

import type { ImageBlock, TextBlock } from '@domain/entities';
import type { SerializedObjectDTO }   from '@application/dto/';
import type {
	Column,
	Page,
	Row
} from '@domain/aggregates';
import type { ElementVisitor } from '@domain/interfaces/usecases/ElementVisitor';

export class SerializerVisitor implements ElementVisitor<SerializedObjectDTO | null> {
	visitTextBlock(textBlock: TextBlock): SerializedObjectDTO {
		return new SerializedTextBlockDTO(textBlock);
	}

	visitImageBlock(imageBlock: ImageBlock) {
		return new SerializedImageBlockDTO(imageBlock);
	}

	visitColumn(col: Column) {
		return new SerializedColumnDTO(col);
	}

	visitRow(row: Row) {
		return new SerializedRowDTO(row);
	}

	visitPage(page: Page) {
		return new SerializedPageDTO(page);
	}
}
