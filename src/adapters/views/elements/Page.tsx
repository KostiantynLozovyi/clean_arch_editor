import { Stage }              from '@infrastructure/ui/stage';
import { useSelectedElement } from '@adapters/views/context/SelectedElementContext';

import { RowComponent }       from './Row';

import type { Page }          from '@domain/aggregates';

type PageComponentProps = {
	page: Page
};

function PageComponent(props: Readonly<PageComponentProps>) {
	const { page } = props;

	const { handleUnselectElement } = useSelectedElement();

	return (
		<Stage onSelect={ handleUnselectElement }>
			{ page.getContent().map((row: any) => (
				<RowComponent key={ row.id } row={ row } />
			)) }
		</Stage>
	);
}

export { PageComponent };
