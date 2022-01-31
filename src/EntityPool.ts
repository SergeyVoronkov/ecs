import {Pool} from './utils/Pool';
import {Entity} from './Entity';
import {World} from './World';

export class EntityPool extends Pool<Entity>{
	_world:World

	constructor(world:World) {
		super();
		this._world = world;
	}

	_generate(): Entity {
		return new Entity(this._world);
	}
}