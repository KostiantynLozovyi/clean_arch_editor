import { RowEditor }           from '@adapters/views/tools/RowEditor';
import { PageEditor }          from '@adapters/views/tools/PageEditor';
import { ElementGuardService } from '@application/services';

import { ColumnEditor }        from './tools/ColumnEditor';
import { TextEditor }          from './tools/TextEditor';
import { ImageEditor }         from './tools/ImageEditor';
import { useSelectedElement }  from './context/SelectedElementContext';

const {
	isRow,
	isColumn,
	isTextBlock,
	isImageBlock
} = ElementGuardService;

function ToolBar() {
	const { selectedElement } = useSelectedElement();

	return (
		<div className='properties'>
			<PageEditor />

			{ (isRow(selectedElement) || isColumn(selectedElement)) && <RowEditor /> }

			{ isColumn(selectedElement) && <ColumnEditor /> }

			{ isTextBlock(selectedElement?.getContent()) && <TextEditor /> }

			{ isImageBlock(selectedElement?.getContent()) && <ImageEditor /> }
		</div>
	);
}

export { ToolBar };
