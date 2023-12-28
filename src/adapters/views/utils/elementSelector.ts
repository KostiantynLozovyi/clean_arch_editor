import type { ColumnBlock } from '@domain/aggregates/Column';
import type { Column }      from '@domain/aggregates';

// leaf block is ImageBlock | TextBlock | DraftBlock and this element always
// located in column
function getLeafBlock<T extends ColumnBlock>(col: Column | null): T | null {
	return (col?.getContent() ?? null) as T;
}

export { getLeafBlock };
