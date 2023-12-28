import type { Page } from '@domain/aggregates';

export interface ElementStateRepository {
	save(page: Page): void;
	load(): Page | null;
}
