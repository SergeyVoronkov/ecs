import {idGenerator} from './utils/common.js';
import {IPoolObject} from './utils/Pool.js';

export type ComponentTypeId = number;
export const getTypeId = idGenerator<ComponentTypeId>();


export class Component implements IPoolObject {
	static readonly Type: ComponentTypeId = getTypeId();

	init(...args: any[]): void {
	}

	release(): void {
	}

	get Type(): ComponentTypeId {
		// @ts-ignore
		return this.constructor.Type as ComponentTypeId;
	}
}

export type ComponentType<T extends Component> = {
	new(): T
	readonly Type: ComponentTypeId
}
