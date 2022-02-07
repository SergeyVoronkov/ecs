import {Component, ComponentType} from './Component';
import {Pool} from '@mygame/utils';

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