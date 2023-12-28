import { ColumnComponent }     from '@adapters/views/elements/Column';
import { Row }                 from '@infrastructure/ui/row';

import { useSelectedElement }  from '../context/SelectedElementContext';

import type { Row as RowType } from '@domain/aggregates';

type RowComponentProps = {
	row: RowType
};

function RowComponent(props: Readonly<RowComponentProps>) {
	const { row } = props;

	const { handleSelectElement, isSelectedElement } = useSelectedElement();

	return (
		<Row
			selected={ isSelectedElement(row.getId()) }
			onSelect={ handleSelectElement(row.getId()) }
		>
			{ row.getContent().map((col: any) => (
				<ColumnComponent col={ col } key={ col.getId() } />
			)) }
		</Row>
	);
}

export { RowComponent };
