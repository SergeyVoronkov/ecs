import {System} from '../../src/System';
import {World} from '../../src/World';
import {Grid} from '../components/Grid';

export type RenderGridOptions = {
	position:{x:number,y:number}
	size: number
}

export class RenderGrid extends System {
	filter = this.world.getFilter(Grid)
	context: CanvasRenderingContext2D
	options: RenderGridOptions;

	constructor(world: World, context: CanvasRenderingContext2D, options: RenderGridOptions) {
		super(world);
		this.context = context;
		this.options = options;
	}

	onUpdate(dt: number) {
		let grid = this.filter.first().get(Grid);
		if (grid) {
			let {position, size} = this.options;


			let ctx = this.context;
			for (let y = 0; y < grid.rows; ++y) {
				ctx.beginPath();
				ctx.moveTo(position.x, position.y + y * size);
				ctx.lineTo(position.x + grid.cols * size, position.y + y * size);
				ctx.strokeStyle = 'rgb(78,69,51)';
				ctx.lineWidth = 1;
				ctx.stroke()
			}

			for (let x = 0; x < grid.cols; ++x) {
				ctx.beginPath();
				ctx.moveTo(position.x + x * size, position.y);
				ctx.lineTo(position.x + x * size, position.y + grid.rows * size);
				ctx.strokeStyle = 'rgb(78,69,51)';
				ctx.lineWidth = 1;
				ctx.stroke()
			}
		}
	}
}