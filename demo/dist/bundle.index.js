/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/@mygame/utils/dist/Pool.js":
/*!**************************************************!*\
  !*** ../node_modules/@mygame/utils/dist/Pool.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Pool = void 0;
class Pool {
    constructor(count = 0) {
        // private block
        this._items = [];
        for (let i = 0; i < count; ++i) {
            this._items.push(this._generate());
        }
    }
    push(item) {
        this._items.push(item);
        item.release();
    }
    create(...args) {
        let item = this._items.pop();
        if (!item) {
            item = this._generate();
        }
        item.init(...args);
        return item;
    }
    get size() {
        return this._items.length;
    }
}
exports.Pool = Pool;
//# sourceMappingURL=Pool.js.map

/***/ }),

/***/ "../node_modules/@mygame/utils/dist/Signal.js":
/*!****************************************************!*\
  !*** ../node_modules/@mygame/utils/dist/Signal.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handler = exports.Handler = exports.Signal = void 0;
class Signal {
    constructor() {
        // private block
        this._handlers = new Set();
    }
    on(slot) {
        this._handlers.add(slot);
    }
    off(slot) {
        this._handlers.delete(slot);
    }
    emit(...args) {
        return this.exec(...args);
    }
    exec(...args) {
        let promise = Promise.resolve();
        for (let handler of this._handlers) {
            promise.then(() => handler.exec(...args));
        }
        return promise;
    }
}
exports.Signal = Signal;
class Handler {
    constructor(handler, sender = null) {
        this._handler = handler;
        this._sender = sender;
    }
    exec(...args) {
        return this._handler.apply(this._sender, args);
    }
}
exports.Handler = Handler;
function handler(handler, sender = null) {
    return new Handler(handler, sender);
}
exports.handler = handler;
//# sourceMappingURL=Signal.js.map

/***/ }),

/***/ "../node_modules/@mygame/utils/dist/common.js":
/*!****************************************************!*\
  !*** ../node_modules/@mygame/utils/dist/common.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.idGenerator = void 0;
function idGenerator() {
    let count = 0;
    return function () {
        return (++count);
    };
}
exports.idGenerator = idGenerator;
//# sourceMappingURL=common.js.map

/***/ }),

/***/ "../node_modules/@mygame/utils/dist/index.js":
/*!***************************************************!*\
  !*** ../node_modules/@mygame/utils/dist/index.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./Pool */ "../node_modules/@mygame/utils/dist/Pool.js"), exports);
__exportStar(__webpack_require__(/*! ./Signal */ "../node_modules/@mygame/utils/dist/Signal.js"), exports);
__exportStar(__webpack_require__(/*! ./common */ "../node_modules/@mygame/utils/dist/common.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./components/Circle.ts":
/*!******************************!*\
  !*** ./components/Circle.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Circle": () => (/* binding */ Circle)
/* harmony export */ });
/* harmony import */ var _src_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/Component */ "../src/Component.ts");

class Circle extends _src_Component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super(...arguments);
        this.radius = 20;
    }
    init(radius = 20) {
        this.radius = radius;
    }
}
Circle.Type = (0,_src_Component__WEBPACK_IMPORTED_MODULE_0__.getTypeId)();


/***/ }),

/***/ "./components/Grid.ts":
/*!****************************!*\
  !*** ./components/Grid.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Grid": () => (/* binding */ Grid)
/* harmony export */ });
/* harmony import */ var _src_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/Component */ "../src/Component.ts");

class Grid extends _src_Component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super(...arguments);
        this.rows = 0;
        this.cols = 0;
        this.data = [];
    }
    get(x, y) {
        return this.data[y] && this.data[y][x] || null;
    }
    set(x, y, value) {
        this.data[y][x] = value;
    }
    init(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        for (let y = 0; y < this.rows; ++y) {
            this.data[y] = [];
            for (let x = 0; x < this.cols; ++x) {
                this.data[y][x] = null;
            }
        }
    }
}
Grid.Type = (0,_src_Component__WEBPACK_IMPORTED_MODULE_0__.getTypeId)();


/***/ }),

/***/ "./components/GridCell.ts":
/*!********************************!*\
  !*** ./components/GridCell.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GridCell": () => (/* binding */ GridCell)
/* harmony export */ });
/* harmony import */ var _src_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/Component */ "../src/Component.ts");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector */ "./components/Vector.ts");


