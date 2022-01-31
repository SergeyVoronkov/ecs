import {World} from '../src/World';
import {Component, ComponentTypeId, getTypeId} from '../src/Component';
import assert from 'assert';
import {SystemGroup} from '../src/SystemGroup';
import {System} from '../src/System';

class TestComponent extends Component {
	static readonly Type: ComponentTypeId = getTypeId();

	param1: number = 0
	param2: number = 0

	init(param1:number = 0, param2:number = 0) {
		this.param1 = param1;
		this.param2 = param2;
	}
}

class TestSystem extends System {
	filter = this.world.getFilter(TestComponent)

	onUpdate(dt: number) {
		for(let entity of this.filter) {
			console.log(entity)
		}
	}
}

describe('Компоненты', function () {
	const world = new World();
	it('Создание', function () {

		const entity = world.createEntity();
		assert(entity)

		const component = world.addComponent(entity, TestComponent, 1, 2);
		assert(component)

	})

	it('Системы', function() {
		let group = new SystemGroup(world);
		group.addSystem(TestSystem);

		world.createEntity().add(TestComponent);

		group.init();
		group.update(0);
		group.destroy()
	})
});