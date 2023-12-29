import { ElementGuardService } from '@application/services';

import { getLeafBlock }        from '../utils/elementSelector';
import { useSelectedElement }  from '../context/SelectedElementContext';
import { useEditorHandler }    from '../context/EditorHandlerContext';

import type { ImageBlock }     from '@domain/entities';

function ImageEditor() {
	const { handleSetImageUrl } = useEditorHandler();
	const { selectedElement }   = useSelectedElement();

	if (!ElementGuardService.isColumn(selectedElement)) {
		return null;
	}

	const image = getLeafBlock<ImageBlock>(selectedElement);

	if (!image) {
		return null;
	}

	return (
		<div className='section'>
			<div className='section-header'>
				Image
			</div>

			<div className='text-field'>
				<label htmlFor='image-url'>
					URL
				</label>

				<input
					id='image-url'
					type='text'
					value={ image?.getContent() ?? '' }
					onChange={ handleSetImageUrl(image.getId()) }
				/>
			</div>
		</div>
	);
}

export { ImageEditor };
