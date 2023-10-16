import { Column }              from '@infrastructure/ui/column';

import { isTextBlock }         from '../utils/elementGuards';
import { useSelectedElement }  from '../context/SelectedElementContext';
import { ImageBlockComponent } from './ImageBlock';
import { TextBlockComponent }  from './TextBlock';

import type {
	TextBlock,
	ImageBlock,
	Column as ColumnType
} from '@domain/entities';

type ColumnComponentProps = {
	col: ColumnType
};

function ColumnComponent(props: ColumnComponentProps) {
	const { col } = props;

	const { handleSelectElement, isSelectedElement } = useSelectedElement();

	const Content = isTextBlock(col.getContent())
		? TextBlockComponent
		: ImageBlockComponent;

	return (
		<Column
			selected={ isSelectedElement(col.getId()) }
			onSelect={ handleSelectElement(col.getId()) }
		>
			{ col.getContent() && 'id' in col.getContent()!
				? (
					<Content block={ col.getContent() as TextBlock & ImageBlock } />
				)
				: null }
		</Column>
	);
}

export { ColumnComponent };
