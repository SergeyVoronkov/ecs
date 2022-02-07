import {Component, ComponentTypeId, getTypeId} from '../../src/Component';

export class Circle extends Component {
	static readonly Type: ComponentTypeId = getTypeId();
	radius: number = 20

	init(radius: number = 20) {
		this.radius = radius
	}
}