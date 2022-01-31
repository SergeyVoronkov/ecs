type ID = number
export type EmptyArgs = any[];

export function idGenerator<T extends ID>():()=>T {
	let count = 0;
	return function():T {
		return (++count) as T;
	}
}

export interface IDestroyed {
	destroy():void
}