class GridCell extends _Vector__WEBPACK_IMPORTED_MODULE_1__.Vector {
}
GridCell.Type = (0,_src_Component__WEBPACK_IMPORTED_MODULE_0__.getTypeId)();


/***/ }),

/***/ "./components/Position.ts":
/*!********************************!*\
  !*** ./components/Position.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Position": () => (/* binding */ Position)
/* harmony export */ });
/* harmony import */ var _src_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/Component */ "../src/Component.ts");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector */ "./components/Vector.ts");


class Position extends _Vector__WEBPACK_IMPORTED_MODULE_1__.Vector {
}
Position.Type = (0,_src_Component__WEBPACK_IMPORTED_MODULE_0__.getTypeId)();


/***/ }),

/***/ "./components/SpawnCell.ts":
/*!*********************************!*\
  !*** ./components/SpawnCell.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpawnCell": () => (/* binding */ SpawnCell),
/* harmony export */   "GridCellRemoved": () => (/* binding */ GridCellRemoved)
/* harmony export */ });
/* harmony import */ var _src_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/Component */ "../src/Component.ts");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector */ "./components/Vector.ts");


class SpawnCell extends _Vector__WEBPACK_IMPORTED_MODULE_1__.Vector {
}
SpawnCell.Type = (0,_src_Component__WEBPACK_IMPORTED_MODULE_0__.getTypeId)();
class GridCellRemoved extends _Vector__WEBPACK_IMPORTED_MODULE_1__.Vector {
}
GridCellRemoved.Type = (0,_src_Component__WEBPACK_IMPORTED_MODULE_0__.getTypeId)();


/***/ }),

/***/ "./components/Vector.ts":
/*!******************************!*\
  !*** ./components/Vector.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vector": () => (/* binding */ Vector)
/* harmony export */ });
/* harmony import */ var _src_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/Component */ "../src/Component.ts");

class Vector extends _src_Component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super(...arguments);
        this.x = 0;
        this.y = 0;
    }
    init(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
Vector.Type = (0,_src_Component__WEBPACK_IMPORTED_MODULE_0__.getTypeId)();


/***/ }),

/***/ "./systems/ClickSystem.ts":
/*!********************************!*\
  !*** ./systems/ClickSystem.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OnClick": () => (/* binding */ OnClick),
/* harmony export */   "ClickSystem": () => (/* binding */ ClickSystem)
/* harmony export */ });
/* harmony import */ var _src_System__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/System */ "../src/System.ts");
/* harmony import */ var _src_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/Component */ "../src/Component.ts");


class OnClick extends _src_Component__WEBPACK_IMPORTED_MODULE_1__.Component {
    init(e) {
        this.event = e;
    }
}
OnClick.Type = (0,_src_Component__WEBPACK_IMPORTED_MODULE_1__.getTypeId)();
class ClickSystem extends _src_System__WEBPACK_IMPORTED_MODULE_0__.System {
    constructor(world, block) {
        super(world);
        this.block = block;
        this._onClick = this.onClick.bind(this);
    }
    onClick(e) {
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


/***/ }),

/***/ "./systems/EditGridSystem.ts":
/*!***********************************!*\
  !*** ./systems/EditGridSystem.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditGridSystem": () => (/* binding */ EditGridSystem)
/* harmony export */ });
/* harmony import */ var _src_System__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/System */ "../src/System.ts");
/* harmony import */ var _ClickSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClickSystem */ "./systems/ClickSystem.ts");
/* harmony import */ var _components_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Grid */ "./components/Grid.ts");
/* harmony import */ var _components_SpawnCell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/SpawnCell */ "./components/SpawnCell.ts");




class EditGridSystem extends _src_System__WEBPACK_IMPORTED_MODULE_0__.System {
    constructor(world, options) {
        super(world);
        this.grid = this.world.getFilter(_components_Grid__WEBPACK_IMPORTED_MODULE_2__.Grid);
        this.filter = this.world.getFilter(_ClickSystem__WEBPACK_IMPORTED_MODULE_1__.OnClick);
        this.options = options;
    }
    onUpdate(dt) {
        let { position, size } = this.options;
        let grid = this.grid.first().get(_components_Grid__WEBPACK_IMPORTED_MODULE_2__.Grid);
        for (let entity of this.filter) {
            let event = entity.get(_ClickSystem__WEBPACK_IMPORTED_MODULE_1__.OnClick).event;
            if (event) {
                let x = Math.floor((event.x - position.x) / size);
                let y = Math.floor((event.y - position.y) / size);
                if (grid.get(x, y)) {
                    this.world.createEntity()
                        .add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_3__.GridCellRemoved, x, y);
                }
                else {
                    this.world.createEntity()
                        .add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_3__.SpawnCell, x, y);
                }
            }
        }
    }
}


