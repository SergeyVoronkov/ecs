import {ComponentTypeId, getTypeId} from '../../src/Component.js';
import {Vector} from './Vector.js';

export class SpawnCell extends Vector {
	static readonly Type: ComponentTypeId = getTypeId();
}

export class GridCellRemoved extends Vector {
	static readonly Type: ComponentTypeId = getTypeId();
}