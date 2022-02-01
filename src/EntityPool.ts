import {Pool} from './utils/Pool.js';
import {Entity} from './Entity.js';
import {World} from './World.js';

export class EntityPool extends Pool<Entity>{

	constructor(world:World) {
		super();
		this._world = world;
	}

	_generate(): Entity {
		return new Entity(this._world);
	}

	// private block
	_world:World
}