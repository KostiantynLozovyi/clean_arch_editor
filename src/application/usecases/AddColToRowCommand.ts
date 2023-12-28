import { ElementFactory } from '@application/services';
import { ElementKinds }   from '@domain/enums/ElementsKinds';

import type { Row }       from '@domain/aggregates';
import type { Command }   from '@domain/interfaces/usecases/Command';

export class AddColToRowCommand implements Command {
	constructor(private receiver: Row) {}

	execute(): number {
		const col = new ElementFactory().createElement(ElementKinds.Column);
		this.receiver.addColumn(col);

		col.setParentId(this.receiver.getId());

		return col.getId();
	}
}
