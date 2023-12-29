import { useState }                     from 'react';

import { LocalStorageGateway }          from '@adapters/gateways/LocalStorageGateway';
import { ElementSearcherService }       from '@application/services';
import { ElementKinds }                 from '@domain/enums/ElementsKinds';
import { ElementSerializer }            from '@adapters/serializers/ElementSerializer';
import { ElementFactory }               from '@domain/factories';

import { SelectedElementProvider }      from './context/SelectedElementContext';
import { EditorHandlerContextProvider } from './context/EditorHandlerContext';
import { ToolBar }                      from './ToolBar';
import { Editor }                       from './Editor';

import type { Page }                    from '@domain/aggregates';

const elementsRepository = new LocalStorageGateway(new ElementSerializer());

function preparePage() {
	const persistentPage = elementsRepository.load();

	if (persistentPage) {
		return persistentPage;
	}

	const elementFactory = new ElementFactory();

	const page      = elementFactory.createElement(ElementKinds.Page);
	const row       = elementFactory.createElement(ElementKinds.Row);
	const col       = elementFactory.createElement(ElementKinds.Column);
	const textBlock = elementFactory.createElement(ElementKinds.TextBlock);

	textBlock.setContent({ text: '# Untitled', alignment: 'center' });
	textBlock.setParentId(col.getId());

	col.setContent(textBlock);
	col.setParentId(row.getId());

	row.addColumn(col);
	row.setParentId(page.getId());

	page.addRow(row);

	return page;
}

const page     = preparePage();
const searcher = new ElementSearcherService();

function App() {
	const [ appState, setAppState ] = useState<Page>(page);

	return (
		<div className='editor'>
			<SelectedElementProvider page={ page } searcher={ searcher }>
				<EditorHandlerContextProvider
					elementsRepository={ elementsRepository }
					page={ page }
					searcher={ searcher }
					updateAppState={ setAppState }
				>
					<Editor page={ appState } />

					<ToolBar />
				</EditorHandlerContextProvider>
			</SelectedElementProvider>
		</div>
	);
}

export { App };
