import classNames              from 'classnames';

import { SelectableContainer } from '../selectable-container';

import type { FC }             from 'react';

export interface ColumnProps {
	children?: React.ReactNode;
	selected?: boolean;
	onSelect?(): void;
}

export const Column: FC<ColumnProps> = ({
	selected,
	...props
}) => (
	<SelectableContainer className={ classNames('column', { selected }) } { ...props } />
);
