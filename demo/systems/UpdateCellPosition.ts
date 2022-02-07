import {System} from '../../src/System';
import {GridCell} from '../components/GridCell';
import {World} from '../../src/World';
import {RenderGridOptions} from './RenderGrid';
import {Position} from '../components/Position';

export class UpdateCellPosition extends System {
	filter = this.world.getFilter(GridCell)
	options: RenderGridOptions;

	constructor(world: World, options: RenderGridOptions) {
		super(world);
		this.options = options;
	}

	onUpdate(dt: number) {
		let {position, size} = this.options;
		for(let entity of this.filter) {
			let pos = entity.get(Position);
			let cell = entity.get(GridCell);
			pos.x = position.x + cell.x * size + size/2;
			pos.y = position.y + cell.y * size + size/2;
		}
	}
}