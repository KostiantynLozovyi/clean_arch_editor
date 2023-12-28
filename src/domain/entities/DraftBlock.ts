import { ColumnChildKinds }    from '@domain/enums/ColumnChildKinds';

import { Element }             from './Element';

import type { IdGenerator }    from '@utility/id/IdGenerator';
import type { ElementVisitor } from '../interfaces/usecases/ElementVisitor';

export class DraftBlock extends Element<null> {
	protected readonly kind = ColumnChildKinds.DraftBlock;

	constructor(idGenerator: IdGenerator) {
		super(idGenerator);
		this.content = null;
	}

	removeContent(): void {
		// TODO: fix this
		throw new Error('Method not implemented.');
	}

	accept<ReturnType>(visitor: ElementVisitor<ReturnType>): ReturnType {
		return visitor.visitDraftBlock(this);
	}
}
