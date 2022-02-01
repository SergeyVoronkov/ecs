import {System} from '../../src/System.js';
import {Grid} from '../components/Grid.js';
import {GridCellRemoved, SpawnCell} from '../components/SpawnCell.js';

export class LifeSystem extends System {
	grid = this.world.getFilter(Grid)

	count(grid:Grid, x:number, y:number) {
		let count = 0;
		for(let dx = -1; dx <=1; ++dx) for(let dy = -1; dy <=1; ++dy) if(dx || dy) {
			if(grid.get(x + dx, y + dy)) {
				++count;
			}
		}
		return count;
	}

	onUpdate(dt: number) {
		let grid = this.grid.first().get(Grid);


		for (let y = 0; y < grid.rows; ++y) {
			for (let x = 0; x < grid.cols; ++x) {
				let count = this.count(grid, x, y);
				if(grid.get(x, y)) {
					if(count < 2 || count > 3) {
						this.world.createEntity()
							.add(GridCellRemoved, x, y);
					}
				} else {
					if(count === 3) {
						this.world.createEntity()
							.add(SpawnCell, x, y);
					}
				}
			}
		}
	}
}