import {System} from '../../src/System';
import {OnClick} from './ClickSystem';
import {World} from '../../src/World';
import {RenderGridOptions} from './RenderGrid';
import {Grid} from '../components/Grid';
import {GridCellRemoved, SpawnCell} from '../components/SpawnCell';

export class EditGridSystem extends System {
	grid = this.world.getFilter(Grid)
	filter = this.world.getFilter(OnClick)
	options: RenderGridOptions;

	constructor(world: World, options: RenderGridOptions) {
		super(world);
		this.options = options;
	}

	onUpdate(dt: number) {
		let {position, size} = this.options;
		let grid = this.grid.first().get(Grid);

		for(let entity of this.filter) {
			let event = entity.get(OnClick).event;
			if(event) {
				let x = Math.floor((event.x - position.x)/size);
				let y = Math.floor((event.y - position.y)/size);
				if(grid.get(x,y)) {
					this.world.createEntity()
						.add(GridCellRemoved, x, y);
				} else {
					this.world.createEntity()
						.add(SpawnCell, x, y);
				}
			}
		}
	}
}