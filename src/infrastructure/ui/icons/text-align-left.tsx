import type { FC, SVGProps } from 'react';

export const TextAlignLeft: FC<SVGProps<SVGSVGElement>> = props => (
	<svg
		fill='currentColor'
		height='10'
		viewBox='0 0 14 10'
		width='14'
		xmlns='http://www.w3.org/2000/svg'
		{ ...props }
	>
		<path d='M0 0h14v1H0V0zm0 4h8v1H0V4zm10 4H0v1h10V8z' />
	</svg>
);
