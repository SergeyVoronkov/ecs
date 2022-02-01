import {Component, ComponentTypeId, getTypeId} from '../../src/Component.js';

export class Vector extends Component {
	static readonly Type: ComponentTypeId = getTypeId();

	x: number = 0
	y: number = 0;

	init(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}
}