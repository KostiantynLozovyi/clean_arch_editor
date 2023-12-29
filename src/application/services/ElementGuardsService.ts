import { Column, Row }           from '@domain/aggregates';
import { TextBlock, ImageBlock } from '@domain/entities';
import { ColumnChildKinds }      from '@domain/enums/ColumnChildKinds';

export class ElementGuardService {
	static isTextBlock(element: any): element is TextBlock {
		return element instanceof TextBlock;
	}

	static isImageBlock(element: any): element is ImageBlock {
		return element instanceof ImageBlock;
	}

	static isColumn(element: any): element is Column {
		return element instanceof Column;
	}

	static isRow(element: any): element is Row {
		return element instanceof Row;
	}

	static isColumnChildKind(kind: any): kind is ColumnChildKinds {
		return Object.values(ColumnChildKinds).includes(kind);
	}
}
