import { useEditorHandler } from '../context/EditorHandlerContext';

function PageEditor() {
	const { handleAddRow } = useEditorHandler();

	return (
		<div className='section'>
			<div className='section-header'>
				Page
			</div>

			<div className='actions'>
				<button className='action' onClick={ handleAddRow }>
					Add row
				</button>
			</div>
		</div>
	);
}

export { PageEditor };
