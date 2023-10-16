import { PageComponent } from '@adapters/views/elements/Page';

import type { Page }     from '@domain/entities';

type EditorProps = {
	page: Page
};

function Editor({ page }: EditorProps) {
	return <PageComponent page={ page } />;
}

export { Editor };
