import { useSelectedElement } from '../context/SelectedElementContext';
import { useEditorHandler }   from '../context/EditorHandlerContext';

function RowEditor() {
	const { handleAddColumn }   = useEditorHandler();
	const { selectedElementId } = useSelectedElement();

	if (!selectedElementId) {
		return null;
	}

	return (
		<div className='section'>
			<div className='section-header'>
				Row
			</div>

			<div className='actions'>
				<button className='action' onClick={ handleAddColumn(selectedElementId) }>
					Add column
				</button>
			</div>
		</div>
	);
}

export { RowEditor };
