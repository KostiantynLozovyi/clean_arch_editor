import { ElementKinds } from '@domain/enums/ElementsKinds';

import { Element }      from '../entities/Element';

import type {
	DraftBlock,
	ImageBlock,
	TextBlock
} from '../entities';
import type { ElementVisitor } from '../interfaces/usecases/ElementVisitor';

export type ColumnBlock = ImageBlock | TextBlock | DraftBlock;

export class Column extends Element<ColumnBlock | null> {
	protected readonly kind = ElementKinds.Column;

	removeContent(): void {
		this.content = null;
	}

	accept<ReturnType>(visitor: ElementVisitor<ReturnType>): ReturnType {
		return visitor.visitColumn(this);
	}
}
