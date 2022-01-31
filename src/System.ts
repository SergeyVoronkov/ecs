import {World} from './World';

export class System {
	_world:World;

	constructor(world:World, ...args:any[]) {
		this._world = world;
	}

	get world():World {
		return this._world;
	}

	onDestroy(): void {
	}

	onInit(): void {

	}

	onUpdate(dt: number): void {
	}
}

export type SystemType<T extends System> = {
	new (world:World, ...args:any[]): T
}
