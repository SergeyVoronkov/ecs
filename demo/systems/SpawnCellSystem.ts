import {System} from '../../src/System.js';
import {GridCellRemoved, SpawnCell} from '../components/SpawnCell.js';
import {Grid} from '../components/Grid.js';
import {GridCell} from '../components/GridCell.js';
import {Circle} from '../components/Circle.js';

export class SpawnCellSystem extends System {
	spawns = this.world.getFilter(SpawnCell)
	grid = this.world.getFilter(Grid)

	onUpdate(dt: number) {
		const grid = this.grid.first().get(Grid);
		if (grid) {
			for (let entity of this.spawns) {
				let spawnCell = entity.get(SpawnCell);
				if (!grid.get(spawnCell.x, spawnCell.y)) {
					let entity = this.world.createEntity()
						.add(GridCell, spawnCell.x, spawnCell.y)
						.add(Circle, 9)
					grid.set(spawnCell.x, spawnCell.y, entity);
				}
			}
		}
	}
}

export class RemoveCellSystem extends System {
	removes = this.world.getFilter(GridCellRemoved)
	grid = this.world.getFilter(Grid)

	onUpdate(dt: number) {
		const grid = this.grid.first().get(Grid);
		if (grid) {
			for (let entity of this.removes) {
				let cellRemoved = entity.get(GridCellRemoved);
				let cell = grid.get(cellRemoved.x, cellRemoved.y);
				if (cell) {
					this.world.removeEntity(cell);
					grid.set(cellRemoved.x, cellRemoved.y, null);
				}
			}
		}
	}
}

