import {Pool,IPoolObject} from '../src/utils/Pool';
import assert from 'assert';


let total = 0;
let init = 0;
let release = 0;

class TestPoolObject implements IPoolObject {
	id: Number = 0
	name: String = ''

	init(id: Number, name: String): void {
		this.id = id;
		this.name = name;
		++init;
		console.log(`Init ${id} ${name}`)
	}

	release(): void {
		++release;
		console.log('release')
	}
}

class TestPool extends Pool<TestPoolObject> {
	_generate(): TestPoolObject {
		console.log('Create new object');
		++total;
		return new TestPoolObject();
	}
}

describe('Пул объектов', function () {
	const pool = new TestPool();
	let object = pool.create(1, 'Object 1');
	it('Создание', async function () {
		let object = pool.create(1, 'Object 1');
		assert(object, 'Не создан');
		pool.push(object);
	})

	it('Нужный тип', async function () {
		let object = pool.create(1, 'Object 1');
		assert(object instanceof TestPoolObject, 'Не создан');
		pool.push(object);
	})

	it('Возврат обьекта в пул', async function () {
		let object = pool.create(1, 'Object 1');
		pool.push(object);
	})

	it('Достаем обратно должен быть тот же обьект но с другими данными', async function () {
		let clone = Object.assign({}, object);
		pool.push(object);
		let object2 = pool.create(2, 'Object 2');
		assert(object === object2, 'Не тот обьект');

		assert.notStrictEqual(clone, object2, 'Не записались новые данные');
		assert.deepStrictEqual(Object.assign({}, object2), {id: 2, name:'Object 2'}, "Данные не каректно записались ")
	})
});