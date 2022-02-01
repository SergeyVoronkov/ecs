import {World} from './World.js';
import {Component, ComponentType} from './Component.js';
import {Entity} from './Entity.js';
import {handler} from './utils/Socket.js';
import {IDestroyed} from './utils/common.js';

export class Filter implements Iterable<Entity>, IDestroyed{
	constructor(world:World, id:string, components: ComponentType<Component>[]) {
		this._world = world;
		this._id = id;

		for(let cmp of components) {
			this._components.add(cmp);
		}

		for(let entity of this._world.entities) {
			this.update(entity);
		}

		this._world.socketAddComponent.on(this._onAddComponent);
		this._world.socketRemoveComponent.on(this._onRemoveComponent);
		this._world.socketRemoveEntity.on(this._onRemoveEntity);
	}

	destroy() {

	}

	onAddComponent(world:World, entity:Entity, component:Component) {
		if(this._components.has(component.constructor as ComponentType<Component>)) {
			this.update(entity);
		}
	}

	onRemoveComponent(world:World, entity:Entity, component:Component) {
		if(this._components.has(component.constructor as ComponentType<Component>)) {
			this.update(entity);
		}
	}

	onRemoveEntity(world:World, entity:Entity) {
		this._entities.delete(entity);
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

	first(): Entity {
		return this._entities[Symbol.iterator]().next().value;
	}

	// private block
	_world:World
	_id:string
	_components: Set<ComponentType<Component>> = new Set()
	_entities: Set<Entity> = new Set()

	_onAddComponent = handler(this.onAddComponent, this)
	_onRemoveComponent = handler(this.onRemoveComponent, this)
	_onRemoveEntity = handler(this.onRemoveEntity, this)
}