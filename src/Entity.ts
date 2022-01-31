import {idGenerator} from './utils/common'
import {IPoolObject} from './utils/Pool';
import {World} from './World';
import {Component, ComponentType, ComponentTypeId} from './Component';
import {ComponentPool} from './ComponentPool';

export type EntityId = number;
export const getId = idGenerator<EntityId>();

export type IComponentMap = {
	[key: ComponentTypeId]: Component;
};

export class Entity implements IPoolObject {
	id:EntityId = getId()
	_world:World
	_components:IComponentMap = {}

	constructor(world: World) {
		this._world = world;
	}

	hasComponent<T extends Component>(componentType:ComponentType<T>):boolean {
		return this._world.hasComponent(this, componentType);
	}

	get<T extends Component>(componentType:ComponentType<T>): T | null {
		return this._world.getComponent(this, componentType);
	}

	add<T extends Component>(componentType:ComponentType<T>, ...args:any[]): T {
		return this._world.addComponent(this, componentType);
	}

	remove<T extends Component>(componentType:ComponentType<T>) {
		this._world.removeComponent(this, componentType);
	}

	init(...args: any[]): void {
	}

	release(): void {
	}
}