/***/ }),

/***/ "./systems/LifeSystem.ts":
/*!*******************************!*\
  !*** ./systems/LifeSystem.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LifeSystem": () => (/* binding */ LifeSystem)
/* harmony export */ });
/* harmony import */ var _src_System__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/System */ "../src/System.ts");
/* harmony import */ var _components_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Grid */ "./components/Grid.ts");
/* harmony import */ var _components_SpawnCell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/SpawnCell */ "./components/SpawnCell.ts");



class LifeSystem extends _src_System__WEBPACK_IMPORTED_MODULE_0__.System {
    constructor() {
        super(...arguments);
        this.grid = this.world.getFilter(_components_Grid__WEBPACK_IMPORTED_MODULE_1__.Grid);
    }
    count(grid, x, y) {
        let count = 0;
        for (let dx = -1; dx <= 1; ++dx)
            for (let dy = -1; dy <= 1; ++dy)
                if (dx || dy) {
                    if (grid.get(x + dx, y + dy)) {
                        ++count;
                    }
                }
        return count;
    }
    onUpdate(dt) {
        let grid = this.grid.first().get(_components_Grid__WEBPACK_IMPORTED_MODULE_1__.Grid);
        for (let y = 0; y < grid.rows; ++y) {
            for (let x = 0; x < grid.cols; ++x) {
                let count = this.count(grid, x, y);
                if (grid.get(x, y)) {
                    if (count < 2 || count > 3) {
                        this.world.createEntity()
                            .add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_2__.GridCellRemoved, x, y);
                    }
                }
                else {
                    if (count === 3) {
                        this.world.createEntity()
                            .add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_2__.SpawnCell, x, y);
                    }
                }
            }
        }
    }
}


/***/ }),

/***/ "./systems/RemoveSystem.ts":
/*!*********************************!*\
  !*** ./systems/RemoveSystem.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RemoveSystem": () => (/* binding */ RemoveSystem)
/* harmony export */ });
/* harmony import */ var _src_System__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/System */ "../src/System.ts");

class RemoveSystem extends _src_System__WEBPACK_IMPORTED_MODULE_0__.System {
    constructor(world, type) {
        super(world);
        this.filter = this.world.getFilter(type);
    }
    onUpdate(dt) {
        for (let entity of this.filter) {
            this.world.removeEntity(entity);
        }
    }
}


/***/ }),

/***/ "./systems/RenderCircle.ts":
/*!*********************************!*\
  !*** ./systems/RenderCircle.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderCircle": () => (/* binding */ RenderCircle)
/* harmony export */ });
/* harmony import */ var _src_System__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/System */ "../src/System.ts");
/* harmony import */ var _components_Circle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Circle */ "./components/Circle.ts");
/* harmony import */ var _components_Position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Position */ "./components/Position.ts");



class RenderCircle extends _src_System__WEBPACK_IMPORTED_MODULE_0__.System {
    constructor(world, context) {
        super(world);
        this.filter = this.world.getFilter(_components_Circle__WEBPACK_IMPORTED_MODULE_1__.Circle, _components_Position__WEBPACK_IMPORTED_MODULE_2__.Position);
        this.context = context;
    }
    onUpdate(dt) {
        var _a;
        for (let entity of this.filter) {
            const radius = (_a = entity.get(_components_Circle__WEBPACK_IMPORTED_MODULE_1__.Circle)) === null || _a === void 0 ? void 0 : _a.radius;
            const vector = entity.get(_components_Position__WEBPACK_IMPORTED_MODULE_2__.Position);
            if (radius) {
                this.context.beginPath();
                this.context.arc(vector.x, vector.y, radius, 0, 2 * Math.PI, false);
                this.context.fillStyle = 'RED';
                this.context.fill();
            }
        }
    }
}


/***/ }),

/***/ "./systems/RenderGrid.ts":
/*!*******************************!*\
  !*** ./systems/RenderGrid.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderGrid": () => (/* binding */ RenderGrid)
