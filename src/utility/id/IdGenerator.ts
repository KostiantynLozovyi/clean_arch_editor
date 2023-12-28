let count = Date.now();

export class IdGenerator {
	generate(): number {
		return ++count;
	}
}
