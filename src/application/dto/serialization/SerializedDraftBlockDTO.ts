import { SerializedObjectDTO } from './SerializedObjectDTO';

import type { DraftBlock }     from '@domain/entities';

export class SerializedDraftBlockDTO extends SerializedObjectDTO {
	constructor(draftBlock: DraftBlock) {
		super();
		this.id       = draftBlock.getId();
		this.content  = draftBlock.getContent();
		this.parentId = draftBlock.getParentId();
		this.__kind   = draftBlock.getKind();
	}
}