/* harmony export */ });
/* harmony import */ var _src_System__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/System */ "../src/System.ts");
/* harmony import */ var _components_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Grid */ "./components/Grid.ts");


class RenderGrid extends _src_System__WEBPACK_IMPORTED_MODULE_0__.System {
    constructor(world, context, options) {
        super(world);
        this.filter = this.world.getFilter(_components_Grid__WEBPACK_IMPORTED_MODULE_1__.Grid);
        this.context = context;
        this.options = options;
    }
    onUpdate(dt) {
        let grid = this.filter.first().get(_components_Grid__WEBPACK_IMPORTED_MODULE_1__.Grid);
        if (grid) {
            let { position, size } = this.options;
            let ctx = this.context;
            for (let y = 0; y < grid.rows; ++y) {
                ctx.beginPath();
                ctx.moveTo(position.x, position.y + y * size);
                ctx.lineTo(position.x + grid.cols * size, position.y + y * size);
                ctx.strokeStyle = 'rgb(78,69,51)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            for (let x = 0; x < grid.cols; ++x) {
                ctx.beginPath();
                ctx.moveTo(position.x + x * size, position.y);
                ctx.lineTo(position.x + x * size, position.y + grid.rows * size);
                ctx.strokeStyle = 'rgb(78,69,51)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}


/***/ }),

/***/ "./systems/SpawnCellSystem.ts":
/*!************************************!*\
  !*** ./systems/SpawnCellSystem.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpawnCellSystem": () => (/* binding */ SpawnCellSystem),
/* harmony export */   "RemoveCellSystem": () => (/* binding */ RemoveCellSystem)
/* harmony export */ });
/* harmony import */ var _src_System__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/System */ "../src/System.ts");
/* harmony import */ var _components_SpawnCell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/SpawnCell */ "./components/SpawnCell.ts");
/* harmony import */ var _components_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Grid */ "./components/Grid.ts");
/* harmony import */ var _components_GridCell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/GridCell */ "./components/GridCell.ts");
/* harmony import */ var _components_Circle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Circle */ "./components/Circle.ts");





class SpawnCellSystem extends _src_System__WEBPACK_IMPORTED_MODULE_0__.System {
    constructor() {
        super(...arguments);
        this.spawns = this.world.getFilter(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_1__.SpawnCell);
        this.grid = this.world.getFilter(_components_Grid__WEBPACK_IMPORTED_MODULE_2__.Grid);
    }
    onUpdate(dt) {
        const grid = this.grid.first().get(_components_Grid__WEBPACK_IMPORTED_MODULE_2__.Grid);
        if (grid) {
            for (let entity of this.spawns) {
                let spawnCell = entity.get(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_1__.SpawnCell);
                if (!grid.get(spawnCell.x, spawnCell.y)) {
                    let entity = this.world.createEntity()
                        .add(_components_GridCell__WEBPACK_IMPORTED_MODULE_3__.GridCell, spawnCell.x, spawnCell.y)
                        .add(_components_Circle__WEBPACK_IMPORTED_MODULE_4__.Circle, 9);
                    grid.set(spawnCell.x, spawnCell.y, entity);
                }
            }
        }
    }
}
class RemoveCellSystem extends _src_System__WEBPACK_IMPORTED_MODULE_0__.System {
    constructor() {
        super(...arguments);
        this.removes = this.world.getFilter(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_1__.GridCellRemoved);
        this.grid = this.world.getFilter(_components_Grid__WEBPACK_IMPORTED_MODULE_2__.Grid);
    }
    onUpdate(dt) {
        const grid = this.grid.first().get(_components_Grid__WEBPACK_IMPORTED_MODULE_2__.Grid);
        if (grid) {
            for (let entity of this.removes) {
                let cellRemoved = entity.get(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_1__.GridCellRemoved);
                let cell = grid.get(cellRemoved.x, cellRemoved.y);
                if (cell) {
                    this.world.removeEntity(cell);
                    grid.set(cellRemoved.x, cellRemoved.y, null);
                }
            }
        }
    }
}


/***/ }),

/***/ "./systems/UpdateCellPosition.ts":
/*!***************************************!*\
  !*** ./systems/UpdateCellPosition.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateCellPosition": () => (/* binding */ UpdateCellPosition)
/* harmony export */ });
/* harmony import */ var _src_System__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/System */ "../src/System.ts");
/* harmony import */ var _components_GridCell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/GridCell */ "./components/GridCell.ts");
/* harmony import */ var _components_Position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Position */ "./components/Position.ts");



