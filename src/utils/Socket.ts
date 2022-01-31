import {EmptyArgs} from './common';


interface IHandler<F extends EmptyArgs> {
	exec: (...args:F)=>void
}

export class Socket<T extends EmptyArgs> implements IHandler<T> {
	on(slot:IHandler<T>) {
		this._handlers.add(slot);
	}

	off(slot:IHandler<T>) {
		this._handlers.delete(slot);
	}

	exec(...args: T): void {
		for(let handler of this._handlers){
			handler.exec(...args);
		}
	}
	// private block
	_handlers: Set<IHandler<T>> = new Set();
}

type TypeHandler<T extends EmptyArgs> = (...args:T)=>void;

export class Handler<T extends EmptyArgs> implements IHandler<T> {
	constructor(handler: TypeHandler<T>, sender: Object | null = null) {
		this._handler = handler;
		this._sender = sender;
	}

	exec(...args: T): void {
		this._handler.apply(this._sender, args);
	}
	// private block
	_handler: TypeHandler<T>
	_sender: Object | null
}

export function handler<T extends EmptyArgs>(handler: TypeHandler<T>, sender: Object | null = null) {
	return new Handler(handler, sender);
}