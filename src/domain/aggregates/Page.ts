import { ElementKinds }        from '@domain/enums/ElementsKinds';

import { Element }             from '../entities/Element';

import type { ElementVisitor } from '../interfaces/usecases/ElementVisitor';
import type { Row }            from './Row';

export class Page extends Element<Row[]> {
	protected override readonly kind = ElementKinds.Page;
	protected override content: Row[] = [];

	addRow(row: Row): void {
		this.content.push(row);
	}

	removeRow(row: Row): void {
		const index = this.content.indexOf(row);

		if (index > -1) {
			this.content.splice(index, 1);
		}
	}

	override removeContent(): void {
		this.content = [];
	}

	override accept<ReturnType>(visitor: ElementVisitor<ReturnType>): ReturnType {
		return visitor.visitPage(this);
	}

	clone(): Page {
		const page = new Page(this.idGenerator);

		page.content = this.content;

		return page;
	}
}