class UpdateCellPosition extends _src_System__WEBPACK_IMPORTED_MODULE_0__.System {
    constructor(world, options) {
        super(world);
        this.filter = this.world.getFilter(_components_GridCell__WEBPACK_IMPORTED_MODULE_1__.GridCell);
        this.options = options;
    }
    onUpdate(dt) {
        let { position, size } = this.options;
        for (let entity of this.filter) {
            let pos = entity.get(_components_Position__WEBPACK_IMPORTED_MODULE_2__.Position);
            let cell = entity.get(_components_GridCell__WEBPACK_IMPORTED_MODULE_1__.GridCell);
            pos.x = position.x + cell.x * size + size / 2;
            pos.y = position.y + cell.y * size + size / 2;
        }
    }
}


/***/ }),

/***/ "../src/Component.ts":
/*!***************************!*\
  !*** ../src/Component.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTypeId": () => (/* binding */ getTypeId),
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _mygame_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mygame/utils */ "../node_modules/@mygame/utils/dist/index.js");
/* harmony import */ var _mygame_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mygame_utils__WEBPACK_IMPORTED_MODULE_0__);

const getTypeId = (0,_mygame_utils__WEBPACK_IMPORTED_MODULE_0__.idGenerator)();
class Component {
    init(...args) {
    }
    release() {
    }
    get Type() {
        // @ts-ignore
        return this.constructor.Type;
    }
}
Component.Type = getTypeId();


/***/ }),

/***/ "../src/ComponentPool.ts":
/*!*******************************!*\
  !*** ../src/ComponentPool.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComponentPool": () => (/* binding */ ComponentPool)
/* harmony export */ });
/* harmony import */ var _mygame_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mygame/utils */ "../node_modules/@mygame/utils/dist/index.js");
/* harmony import */ var _mygame_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mygame_utils__WEBPACK_IMPORTED_MODULE_0__);

class ComponentPool extends _mygame_utils__WEBPACK_IMPORTED_MODULE_0__.Pool {
    constructor(type) {
        super();
        this._type = type;
    }
    _generate() {
        return new this._type();
    }
}


/***/ }),

/***/ "../src/Entity.ts":
/*!************************!*\
  !*** ../src/Entity.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getId": () => (/* binding */ getId),
/* harmony export */   "Entity": () => (/* binding */ Entity)
/* harmony export */ });
/* harmony import */ var _mygame_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mygame/utils */ "../node_modules/@mygame/utils/dist/index.js");
/* harmony import */ var _mygame_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mygame_utils__WEBPACK_IMPORTED_MODULE_0__);

const getId = (0,_mygame_utils__WEBPACK_IMPORTED_MODULE_0__.idGenerator)();
class Entity {
    constructor(world) {
        this.id = getId();
        this._components = {};
        this._world = world;
    }
    hasComponent(componentType) {
        return this._world.hasComponent(this, componentType);
    }
    getComponent(componentType) {
        return this._world.getComponent(this, componentType);
    }
    get(componentType) {
        let cmp = this._world.getComponent(this, componentType);
        if (!cmp) {
            cmp = this._world.addComponent(this, componentType);
        }
        return cmp;
    }
    addComponent(componentType, ...args) {
        return this._world.addComponent(this, componentType, ...args);
    }
    add(componentType, ...args) {
        this._world.addComponent(this, componentType, ...args);
        return this;
    }
    remove(componentType) {
        this._world.removeComponent(this, componentType);
        return this;
    }
    init(...args) {
    }
    release() {
    }
}


/***/ }),

/***/ "../src/EntityPool.ts":
/*!****************************!*\
  !*** ../src/EntityPool.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EntityPool": () => (/* binding */ EntityPool)
/* harmony export */ });
/* harmony import */ var _Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entity */ "../src/Entity.ts");
/* harmony import */ var _mygame_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mygame/utils */ "../node_modules/@mygame/utils/dist/index.js");
/* harmony import */ var _mygame_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mygame_utils__WEBPACK_IMPORTED_MODULE_1__);


class EntityPool extends _mygame_utils__WEBPACK_IMPORTED_MODULE_1__.Pool {
    constructor(world) {
        super();
        this._world = world;
    }
    _generate() {
        return new _Entity__WEBPACK_IMPORTED_MODULE_0__.Entity(this._world);
    }
}


