export class Shared {
	static generateId(): number {
		return Math.round(Math.random() * 100000000);
	}
}
