import {
	ImageBlock,
	TextBlock,
	DraftBlock
} from '@domain/entities';
import {
	Column,
	Row,
	Page
} from '@domain/aggregates';
import { IdGenerator }                            from '@utility/id/IdGenerator';

import type { ElementKinds }                      from '@domain/enums/ElementsKinds';
import type { ElementFactory as IElementFactory } from '@domain/factories/ElementFactory.interface';

type ElementMap<T extends ElementKinds> = {
	Column: Column,
	Row: Row,
	Page: Page,
	TextBlock: TextBlock,
	ImageBlock: ImageBlock,
	DraftBlock: DraftBlock
}[T];

export class ElementFactory implements IElementFactory {
	static ElementsMap = {
		Column,
		Row,
		Page,
		TextBlock,
		ImageBlock,
		DraftBlock
	};

	createElement<T extends ElementKinds>(kind: T): ElementMap<T> {
		const idGenerator        = new IdGenerator();
		const ElementConstructor = ElementFactory.ElementsMap[kind];

		if (!ElementConstructor) {
			throw new Error(`Element of kind ${ kind } is not supported`);
		}

		return new ElementConstructor(idGenerator) as ElementMap<T>;
	}
}
