import {Pool} from './utils/Pool';
import {Component, ComponentType, ComponentTypeId} from './Component';

export class ComponentPool<T extends Component> extends Pool<Component> {

	constructor(type: ComponentType<T>) {
		super();
		this._type = type;
	}

	_generate(): Component {
		return new this._type();
	}

	// private block
	_type: ComponentType<T>;
}