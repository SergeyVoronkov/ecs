import {ComponentTypeId, getTypeId} from '../../src/Component';
import {Vector} from './Vector';

export class SpawnCell extends Vector {
	static readonly Type: ComponentTypeId = getTypeId();
}

export class GridCellRemoved extends Vector {
	static readonly Type: ComponentTypeId = getTypeId();
}