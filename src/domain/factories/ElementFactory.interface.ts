import type { Element } from '@domain/entities/Element';

export interface ElementFactory<Content = any> {
	createElement(kind: string): Element<Content>;
}
