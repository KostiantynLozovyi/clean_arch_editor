import { SerializedRowDTO }    from '@application/dto/serialization/SerializedRowDTO';
import { SerializedObjectDTO } from '@application/dto/serialization/SerializedObjectDTO';

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
