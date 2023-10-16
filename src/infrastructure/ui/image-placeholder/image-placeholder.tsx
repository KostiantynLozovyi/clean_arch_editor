import type { FC } from 'react';

export const ImagePlaceholder: FC = () => (
	<div className='image-placeholder'>
		<svg
			fill='currentColor'
			viewBox='0 0 28 26'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M1 .75a1 1 0 0 0-1 1v22.5a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1V1.75a1 1 0 0 0-1-1H1Zm18.38 8.01 6.87 7.96V2.5H1.75V17l3.84-2.9a1 1 0 0 1 1.12-.04l3.23 2.23 8.04-7.6a.93.93 0 0 1 .72-.26 1 1 0 0 1 .68.33Zm6.87 14.74H1.75v-4.25l4.48-3.38 3.12 2.1c.37.23 1.06.19 1.38-.1l7.84-7.26 7.68 8.9v3.99Zm-17.5-14a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Z'
				fillRule='evenodd'
			/>
		</svg>
	</div>
);
