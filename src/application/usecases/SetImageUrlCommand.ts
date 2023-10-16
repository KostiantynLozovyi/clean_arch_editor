import type { ImageBlock } from '@domain/entities/ImageBlock';
import type { Command }    from '@domain/interfaces/usecases/Command';

export class SetImageUrlCommand implements Command {
	constructor(private receiver: ImageBlock, private url: string) {}

	execute(): void {
		this.receiver.setContent(this.url);
	}
}
