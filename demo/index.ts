
import {Grid} from './components/Grid';
import {RenderGrid} from './systems/RenderGrid';
import {RenderCircle} from './systems/RenderCircle';
import {RemoveCellSystem, SpawnCellSystem} from './systems/SpawnCellSystem';
import {RemoveSystem} from './systems/RemoveSystem';
import {GridCellRemoved, SpawnCell} from './components/SpawnCell';
import {UpdateCellPosition} from './systems/UpdateCellPosition';
import {LifeSystem} from './systems/LifeSystem';
import {ClickSystem, OnClick} from './systems/ClickSystem';
import {EditGridSystem} from './systems/EditGridSystem';
import {SystemGroup, World} from '../src';


function main(config: any) {
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
main({
	canvas: document.getElementById('gameCanvas')
});