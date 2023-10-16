import type {
	Column,
	ImageBlock,
	TextBlock
} from '@domain/entities';

// leaf block is ImageBlock | TextBlock and this element always
// located in column
function getLeafBlock<T extends TextBlock | ImageBlock>(col: Column | null): T | null {
	return (col?.getContent() ?? null) as T;
}

export { getLeafBlock };
