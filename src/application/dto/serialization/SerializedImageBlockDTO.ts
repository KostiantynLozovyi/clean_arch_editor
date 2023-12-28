import { SerializedObjectDTO } from './SerializedObjectDTO';

import type { ImageBlock }     from '@domain/entities';

export class SerializedImageBlockDTO extends SerializedObjectDTO {
	constructor(imageBlock: ImageBlock) {
		super();
		this.id       = imageBlock.getId();
		this.content  = imageBlock.getContent();
		this.parentId = imageBlock.getParentId();
		this.__kind   = imageBlock.getKind();
	}
}
