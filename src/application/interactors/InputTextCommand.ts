import type { Command }                from '@domain/interfaces/usecases/Command';
import type { TextContent, TextBlock } from '../../domain/entities/TextBlock';

export class InputTextCommand implements Command {
	constructor(private receiver: TextBlock, private text: TextContent['text']) {}

	execute(): void {
		this.receiver.setContent({
			...this.receiver.getContent(),
			text: this.text
		});
	}
}
