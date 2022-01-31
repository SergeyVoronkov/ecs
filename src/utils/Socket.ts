interface IHandler {
	exec(...args:any[]):void;
}

export class Socket implements IHandler {
	_handlers: Set<IHandler> = new Set();

	on(slot:IHandler) {
		this._handlers.add(slot);
	}

	off(slot:IHandler) {
		this._handlers.delete(slot);
	}

	exec(...args: any[]): void {
		for(let handler of this._handlers){
			handler.exec(...args);
		}
	}
}

type TypeHandler = (...args:any[])=>void;

export class Handler implements IHandler {
	_handler: TypeHandler
	_sender: Object | null
	constructor(handler: TypeHandler, sender: Object | null = null) {
		this._handler = handler;
		this._sender = sender;
	}

	exec(...args: any[]): void {
		this._handler.apply(this._sender, args);
	}
}

export function handler(handler: TypeHandler, sender: Object | null = null) {
	return new Handler(handler, sender);
}