import type { Element } from '@domain/entities';

export class ElementSearcher {
	findElementById<T extends Element<any>>(
		root: Element<any>,
		targetId?: number | null
	): T | null {
		if (!targetId) {
			return null;
		}

		return this.findElementByIdRecursive(root, targetId);
	}

	private findElementByIdRecursive<T extends Element<any>>(
		element: Element<any>,
		targetId: number
	): T | null {
		if (element.getId() === targetId) {
			return element as T;
		}

		const content = element.getContent();

		if (Array.isArray(content)) {
			for (const child of content) {
				const found = this.findElementByIdRecursive(child, targetId);
				if (found) {
					return found as T;
				}
			}

			return null;
		}

		if (this.isElement(content)) {
			const found = this.findElementByIdRecursive(content, targetId);
			if (found) {
				return found as T;
			}
		}

		return null;
	}

	private isElement(content: any): content is Element<any> {
		return content && typeof content === 'object' && 'getId' in content;
	}
}