/***/ }),

/***/ "../src/Filter.ts":
/*!************************!*\
  !*** ../src/Filter.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Filter": () => (/* binding */ Filter)
/* harmony export */ });
/* harmony import */ var _mygame_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mygame/utils */ "../node_modules/@mygame/utils/dist/index.js");
/* harmony import */ var _mygame_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mygame_utils__WEBPACK_IMPORTED_MODULE_0__);

class Filter {
    constructor(world, id, components) {
        this._components = new Set();
        this._entities = new Set();
        this._onAddComponent = (0,_mygame_utils__WEBPACK_IMPORTED_MODULE_0__.handler)(this.onAddComponent, this);
        this._onRemoveComponent = (0,_mygame_utils__WEBPACK_IMPORTED_MODULE_0__.handler)(this.onRemoveComponent, this);
        this._onRemoveEntity = (0,_mygame_utils__WEBPACK_IMPORTED_MODULE_0__.handler)(this.onRemoveEntity, this);
        this._world = world;
        this._id = id;
        for (let cmp of components) {
            this._components.add(cmp);
        }
        for (let entity of this._world.entities) {
            this.update(entity);
        }
        this._world.socketAddComponent.on(this._onAddComponent);
        this._world.socketRemoveComponent.on(this._onRemoveComponent);
        this._world.socketRemoveEntity.on(this._onRemoveEntity);
    }
    destroy() {
    }
    onAddComponent(world, entity, component) {
        if (this._components.has(component.constructor)) {
            this.update(entity);
        }
    }
    onRemoveComponent(world, entity, component) {
        if (this._components.has(component.constructor)) {
            this.update(entity);
        }
    }
    onRemoveEntity(world, entity) {
        this._entities.delete(entity);
    }
    /**
     * Проверка принадлежности к фильтру
     * @param entity
     */
    check(entity) {
        for (let cmp of this._components) {
            if (!entity.hasComponent(cmp)) {
                return false;
            }
        }
        return true;
    }
    update(entity) {
        if (this.check(entity)) {
            this.addEntity(entity);
        }
        else {
            this.removeEntity(entity);
        }
    }
    addEntity(entity) {
        this._entities.add(entity);
    }
    removeEntity(entity) {
        this._entities.delete(entity);
    }
    [Symbol.iterator]() {
        return this._entities[Symbol.iterator]();
    }
    first() {
        return this._entities[Symbol.iterator]().next().value;
    }
}


/***/ }),

/***/ "../src/System.ts":
/*!************************!*\
  !*** ../src/System.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "System": () => (/* binding */ System)
/* harmony export */ });
class System {
    constructor(world, ...args) {
        this._enabled = true;
        this._world = world;
    }
    get world() {
        return this._world;
    }
    set enabled(enabled) {
        this._enabled = enabled;
    }
    get enabled() {
        return this._enabled;
    }
    destroy() {
    }
    onInit() {
    }
    onUpdate(dt) {
    }
}


/***/ }),

/***/ "../src/SystemGroup.ts":
/*!*****************************!*\
  !*** ../src/SystemGroup.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SystemGroup": () => (/* binding */ SystemGroup)
/* harmony export */ });
class SystemGroup {
    constructor(world) {
        this._systems = [];
        this._lastTime = 0;
        this._world = world;
    }
    addSystem(Type, ...args) {
        const system = new Type(this._world, ...args);
        this._systems.push(system);
        system.onInit();
    }
    add(Type, ...args) {
        const system = new Type(this._world, ...args);
        this._systems.push(system);
        system.onInit();
        return this;
    }
    init() {
        for (let system of this._systems) {
            system.onInit();
        }
    }
    update(dt) {
        for (let system of this._systems) {
            if (system.enabled) {
                system.onUpdate(dt);
            }
        }
    }
    destroy() {
        for (let system of this._systems) {
            system.destroy();
        }
        this._systems = [];
    }
}


/***/ }),

/***/ "../src/World.ts":
/*!***********************!*\
  !*** ../src/World.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "World": () => (/* binding */ World)
/* harmony export */ });
/* harmony import */ var _EntityPool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityPool */ "../src/EntityPool.ts");
/* harmony import */ var _ComponentPool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ComponentPool */ "../src/ComponentPool.ts");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Filter */ "../src/Filter.ts");
/* harmony import */ var _mygame_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mygame/utils */ "../node_modules/@mygame/utils/dist/index.js");
/* harmony import */ var _mygame_utils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mygame_utils__WEBPACK_IMPORTED_MODULE_3__);




