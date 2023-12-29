import { ColumnChildKinds }        from '@domain/enums/ColumnChildKinds';

import { ElementGuardService }     from '../../services/ElementGuardsService';
import { SerializedDraftBlockDTO } from './SerializedDraftBlockDTO';
import { SerializedImageBlockDTO } from './SerializedImageBlockDTO';
import { SerializedObjectDTO }     from './SerializedObjectDTO';
import { SerializedTextBlockDTO }  from './SerializedTextBlockDTO';

import type { Column }             from '@domain/aggregates';
import type { ColumnBlock }        from '@domain/aggregates/Column';

interface IContentConstructor {
	new(block: any): any;
}

export class SerializedColumnDTO extends SerializedObjectDTO {
	static ColumnContent: Record<ColumnChildKinds, IContentConstructor> = {
		[ColumnChildKinds.DraftBlock]: SerializedDraftBlockDTO,
		[ColumnChildKinds.ImageBlock]: SerializedImageBlockDTO,
		[ColumnChildKinds.TextBlock] : SerializedTextBlockDTO
	};

	constructor(column: Column) {
		super();
		this.id       = column.getId();
		this.parentId = column.getParentId();
		this.__kind   = column.getKind();
		this.content  = this.getContent(column.getContent());
	}

	private getContent<T extends ColumnBlock | null>(block: T) {
		if (!block) {
			return null;
		}

		const elementKind = block.getKind();

		if (!ElementGuardService.isColumnChildKind(elementKind)) {
			throw new Error(`Element of kind ${ elementKind } is not supported`);
		}

		const ContentConstructor = SerializedColumnDTO.ColumnContent[elementKind];

		return new ContentConstructor(block);
	}
}
