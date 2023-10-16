import type { Page } from '@domain/entities';

export interface ElementStateRepository {
	save(page: Page): void;
	load(): Page | null;
}
