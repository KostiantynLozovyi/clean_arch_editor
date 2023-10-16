import { ImagePlaceholder } from '@infrastructure/ui/image-placeholder';

import type { ImageBlock }  from '@domain/entities';

type ImageBlockComponentProps = {
	block: ImageBlock
};

function ImageBlockComponent(props: ImageBlockComponentProps) {
	const { block } = props;

	return (
		<>
			{ block.getContent()
				? (
					<img alt='Content' src={ block.getContent()! } />
				)
				: (
					<ImagePlaceholder />
				) }
		</>
	);
}

export { ImageBlockComponent };
