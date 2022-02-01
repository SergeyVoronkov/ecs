import {System} from '../../src/System.js';
import {Component, ComponentType} from '../../src/Component.js';
import {World} from '../../src/World.js';
import {Filter} from '../../src/Filter.js';

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