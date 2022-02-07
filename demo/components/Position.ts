import {ComponentTypeId, getTypeId} from '../../src/Component';
import {Vector} from './Vector';

export class Position extends Vector {
	static readonly Type: ComponentTypeId = getTypeId();
}