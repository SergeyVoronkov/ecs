import {Entity} from './Entity';
import {EntityPool} from './EntityPool';
import {Component, ComponentType, ComponentTypeId} from './Component';
import {ComponentPool} from './ComponentPool'
import {Filter} from './Filter';
import {Socket} from './utils/Socket';


export type IPoolsComponent = {
	[key: ComponentTypeId]: ComponentPool<Component>;
};

export class World {
	_poolEntity: EntityPool
	_poolsComponent: IPoolsComponent = {}
	_filters:{
		[key: string]: Filter;
	} = {}

	socketCreateEntity = new Socket();
	socketRemoveEntity = new Socket();
	socketAddComponent = new Socket();
	socketRemoveComponent = new Socket();

	constructor() {
		this._poolEntity = new EntityPool(this);
	}

	createEntity(): Entity {
		const entity = this._poolEntity.create();
		this.socketCreateEntity.exec(this, entity);
		return entity;
	}

	removeEntity(entity:Entity):void {
		this._poolEntity.push(entity);
		this.socketRemoveEntity.exec(entity);
	}

	getFilter(...args:any[]) {
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
			pool.push(entity._components[componentType.Type]);
			delete entity._components[componentType.Type];
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
}