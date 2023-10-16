let count = 0;

export class IdGenerator {
	generate(): number {
		return ++count;
	}
}
