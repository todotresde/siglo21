export class Shared {
	static generateId(): number {
		return Math.round(Math.random() * 10000000000);
	}
}
