import {idGenerator} from './utils/common.js'
import {IPoolObject} from './utils/Pool.js';
import {World} from './World.js';
import {Component, ComponentType, ComponentTypeId} from './Component.js';

export type EntityId = number;
export const getId = idGenerator<EntityId>();

export type IComponentMap = {
	[key: ComponentTypeId]: Component;
};

export class Entity implements IPoolObject {
	id:EntityId = getId()

	constructor(world: World) {
		this._world = world;
	}

	hasComponent<T extends Component>(componentType:ComponentType<T>):boolean {
		return this._world.hasComponent(this, componentType);
	}

	getComponent<T extends Component>(componentType:ComponentType<T>): T | null {
		return this._world.getComponent(this, componentType);
	}

	get<T extends Component>(componentType:ComponentType<T>): T {
		let cmp = this._world.getComponent(this, componentType);
		if(!cmp) {
			cmp = this._world.addComponent(this, componentType);
		}
		return cmp;
	}

	addComponent<T extends Component>(componentType:ComponentType<T>, ...args:any[]): T {
		return this._world.addComponent(this, componentType, ...args);
	}

	add<T extends Component>(componentType:ComponentType<T>, ...args:any[]): this {
		this._world.addComponent(this, componentType, ...args);
		return this;
	}

	remove<T extends Component>(componentType:ComponentType<T>): this {
		this._world.removeComponent(this, componentType);
		return this;
	}

	init(...args: any[]): void {
	}

	release(): void {
	}
	// private block
	_world:World
	_components:IComponentMap = {}
}

