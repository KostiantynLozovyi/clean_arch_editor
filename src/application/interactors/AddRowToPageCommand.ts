import { ElementFactory } from '@domain/factories';
import { ElementKinds }   from '@domain/enums/ElementsKinds';

import type { Page }      from '@domain/aggregates';
import type { Command }   from '@domain/interfaces/usecases/Command';

export class AddRowToPageCommand implements Command {
	constructor(private receiver: Page) {}

	execute(): number {
		const row = new ElementFactory().createElement(ElementKinds.Row);
		this.receiver.addRow(row);

		row.setParentId(this.receiver.getId());

		return row.getId();
	}
}
