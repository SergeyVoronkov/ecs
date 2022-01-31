export interface IPoolObject {
	init(...args: any[]): void

	release(): void;
}

export abstract class Pool<T extends IPoolObject> {

	constructor(count: number = 0) {
		for(let i = 0; i < count; ++i) {
			this._items.push(this._generate());
		}
	}

	push(item: T) {
		this._items.push(item);
		item.release();
	}

	create(...args: any[]): T {
		let item = this._items.pop();
		if (!item) {
			item = this._generate();
		}
		item.init(...args);
		return item;
	}

	get size() {
		return this._items.length;
	}

	abstract _generate(): T

	// private block
	_items: T[] = [];
}