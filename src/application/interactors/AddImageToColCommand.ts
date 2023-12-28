import { ElementFactory } from '@domain/factories';
import { ElementKinds }   from '@domain/enums/ElementsKinds';

import type { Column }    from '@domain/aggregates';
import type { Command }   from '@domain/interfaces/usecases/Command';

export class AddImageToColCommand implements Command {
	constructor(private receiver: Column) {}

	execute(): void {
		const imageBlock = new ElementFactory().createElement(ElementKinds.ImageBlock);
		this.receiver.setContent(imageBlock);

		imageBlock.setParentId(this.receiver.getId());
	}
}
