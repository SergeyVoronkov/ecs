import {World} from './World.js';
import {IDestroyed} from '@mygame/utils';

export class System implements IDestroyed {
	constructor(world:World, ...args:any[]) {
		this._world = world;
	}

	get world():World {
		return this._world;
	}

	set enabled(enabled:boolean) {
		this._enabled = enabled;
	}

	get enabled():boolean {
		return this._enabled;
	}

	destroy(): void {
	}

	onInit(): void {

	}

	onUpdate(dt: number): void {
	}
	// private block
	_world:World;
	_enabled: boolean = true
}

export type SystemType<T extends System> = {
	new (world:World, ...args:any[]): T
}
