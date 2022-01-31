import {World} from './World';
import {Component, ComponentType} from './Component';
import {Entity} from './Entity';
import {handler, Handler} from './utils/Socket';

export class Filter implements Iterable<Entity>{
	_world:World
	_id:string
	_components: ComponentType<Component>[]
	_entities: Set<Entity> = new Set()
	_onChangeComponent: Handler = handler(this.onChangeComponent, this)

	constructor(world:World, id:string, components: ComponentType<Component>[]) {
		this._world = world;
		this._id = id;
		this._components = components;
	}

	onChangeComponent(world:World, entity:Entity, component:Component) {

	}

	/**
	 * Проверка принадлежности к фильтру
	 * @param entity
	 */
	check(entity: Entity):boolean {
		for(let cmp of this._components) {
			if(!entity.hasComponent(cmp)) {
				return false;
			}
		}
		return true;
	}

	update(entity:Entity) {
		if(this.check(entity)) {
			this.addEntity(entity);
		} else {
			this.removeEntity(entity);
		}
	}

	addEntity(entity:Entity) {
		this._entities.add(entity);
	}

	removeEntity(entity:Entity) {
		this._entities.delete(entity);
	}

	[Symbol.iterator](): Iterator<Entity> {
		return this._entities[Symbol.iterator]();
	}
}