import { ColumnChildKinds }    from '@domain/enums/ColumnChildKinds';

import { Element }             from './Element';

import type { IdGenerator }    from '@utility/id/IdGenerator';
import type { ElementVisitor } from '../interfaces/usecases/ElementVisitor';

export type TextContent = {
	text: string | null,
	alignment: 'left' | 'center' | 'right'
};

export class TextBlock extends Element<TextContent> {
	protected override readonly kind = ColumnChildKinds.TextBlock;

	constructor(idGenerator: IdGenerator) {
		super(idGenerator);
		this.content = {
			text     : null,
			alignment: 'left'
		};
	}

	override removeContent(): void {
		this.content = {
			text     : null,
			alignment: 'left'
		};
	}

	getText(): string | null {
		return this.content.text;
	}

	setText(text: string | null): void {
		this.content.text = text;
	}

	getAlignment(): 'left' | 'center' | 'right' {
		return this.content.alignment;
	}

	setAlignment(alignment: 'left' | 'center' | 'right'): void {
		this.content.alignment = alignment;
	}

	override accept<ReturnType>(visitor: ElementVisitor<ReturnType>): ReturnType {
		return visitor.visitTextBlock(this);
	}
}
