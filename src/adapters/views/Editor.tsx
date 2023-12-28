import { PageComponent } from '@adapters/views/elements/Page';

import type { Page }     from '@domain/aggregates';

type EditorProps = {
	page: Page
};

function Editor({ page }: Readonly<EditorProps>) {
	return <PageComponent page={ page } />;
}

export { Editor };
