import {
	createContext,
	useMemo,
	useContext
} from 'react';

import { EditorInvoker }      from '@adapters/controllers/EditorInvoker';
import { useSelectedElement } from '@adapters/views/context/SelectedElementContext';

import type {
	ChangeEvent,
	ChangeEventHandler,
	PropsWithChildren
} from 'react';
import type { ElementSearcher }        from '@application/services';
import type { Page }                   from '@domain/aggregates';
import type { ElementStateRepository } from '@domain/interfaces/repository/ElementStateRepository';

type EditorHandlerContextType = {
	handleAddColumn(rowId: number): () => void,
	handleAddRow(): void,
	handleSetAlignment(colId: number, alignment: 'left' | 'center' | 'right'): void,
	handleSetImageUrl(colId: number): ChangeEventHandler,
	handleTextChange(
		colId: number
	): (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
	setRowType(colId: number, type: 'image' | 'text'): void
};

type EditorHandlerContextProviderProps = {
	page: Page,
	searcher: ElementSearcher,
	elementsRepository: ElementStateRepository,
	updateAppState(page: Page): void
};

const EditorHandlerContext = createContext<EditorHandlerContextType | null>(null);

function useEditorHandler() {
	const context = useContext(EditorHandlerContext);

	if (!context) {
		throw new Error(
			'useEditorHandler must be used within a EditorHandlerContextProvider'
		);
	}

	return context;
}

function EditorHandlerContextProvider(
	props: PropsWithChildren<EditorHandlerContextProviderProps>
) {
	const {
		page,
		searcher,
		children,
		updateAppState,
		elementsRepository
	} = props;

	const editorController = new EditorInvoker(
		page,
		searcher,
		elementsRepository,
		handleUpdatePage
	);

	const { setSelectedElementId } = useSelectedElement();

	function handleUpdatePage() {
		// for update the state of the app we need to shallow clone the page
		updateAppState(page.clone());
	}

	function setRowType(colId: number, type: 'image' | 'text') {
		if (type === 'image') {
			editorController.addImage(colId);
			return;
		}

		editorController.addText(colId);
	}

	function handleTextChange(colId: number) {
		return function (event: React.ChangeEvent<HTMLTextAreaElement>) {
			const { value } = event.target;
			editorController.setText(colId, value);
		};
	}

	function handleSetAlignment(colId: number, alignment: 'left' | 'center' | 'right') {
		editorController.setAlign(colId, alignment);
	}

	function handleAddRow() {
		const newElementId = editorController.addRow();

		setSelectedElementId(newElementId);
	}

	function handleAddColumn(rowId: number) {
		return function () {
			const newElementId = editorController.addCol(rowId);

			if (newElementId) {
				setSelectedElementId(newElementId);
			}
		};
	}

	function handleSetImageUrl(colId: number) {
		return function (event: ChangeEvent<HTMLInputElement>) {
			const { value } = event.target;

			editorController.setImageUrl(colId, value);
		};
	}

	const handlers = useMemo(
		() => ({
			handleAddColumn,
			handleAddRow,
			handleSetAlignment,
			handleSetImageUrl,
			handleTextChange,
			setRowType
		}),

		// no need to update the handlers, they are static
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return (
		<EditorHandlerContext.Provider value={ handlers }>
			{ children }
		</EditorHandlerContext.Provider>
	);
}

export { EditorHandlerContext, EditorHandlerContextProvider, useEditorHandler };
