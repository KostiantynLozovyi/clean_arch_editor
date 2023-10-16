import classNames              from 'classnames';

import { SelectableContainer } from '../selectable-container';

import type { FC }             from 'react';

export interface RowProps {
	children?: React.ReactNode;
	selected?: boolean;
	onSelect?(): void;
}

export const Row: FC<RowProps> = ({
	selected,
	...props
}) => (
	<SelectableContainer className={ classNames('row', { selected }) } { ...props } />
);
