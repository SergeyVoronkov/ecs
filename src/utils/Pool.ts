export namespace ecs {
	export interface IPoolObject {
		init(...args:any[]):void
		release():void;
	}

	export abstract class Pool<T extends IPoolObject> {
		_items:T[] = [];

		push(item:T) {
			this._items.push(item);
			item.release();
		}

		create(...args:any[]): T {
			let item = this._items.pop();
			if(!item) {
				item = this._generate();
			}
			item.init(...args);
			return item;
		}

		abstract _generate():T
	}
}