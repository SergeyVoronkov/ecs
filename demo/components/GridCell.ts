import {ComponentTypeId, getTypeId} from '../../src/Component';
import {Vector} from './Vector';

export class GridCell extends Vector {
	static readonly Type: ComponentTypeId = getTypeId();
}