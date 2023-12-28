import { ElementKinds }        from '@domain/enums/ElementsKinds';

import { Element }             from '../entities/Element';

import type { Column }         from './Column';
import type { ElementVisitor } from '../interfaces/usecases/ElementVisitor';

export class Row extends Element<Column[]> {
	protected readonly kind = ElementKinds.Row;
	protected override content: Column[] = [];

	addColumn(column: Column): void {
		this.content.push(column);
	}

	removeColumn(column: Column): void {
		const index = this.content.indexOf(column);

		if (index > -1) {
			this.content.splice(index, 1);
		}
	}

	removeContent(): void {
		this.content = [];
	}

	accept<ReturnType>(visitor: ElementVisitor<ReturnType>): ReturnType {
		return visitor.visitRow(this);
	}
}
