import { SerializedObjectDTO } from './SerializedObjectDTO';

import type { TextBlock }      from '@domain/entities';

export class SerializedTextBlockDTO extends SerializedObjectDTO {
	constructor(textBlock: TextBlock) {
		super();
		this.id       = textBlock.getId();
		this.content  = textBlock.getContent();
		this.parentId = textBlock.getParentId();
		this.__kind   = textBlock.getKind();
	}
}
