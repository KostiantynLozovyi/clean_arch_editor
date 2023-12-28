import { ElementFactory } from '@domain/factories';
import { ElementKinds }   from '@domain/enums/ElementsKinds';

import type { Column }    from '@domain/aggregates';
import type { Command }   from '@domain/interfaces/usecases/Command';

export class AddDraftToColCommand implements Command {
	constructor(private receiver: Column) {}

	execute(): void {
		const draftBlock = new ElementFactory().createElement(ElementKinds.DraftBlock);
		this.receiver.setContent(draftBlock);

		draftBlock.setParentId(this.receiver.getId());
	}
}
