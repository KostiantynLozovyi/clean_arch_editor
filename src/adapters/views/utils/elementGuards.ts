import { TextBlock, ImageBlock } from '@domain/entities';
import { Column, Row }           from '@domain/aggregates';
import { ColumnChildKinds }      from '@domain/enums/ColumnChildKinds';

function isTextBlock(element: any): element is TextBlock {
	return element instanceof TextBlock;
}

function isImageBlock(element: any): element is ImageBlock {
	return element instanceof ImageBlock;
}

function isColumn(element: any): element is Column {
	return element instanceof Column;
}

function isRow(element: any): element is Row {
	return element instanceof Row;
}

function isColumnChildKind(kind: any): kind is ColumnChildKinds {
	return Object.values(ColumnChildKinds).includes(kind);
}

export { isTextBlock, isImageBlock, isColumn, isRow, isColumnChildKind };