class World {
    constructor() {
        this.socketCreateEntity = new _mygame_utils__WEBPACK_IMPORTED_MODULE_3__.Signal();
        this.socketRemoveEntity = new _mygame_utils__WEBPACK_IMPORTED_MODULE_3__.Signal();
        this.socketAddComponent = new _mygame_utils__WEBPACK_IMPORTED_MODULE_3__.Signal();
        this.socketRemoveComponent = new _mygame_utils__WEBPACK_IMPORTED_MODULE_3__.Signal();
        // private block
        this._poolEntity = new _EntityPool__WEBPACK_IMPORTED_MODULE_0__.EntityPool(this);
        this._poolsComponent = {};
        this._entities = new Set();
        this._filters = {};
    }
    /**
     * СОздать сущность
     */
    createEntity() {
        const entity = this._poolEntity.create();
        this._entities.add(entity);
        this.socketCreateEntity.exec(this, entity);
        return entity;
    }
    /**
     * Удалить сущность
     * @param entity
     */
    removeEntity(entity) {
        this._poolEntity.push(entity);
        this._entities.delete(entity);
        this.socketRemoveEntity.exec(this, entity);
    }
    get entities() {
        return this._entities;
    }
    /**
     * Получить фильтр по полям
     * @param args
     */
    getFilter(...args) {
        const id = args.map(cmp => cmp.Type).join('_');
        if (!this._filters[id]) {
            this._filters[id] = new _Filter__WEBPACK_IMPORTED_MODULE_2__.Filter(this, id, args);
        }
        return this._filters[id];
    }
    /**
     * Получить пул компонентов по типу компонента
     * @param componentType
     */
    getComponentPool(componentType) {
        if (!this._poolsComponent[componentType.Type]) {
            this._poolsComponent[componentType.Type] = new _ComponentPool__WEBPACK_IMPORTED_MODULE_1__.ComponentPool(componentType);
        }
        return this._poolsComponent[componentType.Type];
    }
    /**
     * Добавить компонент к ентити
     * @param entity
     * @param componentType
     * @param args
     */
    addComponent(entity, componentType, ...args) {
        const pool = this.getComponentPool(componentType);
        const component = pool.create(...args);
        entity._components[component.Type] = component;
        this.socketAddComponent.exec(this, entity, component);
        return component;
    }
    /**
     * Получить компонент из ентити
     * @param entity
     * @param componentType
     */
    getComponent(entity, componentType) {
        if (entity._components[componentType.Type]) {
            return entity._components[componentType.Type];
        }
        return null;
    }
    /**
     * Удалить компонент из сущности
     * @param entity
     * @param componentType
     */
    removeComponent(entity, componentType) {
        if (entity._components[componentType.Type]) {
            const pool = this.getComponentPool(componentType);
            const component = entity._components[componentType.Type];
            if (component) {
                pool.push(component);
                delete entity._components[componentType.Type];
                this.socketRemoveComponent.exec(this, entity, component);
            }
        }
    }
    /**
     * Проверяет наличие компонета в сущности
     * @param entity
     * @param componentType
     */
    hasComponent(entity, componentType) {
        return entity._components[componentType.Type] ? true : false;
    }
    destroy() {
        for (let id in this._filters) {
            this._filters[id].destroy();
        }
        this._filters = {};
    }
}


/***/ }),

/***/ "../src/index.ts":
/*!***********************!*\
  !*** ../src/index.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "World": () => (/* reexport safe */ _World__WEBPACK_IMPORTED_MODULE_0__.World),
/* harmony export */   "System": () => (/* reexport safe */ _System__WEBPACK_IMPORTED_MODULE_1__.System),
/* harmony export */   "SystemGroup": () => (/* reexport safe */ _SystemGroup__WEBPACK_IMPORTED_MODULE_2__.SystemGroup),
/* harmony export */   "Component": () => (/* reexport safe */ _Component__WEBPACK_IMPORTED_MODULE_3__.Component),
/* harmony export */   "getTypeId": () => (/* reexport safe */ _Component__WEBPACK_IMPORTED_MODULE_3__.getTypeId)
/* harmony export */ });
/* harmony import */ var _World__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./World */ "../src/World.ts");
/* harmony import */ var _System__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./System */ "../src/System.ts");
/* harmony import */ var _SystemGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SystemGroup */ "../src/SystemGroup.ts");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Component */ "../src/Component.ts");






