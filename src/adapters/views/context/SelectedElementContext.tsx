import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState
} from 'react';

import type { Element }           from '@domain/entities';
import type { Page }              from '@domain/aggregates';
import type { ElementSearcher }   from '@application/services';
import type { PropsWithChildren } from 'react';

type SelectedElementContextType = {
	selectedElementId: number | null,
	selectedElement: Element<any> | null,
	isSelectedElement(id: number): boolean,
	handleSelectElement(id: number): () => void,
	setSelectedElementId(id: number | null): void
};

const SelectedElementContext = createContext<SelectedElementContextType | null>(null);

type SelectedElementProviderProps = {
	searcher: ElementSearcher,
	page: Page
};

function useSelectedElement() {
	const context = useContext(SelectedElementContext);

	if (!context) {
		throw new Error(
			'useSelectedElement must be used within a SelectedElementProvider'
		);
	}

	return context;
}

const SelectedElementProvider = (
	props: PropsWithChildren<SelectedElementProviderProps>
) => {
	const { children, searcher, page } = props;

	const [ selectedElementId, setSelectedElementId ] = useState<number | null>(null);
	const selectedElement                             = searcher.findElementById(page, selectedElementId);

	function handleSelectElement(id: number) {
		return function () {
			setSelectedElementId(id);
		};
	}

	const isSelectedElement = useCallback(
		(id: number) => selectedElementId === id,
		[ selectedElementId ]
	);

	const contextValue: SelectedElementContextType = useMemo(
		() => ({
			selectedElementId,
			handleSelectElement,
			setSelectedElementId,
			selectedElement,
			isSelectedElement
		}),
		[ isSelectedElement, selectedElement, selectedElementId ]
	);

	return (
		<SelectedElementContext.Provider value={ contextValue }>
			{ children }
		</SelectedElementContext.Provider>
	);
};

export { SelectedElementContext, SelectedElementProvider, useSelectedElement };
