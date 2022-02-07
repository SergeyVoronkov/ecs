import {Entity} from './Entity.js';
import {World} from './World.js';
import {Pool} from '@mygame/utils';

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