import {World} from './World';
import {IDestroyed} from './utils/common';

export class System implements IDestroyed {
	constructor(world:World, ...args:any[]) {
		this._world = world;
	}

	get world():World {
		return this._world;
	}

	destroy(): void {
	}

	onInit(): void {

	}

	onUpdate(dt: number): void {
	}
	// private block
	_world:World;
}

export type SystemType<T extends System> = {
	new (world:World, ...args:any[]): T
}
