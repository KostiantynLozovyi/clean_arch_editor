import type { FC, SVGProps } from 'react';

export const TextAlignRight: FC<SVGProps<SVGSVGElement>> = props => (
	<svg
		fill='currentColor'
		height='10'
		viewBox='0 0 14 10'
		width='14'
		xmlns='http://www.w3.org/2000/svg'
		{ ...props }
	>
		<path d='M0 0h14v1H0V0zm6 4h8v1H6V4zm8 4H4v1h10V8z' />
	</svg>
);
