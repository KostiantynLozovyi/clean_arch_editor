import type { FC, SVGProps } from 'react';

export const Text: FC<SVGProps<SVGSVGElement>> = props => (
	<svg
		fill='currentColor'
		height='10'
		viewBox='0 0 10 10'
		width='10'
		xmlns='http://www.w3.org/2000/svg'
		{ ...props }
	>
		<path d='M0 0h10v3H9V1H5.5v8H7v1H3V9h1.5V1H1v2H0V0z' />
	</svg>
);
