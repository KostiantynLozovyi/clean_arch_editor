import type { Page }                   from '@domain/entities';
import type { ElementSerializer }      from '@adapters/serializers/ElementSerializer';
import type { ElementStateRepository } from '@domain/interfaces/repository/ElementStateRepository';

export class LocalStorageAdapter implements ElementStateRepository {
	constructor(private elementSerializer: ElementSerializer) {}

	save(page: Page): void {
		const serialized = this.elementSerializer.serialize(page);

		localStorage.setItem('page', serialized);
	}

	load(): Page | null {
		const serialized = localStorage.getItem('page');

		if (!serialized) return null;

		return this.elementSerializer.deserialize(serialized) as Page;
	}
}
