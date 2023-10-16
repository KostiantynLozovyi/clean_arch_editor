/* eslint-disable react/destructuring-assignment */
import MarkdownBase           from 'markdown-to-jsx';

import type { FC }            from 'react';
import type { MarkdownToJSX } from 'markdown-to-jsx';

export interface MarkdownProps {
	id?: string;
	className?: string;
	children: string;
	options?: MarkdownToJSX.Options;
}

export const Markdown: FC<MarkdownProps> = props => (
	<MarkdownBase { ...props } options={ { forceBlock: true, ...props.options } } />
);
