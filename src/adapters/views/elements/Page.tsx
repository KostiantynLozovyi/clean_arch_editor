import { Stage }        from '@infrastructure/ui/stage';

import { RowComponent } from './Row';

import type { Page }    from '@domain/aggregates';

type PageComponentProps = {
	page: Page
};

function PageComponent(props: PageComponentProps) {
	const { page } = props;

	return (
		<Stage>
			{ page.getContent().map((row: any) => (
				<RowComponent key={ row.id } row={ row } />
			)) }
		</Stage>
	);
}

export { PageComponent };
