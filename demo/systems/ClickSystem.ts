import {System} from '../../src/System';
import {Component, ComponentTypeId, getTypeId} from '../../src/Component';
import {World} from '../../src/World';
export class OnClick extends Component {
	static readonly Type: ComponentTypeId = getTypeId();
	event:MouseEvent | undefined;
	init(e:MouseEvent) {
		this.event = e;
	}
}

export class ClickSystem extends System {
	block: Node;
	_onClick: OmitThisParameter<(e: MouseEvent) => void>;
	constructor(world:World, block:Node) {
		super(world);
		this.block = block;
		this._onClick = this.onClick.bind(this);
	}

	onClick(e:MouseEvent){
		this.world.createEntity().add(OnClick, e);
	}

	onInit() {
		super.onInit();
		// @ts-ignore
		this.block.addEventListener('click', this._onClick);
	}

	destroy() {
		super.destroy();
		// @ts-ignore
		this.block.removeEventListener('click', this._onClick);
	}
}