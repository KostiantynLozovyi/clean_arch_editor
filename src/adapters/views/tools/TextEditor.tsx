import { Icons }              from '@infrastructure/ui/icons';
import { isColumn }           from '@adapters/views/utils/elementGuards';

import { getLeafBlock }       from '../utils/elementSelector';
import { useSelectedElement } from '../context/SelectedElementContext';
import { useEditorHandler }   from '../context/EditorHandlerContext';

import type { TextBlock }     from '@domain/entities';

function TextEditor() {
	const { selectedElement }                      = useSelectedElement();
	const { handleSetAlignment, handleTextChange } = useEditorHandler();

	if (!isColumn(selectedElement)) {
		return null;
	}

	const text = getLeafBlock<TextBlock>(selectedElement);

	if (!text) {
		return null;
	}

	return (
		<div className='section'>
			<div className='section-header'>
				Text
			</div>

			<div className='button-group-field'>
				<label>
					Alignment
				</label>

				<div className='button-group'>
					<button
						className={
							text.getContent().alignment === 'left'
								? 'selected'
								: ''
						}
						onClick={ () => {
							handleSetAlignment(text.getId(), 'left');
						} }
					>
						<Icons.TextAlignLeft />
					</button>

					<button
						className={
							text.getContent().alignment === 'center'
								? 'selected'
								: ''
						}
						onClick={ () => {
							handleSetAlignment(text.getId(), 'center');
						} }
					>
						<Icons.TextAlignCenter />
					</button>

					<button
						className={
							text.getContent().alignment === 'right'
								? 'selected'
								: ''
						}
						onClick={ () => {
							handleSetAlignment(text.getId(), 'right');
						} }
					>
						<Icons.TextAlignRight />
					</button>
				</div>
			</div>

			<div className='textarea-field'>
				<textarea
					placeholder='Enter text'
					rows={ 8 }
					value={ text.getContent().text ?? '' }
					onChange={ handleTextChange(text.getId()) }
				/>
			</div>
		</div>
	);
}

export { TextEditor };
