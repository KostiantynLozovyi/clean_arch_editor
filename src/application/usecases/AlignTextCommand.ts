import type { Command }                from '@domain/interfaces/usecases/Command';
import type { TextContent, TextBlock } from '../../domain/entities/TextBlock';

export class AlignTextCommand implements Command {
	constructor(
		private receiver: TextBlock,
		private alignment: TextContent['alignment']
	) {}

	execute(): void {
		this.receiver.setContent({
			...this.receiver.getContent(),
			alignment: this.alignment
		});
	}
}
