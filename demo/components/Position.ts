import {ComponentTypeId, getTypeId} from '../../src/Component.js';
import {Vector} from './Vector.js';

export class Position extends Vector {
	static readonly Type: ComponentTypeId = getTypeId();
}