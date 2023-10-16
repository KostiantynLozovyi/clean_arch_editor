import { SerializerVisitor, ElementFactory } from '@application/services';

import type { ElementKinds }                 from '@domain/enums/ElementsKinds';
import type { Element }                      from '@domain/entities/Element';

export class ElementSerializer {
	private visitor = new SerializerVisitor();

	serialize(element: Element<any>) {
		return JSON.stringify(this.prepareForSerialization(element));
	}

	deserialize(serializedElement: string): Element<any> {
		const parsed = JSON.parse(serializedElement);

		return this.reconstructElement(parsed);
	}

	private prepareForSerialization(element: Element<any>): any {
		return element.accept(this.visitor);
	}

	private reconstructElement(parsed: any): Element<any> {
		if (!parsed.__kind) {
			return parsed;
		}

		const element = this.getElementInstance(parsed.__kind);

		element.setId(parsed.id);
		element.setContent(this.deserializeChildren(parsed));
		element.setParentId(parsed.parentId);

		return element;
	}

	private deserializeChildren(parsed: any): any {
		if (Array.isArray(parsed.content)) {
			return parsed.content.map((child: any) => this.reconstructElement(child));
		}

		if (typeof parsed.content === 'object' && parsed.content !== null) {
			return this.reconstructElement(parsed.content);
		}

		return parsed.content;
	}

	private getElementInstance(kind: ElementKinds): Element<any> {
		return new ElementFactory().createElement(kind);
	}
}
