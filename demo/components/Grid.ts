import {Component, ComponentTypeId, getTypeId} from '../../src/Component.js';
import {Entity} from '../../src/Entity.js';

type Null<T> = T | null;

export class Grid extends Component {
	static readonly Type: ComponentTypeId = getTypeId();
	rows: number = 0;
	cols: number = 0;

	data: Null<Entity>[][] = []

	get(x: number, y: number): Null<Entity> {
		return this.data[y] && this.data[y][x] || null;
	}

	set(x: number, y: number, value: Null<Entity>) {
		this.data[y][x] = value;
	}

	init(rows: number, cols: number) {
		this.rows = rows;
		this.cols = cols;
		for (let y = 0; y < this.rows; ++y) {
			this.data[y] = [];
			for (let x = 0; x < this.cols; ++x) {
				this.data[y][x] = null;
			}
		}
	}
}