import {
	TextBlock,
	ImageBlock,
	Column,
	Row
} from '@domain/entities';

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

export { isTextBlock, isImageBlock, isColumn, isRow };
