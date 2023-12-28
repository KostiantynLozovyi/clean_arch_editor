import type { ImageBlock, TextBlock } from '@domain/entities';
import type { Column }                from '@domain/aggregates';

// leaf block is ImageBlock | TextBlock and this element always
// located in column
function getLeafBlock<T extends TextBlock | ImageBlock>(col: Column | null): T | null {
	return (col?.getContent() ?? null) as T;
}

export { getLeafBlock };
