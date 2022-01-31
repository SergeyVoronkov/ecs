type ID = number

export function idGenerator<T extends ID>():()=>T {
	let count = 0;
	return function():T {
		return (++count) as T;
	}
}