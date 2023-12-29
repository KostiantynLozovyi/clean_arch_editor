import { Column }                     from '@infrastructure/ui/column';
import { ColumnChildFactory }         from '@adapters/views/factories/ColumnChildFactory';
import { ElementGuardService }        from '@application/services';

import { useSelectedElement }         from '../context/SelectedElementContext';

import type { TextBlock, ImageBlock } from '@domain/entities';
import type { Column as ColumnType }  from '@domain/aggregates';

type ColumnComponentProps = {
	col: ColumnType
};

function ColumnComponent(props: Readonly<ColumnComponentProps>) {
	const { col } = props;

	const { handleSelectElement, isSelectedElement } = useSelectedElement();

	const kindOfElement = col.getContent()?.getKind();

	if (!ElementGuardService.isColumnChildKind(kindOfElement)) {
		return null;
	}

	const Content = ColumnChildFactory(kindOfElement);

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
