import {World} from './World';
import {System, SystemType} from './System';

export class SystemGroup {
	_world:World
	_systems:System[] = []
	_lastTime:number = 0;
	constructor(world: World) {
		this._world = world;
	}

	addSystem<T extends System>(Type: SystemType<T>, ...args:any[]) {
		const system = new Type(this._world, ...args);
		this._systems.push(system);
		system.onInit();
	}

	init() {
		for(let system of this._systems) {
			system.onInit();
		}
	}

	update(dt:number) {
		for(let system of this._systems) {
			system.onUpdate(dt);
		}
	}

	destroy() {
		for(let system of this._systems) {
			system.onDestroy();
		}
		this._systems = [];
	}
}