/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Grid */ "./components/Grid.ts");
/* harmony import */ var _systems_RenderGrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./systems/RenderGrid */ "./systems/RenderGrid.ts");
/* harmony import */ var _systems_RenderCircle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./systems/RenderCircle */ "./systems/RenderCircle.ts");
/* harmony import */ var _systems_SpawnCellSystem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./systems/SpawnCellSystem */ "./systems/SpawnCellSystem.ts");
/* harmony import */ var _systems_RemoveSystem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./systems/RemoveSystem */ "./systems/RemoveSystem.ts");
/* harmony import */ var _components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/SpawnCell */ "./components/SpawnCell.ts");
/* harmony import */ var _systems_UpdateCellPosition__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./systems/UpdateCellPosition */ "./systems/UpdateCellPosition.ts");
/* harmony import */ var _systems_LifeSystem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./systems/LifeSystem */ "./systems/LifeSystem.ts");
/* harmony import */ var _systems_ClickSystem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./systems/ClickSystem */ "./systems/ClickSystem.ts");
/* harmony import */ var _systems_EditGridSystem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./systems/EditGridSystem */ "./systems/EditGridSystem.ts");
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../src */ "../src/index.ts");











function main(config) {
    let { canvas } = config;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
    const world = new _src__WEBPACK_IMPORTED_MODULE_10__.World();
    world.createEntity()
        .add(_components_Grid__WEBPACK_IMPORTED_MODULE_0__.Grid, 50, 50);
    // world.createEntity()
    // 	.add(Position)
    // 	.add(GridCell, 0, 0)
    // 	.add(Circle)
    const gridOptions = {
        position: { x: 0, y: 0 },
        size: 20
    };
    const systems = new _src__WEBPACK_IMPORTED_MODULE_10__.SystemGroup(world);
    systems
        .add(_systems_ClickSystem__WEBPACK_IMPORTED_MODULE_8__.ClickSystem, canvas)
        .add(_systems_EditGridSystem__WEBPACK_IMPORTED_MODULE_9__.EditGridSystem, gridOptions)
        .add(_systems_LifeSystem__WEBPACK_IMPORTED_MODULE_7__.LifeSystem)
        .add(_systems_SpawnCellSystem__WEBPACK_IMPORTED_MODULE_3__.SpawnCellSystem)
        .add(_systems_SpawnCellSystem__WEBPACK_IMPORTED_MODULE_3__.RemoveCellSystem)
        .add(_systems_UpdateCellPosition__WEBPACK_IMPORTED_MODULE_6__.UpdateCellPosition, gridOptions)
        .add(_systems_RenderGrid__WEBPACK_IMPORTED_MODULE_1__.RenderGrid, context, gridOptions)
        .add(_systems_RenderCircle__WEBPACK_IMPORTED_MODULE_2__.RenderCircle, context)
        .add(_systems_RemoveSystem__WEBPACK_IMPORTED_MODULE_4__.RemoveSystem, _components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell)
        .add(_systems_RemoveSystem__WEBPACK_IMPORTED_MODULE_4__.RemoveSystem, _components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.GridCellRemoved)
        .add(_systems_RemoveSystem__WEBPACK_IMPORTED_MODULE_4__.RemoveSystem, _systems_ClickSystem__WEBPACK_IMPORTED_MODULE_8__.OnClick);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 10, 10);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 11, 10);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 12, 10);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 10, 11);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 10, 12);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 10, 13);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 10, 14);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 10, 20);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 11, 20);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 12, 20);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 10, 21);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 10, 22);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 10, 23);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 11, 24);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 11, 21);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 11, 22);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 11, 23);
    world.createEntity().add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, 11, 24);
    systems.init();
    systems.update(0);
    // @ts-ignore
    window.c = function (x, y) {
        world.createEntity()
            .add(_components_SpawnCell__WEBPACK_IMPORTED_MODULE_5__.SpawnCell, x, y);
    };
    let lastTime = performance.now();
    const update = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        let time = performance.now();
        systems.update(time - lastTime);
        lastTime = time;
        // requestAnimationFrame(update);
        setTimeout(update, 100);
    };
    update();
}
main({
    canvas: document.getElementById('gameCanvas')
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.index.js.map