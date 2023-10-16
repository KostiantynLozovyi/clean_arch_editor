import type {
	Column,
	ImageBlock,
	Page,
	Row,
	TextBlock
} from '@domain/entities';

export interface ElementVisitor<ResultType> {
	visitTextBlock(block: TextBlock): ResultType;
	visitImageBlock(block: ImageBlock): ResultType;
	visitColumn(col: Column): ResultType;
	visitRow(Row: Row): ResultType;
	visitPage(page: Page): ResultType;
}
