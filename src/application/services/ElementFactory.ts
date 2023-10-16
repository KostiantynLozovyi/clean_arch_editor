import {
	Column,
	ImageBlock,
	Page,
	Row,
	TextBlock
} from '@domain/entities';
import { IdGenerator }                            from '@utility/id/IdGenerator';

import type { ElementKinds }                      from '@domain/enums/ElementsKinds';
import type { ElementFactory as IElementFactory } from '@domain/interfaces/usecases/ElementFactory';
import type { Element }                           from '@domain/entities/Element';

type ElementMap<T extends ElementKinds> = {
	Column: Column,
	Row: Row,
	Page: Page,
	TextBlock: TextBlock,
	ImageBlock: ImageBlock
}[T];

export class ElementFactory implements IElementFactory {
	createElement<T extends ElementKinds>(kind: T): ElementMap<T> {
		const idGenerator                = new IdGenerator();
		let element: Element<any> | null = null;

		switch (kind) {
			case 'TextBlock': {
				element = new TextBlock(idGenerator);
				break;
			}
			case 'ImageBlock': {
				element = new ImageBlock(idGenerator);
				break;
			}
			case 'Column': {
				element = new Column(idGenerator);
				break;
			}
			case 'Row': {
				element = new Row(idGenerator);
				break;
			}
			case 'Page': {
				element = new Page(idGenerator);
				break;
			}

			default: {
				throw new Error(`Unknown kind: ${ kind }`);
			}
		}

		return element as ElementMap<T>;
	}
}
