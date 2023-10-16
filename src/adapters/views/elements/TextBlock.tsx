import { Markdown }       from '@infrastructure/ui/markdown';

import type { TextBlock } from '@domain/entities';

type TextBlockComponentProps = {
	block: TextBlock
};

const alignClassnamesMap = {
	left  : 'text-align-left',
	center: 'text-align-center',
	right : 'text-align-right'
};

function TextBlockComponent(props: TextBlockComponentProps) {
	const { block } = props;

	return (
		<div>
			<Markdown className={ alignClassnamesMap[block.getAlignment()] }>
				{ block.getContent().text ?? '' }
			</Markdown>
		</div>
	);
}

export { TextBlockComponent };
