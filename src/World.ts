import {Entity} from './Entity.js';
import {EntityPool} from './EntityPool.js';
import {Component, ComponentType, ComponentTypeId} from './Component.js';
import {ComponentPool} from './ComponentPool.js'
import {Filter} from './Filter.js';
import {IDestroyed, Signal} from '@mygame/utils';


export type IPoolsComponent = {
	[key: ComponentTypeId]: ComponentPool<Component>;
};

export class World implements IDestroyed {
	socketCreateEntity = new Signal<[World, Entity]>();
	socketRemoveEntity = new Signal<[World, Entity]>();
	socketAddComponent = new Signal<[World, Entity, Component]>();
	socketRemoveComponent = new Signal<[World, Entity, Component]>();

	/**
	 * СОздать сущность
	 */
	createEntity(): Entity {
		const entity = this._poolEntity.create();
		this._entities.add(entity);
		this.socketCreateEntity.exec(this, entity);
		return entity;
	}

	/**
	 * Удалить сущность
	 * @param entity
	 */
	removeEntity(entity:Entity):void {
		this._poolEntity.push(entity);
		this._entities.delete(entity);
		this.socketRemoveEntity.exec(this, entity);
	}

	get entities():Iterable<Entity> {
		return this._entities;
	}

	/**
	 * Получить фильтр по полям
	 * @param args
	 */
	getFilter(...args:ComponentType<Component>[]): Filter {
		const id = args.map(cmp=>cmp.Type).join('_');
		if(!this._filters[id]) {
			this._filters[id] = new Filter(this, id, args);
		}
		return this._filters[id];
	}

	/**
	 * Получить пул компонентов по типу компонента
	 * @param componentType
	 */
	getComponentPool<T extends Component>(componentType:ComponentType<T>):ComponentPool<T> {
		if(!this._poolsComponent[componentType.Type]) {
			this._poolsComponent[componentType.Type] = new ComponentPool(componentType);
		}
		return this._poolsComponent[componentType.Type] as ComponentPool<T>;
	}

	/**
	 * Добавить компонент к ентити
	 * @param entity
	 * @param componentType
	 * @param args
	 */
	addComponent<T extends Component>(entity:Entity, componentType:ComponentType<T>, ...args:any[]):T {
		const pool = this.getComponentPool(componentType);
		const component =  pool.create(...args) as T;
		entity._components[component.Type] = component;
		this.socketAddComponent.exec(this, entity, component);
		return component;
	}

	/**
	 * Получить компонент из ентити
	 * @param entity
	 * @param componentType
	 */
	getComponent<T extends Component>(entity:Entity, componentType:ComponentType<T>): T | null {
		if(entity._components[componentType.Type]) {
			return entity._components[componentType.Type] as T;
		}
		return null;
	}

	/**
	 * Удалить компонент из сущности
	 * @param entity
	 * @param componentType
	 */
	removeComponent<T extends Component>(entity:Entity, componentType:ComponentType<T>) {
		if(entity._components[componentType.Type]) {
			const pool = this.getComponentPool(componentType);
			const component = entity._components[componentType.Type];
			if(component) {
				pool.push(component);
				delete entity._components[componentType.Type];
				this.socketRemoveComponent.exec(this, entity, component);
			}
		}
	}

	/**
	 * Проверяет наличие компонета в сущности
	 * @param entity
	 * @param componentType
	 */
	hasComponent<T extends Component>(entity:Entity, componentType:ComponentType<T>):boolean {
		return entity._components[componentType.Type]?true:false;
	}

	destroy(): void {
		for(let id in this._filters) {
			this._filters[id].destroy();
		}
		this._filters = {};
	}

	// private block
	_poolEntity:EntityPool = new EntityPool(this);
	_poolsComponent: IPoolsComponent = {}
	_entities:Set<Entity> = new Set();
	_filters:{
		[key: string]: Filter;
	} = {}
}