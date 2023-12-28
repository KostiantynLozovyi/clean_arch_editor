import { ImageBlockComponent }   from '@adapters/views/elements/ImageBlock';
import { TextBlockComponent }    from '@adapters/views/elements/TextBlock';
import { ElementKinds }          from '@domain/enums/ElementsKinds';

import type { ColumnChildKinds } from '@domain/enums/ColumnChildKinds';

const ColumnChildMap = {
	[ElementKinds.TextBlock] : TextBlockComponent,
	[ElementKinds.ImageBlock]: ImageBlockComponent
};

export function ColumnChildFactory(kindOfChild: ColumnChildKinds) {
	const ChildComponent = ColumnChildMap[kindOfChild];

	if (!ChildComponent) {
		throw new Error(`No component found for ${ kindOfChild }`);
	}

	return ChildComponent;
}
