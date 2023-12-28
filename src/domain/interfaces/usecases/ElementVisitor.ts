import type {
	DraftBlock,
	ImageBlock,
	TextBlock
} from '@domain/entities';
import type {
	Column,
	Row,
	Page
} from '@domain/aggregates';

export interface ElementVisitor<ResultType> {
	visitDraftBlock(block: DraftBlock): ResultType;
	visitTextBlock(block: TextBlock): ResultType;
	visitImageBlock(block: ImageBlock): ResultType;
	visitColumn(col: Column): ResultType;
	visitRow(Row: Row): ResultType;
	visitPage(page: Page): ResultType;
}
