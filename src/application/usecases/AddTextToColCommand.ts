import { ElementFactory } from '@application/services';
import { ElementKinds }   from '@domain/enums/ElementsKinds';

import type { Column }    from '@domain/entities';
import type { Command }   from '@domain/interfaces/usecases/Command';

export class AddTextToColCommand implements Command {
	constructor(private receiver: Column) {}

	execute(): void {
		const textBlock = new ElementFactory().createElement(ElementKinds.TextBlock);
		this.receiver.setContent(textBlock);

		textBlock.setParentId(this.receiver.getId());
	}
}
