import type { IdGenerator }    from '@utility/id/IdGenerator';
import type { ElementVisitor } from '../interfaces/usecases/ElementVisitor';

export abstract class Element<Content> {
	protected id: number;
	protected content!: Content;
	protected parentId: number | null = null;

	constructor(protected idGenerator: IdGenerator) {
		this.id = idGenerator.generate();
	}

	setContent(content: Content) {
		this.content = content;
	}

	getContent(): Content {
		return this.content;
	}

	setParentId(parentId: number | null) {
		this.parentId = parentId;
	}

	getParentId(): number | null {
		return this.parentId;
	}

	getId(): number {
		return this.id;
	}

	setId(id: number) {
		this.id = id;
	}

	abstract accept<ReturnType>(visitor: ElementVisitor<ReturnType>): ReturnType;

	abstract removeContent(): void;
}
