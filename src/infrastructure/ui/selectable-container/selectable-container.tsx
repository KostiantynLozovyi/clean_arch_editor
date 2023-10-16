import type { FC, FocusEventHandler } from 'react';

export interface SelectableContainerProps extends React.HTMLProps<HTMLDivElement> {
	onSelect?(): void;
}

/**
 * A container that triggers onSelect when it's clicked, but not when the click
 * is bubbling up from a nested SelectableContainer or form control.
 */
export const SelectableContainer: FC<SelectableContainerProps> = ({
	tabIndex = -1,
	onSelect,
	...props
}) => {
	// DOM focus events don't bubble through nested focusable elements. But in
	// React all events are normalized to bubble, and the focus event is triggered
	// on all focusable parents. This makes it more tricky to detect which one has
	// actually become focused.

	const handleFocus: FocusEventHandler<HTMLDivElement> = event => {
		props.onFocus?.(event);
		if (event.target === event.currentTarget) {
			onSelect?.();
		}
	};

	return (
		<>
			<div
				{ ...props }
				tabIndex={ tabIndex }
				onFocus={ handleFocus }
			/>
		</>
	);
};
