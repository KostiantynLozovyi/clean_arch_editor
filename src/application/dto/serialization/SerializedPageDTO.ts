import { SerializedObjectDTO } from './SerializedObjectDTO';
import { SerializedRowDTO }    from './SerializedRowDTO';

import type { Page }           from '@domain/aggregates';

export class SerializedPageDTO extends SerializedObjectDTO {
	constructor(page: Page) {
		super();
		this.id       = page.getId();
		this.content  = page.getContent().map(row => new SerializedRowDTO(row));
		this.parentId = page.getParentId();
		this.__kind   = page.getKind();
	}
}
