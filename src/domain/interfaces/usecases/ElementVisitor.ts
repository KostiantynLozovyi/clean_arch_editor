import type { ImageBlock, TextBlock } from '@domain/entities';
import type {
	Column,
	Row,
	Page
} from '@domain/aggregates';

export interface ElementVisitor<ResultType> {
	visitTextBlock(block: TextBlock): ResultType;
	visitImageBlock(block: ImageBlock): ResultType;
	visitColumn(col: Column): ResultType;
	visitRow(Row: Row): ResultType;
	visitPage(page: Page): ResultType;
}
