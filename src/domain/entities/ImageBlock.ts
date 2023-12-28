import { ColumnChildKinds }    from '@domain/enums/ColumnChildKinds';

import { Element }             from './Element';

import type { IdGenerator }    from '@utility/id/IdGenerator';
import type { ElementVisitor } from '../interfaces/usecases/ElementVisitor';

type Content = string | null;

export class ImageBlock extends Element<Content> {
	protected readonly kind = ColumnChildKinds.ImageBlock;

	constructor(idGenerator: IdGenerator) {
		super(idGenerator);

		this.content = null;
	}

	removeContent(): void {
		this.content = null;
	}

	accept<ReturnType>(visitor: ElementVisitor<ReturnType>): ReturnType {
		return visitor.visitImageBlock(this);
	}
}
