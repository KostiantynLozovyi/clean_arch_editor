import { ElementKinds }        from '@domain/enums/ElementsKinds';

import { Element }             from '../entities/Element';

import type { ElementVisitor } from '../interfaces/usecases/ElementVisitor';
import type { ImageBlock }     from '../entities/ImageBlock';
import type { TextBlock }      from '../entities/TextBlock';

export type ColumnBlock = ImageBlock | TextBlock;

export class Column extends Element<ColumnBlock | null> {
	protected readonly kind = ElementKinds.Column;

	removeContent(): void {
		this.content = null;
	}

	accept<ReturnType>(visitor: ElementVisitor<ReturnType>): ReturnType {
		return visitor.visitColumn(this);
	}
}
