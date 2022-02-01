import {System} from '../../src/System.js';
import {Circle} from '../components/Circle.js';
import {World} from '../../src/World.js';
import {Position} from '../components/Position.js';

export class RenderCircle extends System {
	filter = this.world.getFilter(Circle, Position)
	context: CanvasRenderingContext2D

	constructor(world: World, context: CanvasRenderingContext2D) {
		super(world);
		this.context = context;
	}

	onUpdate(dt: number) {
		for (let entity of this.filter) {
			const radius = entity.get(Circle)?.radius;
			const vector = entity.get(Position);
			if (radius) {
				this.context.beginPath()
				this.context.arc(vector.x, vector.y, radius, 0, 2 * Math.PI, false)
				this.context.fillStyle = 'RED';
				this.context.fill()
			}
		}
	}
}