import {World} from '../src/World.js';
import {SystemGroup} from '../src/SystemGroup.js';
import {Grid} from './components/Grid.js';
import {RenderGrid} from './systems/RenderGrid.js';
import {RenderCircle} from './systems/RenderCircle.js';
import {RemoveCellSystem, SpawnCellSystem} from './systems/SpawnCellSystem.js';
import {RemoveSystem} from './systems/RemoveSystem.js';
import {GridCellRemoved, SpawnCell} from './components/SpawnCell.js';
import {UpdateCellPosition} from './systems/UpdateCellPosition.js';
import {LifeSystem} from './systems/LifeSystem.js';
import {ClickSystem, OnClick} from './systems/ClickSystem.js';
import {EditGridSystem} from './systems/EditGridSystem.js';


export function main(config: any) {
	let {canvas} = config;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const context = canvas.getContext('2d');

	const world = new World();

	world.createEntity()
		.add(Grid, 50, 50)

	// world.createEntity()
	// 	.add(Position)
	// 	.add(GridCell, 0, 0)
	// 	.add(Circle)

	const gridOptions = {
		position: {x: 0, y: 0},
		size: 20
	}

	const systems = new SystemGroup(world);
	systems
		.add(ClickSystem, canvas)
		.add(EditGridSystem, gridOptions)
		// .add(LifeSystem)
		.add(SpawnCellSystem)
		.add(RemoveCellSystem)
		.add(UpdateCellPosition, gridOptions)
		.add(RenderGrid, context, gridOptions)
		.add(RenderCircle, context)
		.add(RemoveSystem, SpawnCell)
		.add(RemoveSystem, GridCellRemoved)
		.add(RemoveSystem, OnClick)


	world.createEntity()
		.add(SpawnCell, 0, 0)

	systems.init();
	systems.update(0);

	// @ts-ignore
	window.c = function(x, y) {
		world.createEntity()
			.add(SpawnCell, x, y)
	}


	let lastTime = performance.now();
	const update = function () {
		context.clearRect(0, 0, canvas.width, canvas.height);
		let time = performance.now();
		systems.update(time - lastTime);
		lastTime = time;
		// requestAnimationFrame(update);
		setTimeout(update, 100)
	}

	update();
}