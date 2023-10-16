import { Element }             from './Element';

import type { ElementVisitor } from '../interfaces/usecases/ElementVisitor';
import type { ImageBlock }     from './ImageBlock';
import type { TextBlock }      from './TextBlock';

export type ColumnBlock = ImageBlock | TextBlock;

export class Column extends Element<ColumnBlock | null> {
	removeContent(): void {
		this.content = null;
	}

	accept<ReturnType>(visitor: ElementVisitor<ReturnType>): ReturnType {
		return visitor.visitColumn(this);
	}
}
