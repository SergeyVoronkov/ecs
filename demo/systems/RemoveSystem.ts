import {System} from '../../src/System';
import {Component, ComponentType} from '../../src/Component';
import {World} from '../../src/World';
import {Filter} from '../../src/Filter';

export class RemoveSystem<T extends Component> extends System {
	filter: Filter;
	constructor(world:World, type:ComponentType<T>) {
		super(world);
		this.filter = this.world.getFilter(type)
	}

	onUpdate(dt: number) {
		for(let entity of this.filter) {
			this.world.removeEntity(entity);
		}
	}
}