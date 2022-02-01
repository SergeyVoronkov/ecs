import {Pool} from './utils/Pool.js';
import {Component, ComponentType} from './Component.js';

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