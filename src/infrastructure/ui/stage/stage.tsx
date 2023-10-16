import classNames              from 'classnames';

import { SelectableContainer } from '../selectable-container';

import type { FC }             from 'react';

export interface StageProps {
	children?: React.ReactNode;
	selected?: boolean;
	onSelect?(): void;
}

export const Stage: FC<StageProps> = ({
	selected,
	...props
}) => (
	<SelectableContainer className={ classNames('stage', { selected }) } { ...props } />
);
