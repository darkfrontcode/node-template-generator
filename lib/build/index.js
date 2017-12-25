/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var log_class_1 = __webpack_require__(12);
exports.Log = log_class_1.Log;
var read_line_data_class_1 = __webpack_require__(13);
exports.readLineData = read_line_data_class_1.readLineData;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var task_1 = __webpack_require__(14);
exports.task = task_1.task;
var name_generator_class_1 = __webpack_require__(4);
exports.NameGenerator = name_generator_class_1.NameGenerator;
var template_generator_class_1 = __webpack_require__(5);
exports.TemplateGenerator = template_generator_class_1.TemplateGenerator;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class NameGenerator {
    constructor(name) {
        this.name = name;
        this.captalizeName = this.captalize();
        this.aliasName = this.alias();
        this.controllerName = this.controller();
        this.componentName = this.component();
    }
    captalize() {
        return this.name
            .split('-')
            .map(s => this.capitalizeFirstLetter(s))
            .join(' ');
    }
    alias() {
        return this.name
            .split('-')
            .map((s, i) => {
            if (i != 0)
                s = this.capitalizeFirstLetter(s);
            return s;
        })
            .join('');
    }
    controller() {
        return this.name
            .concat('-controller')
            .split('-')
            .map(s => this.capitalizeFirstLetter(s))
            .join('');
    }
    component() {
        return this.name
            .concat('-component')
            .split('-')
            .map(s => this.capitalizeFirstLetter(s))
            .join('');
    }
    capitalizeFirstLetter(string) {
        return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
    }
}
exports.NameGenerator = NameGenerator;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class TemplateGenerator {
    static component(nameGenerator) {
        return `import { ${nameGenerator.controllerName} } from './${nameGenerator.name}.controller'
import './${nameGenerator.name}.style'
const template = require('./${nameGenerator.name}.template')

export class ${nameGenerator.componentName} implements ng.IComponentOptions
{
	public static alias = '${nameGenerator.aliasName}'
	public controller: ng.Injectable<ng.IControllerConstructor>
	public controllerAs: string
	public template: string

	constructor() {
		this.controller = ${nameGenerator.controllerName}
		this.controllerAs = "$ctrl"
		this.template = template()
	}
}
`;
    }
    static controller(nameGenerator) {
        return `export class ${nameGenerator.controllerName} implements ng.IComponentController
{

}
`;
    }
    static pug(nameGenerator) {
        return `h2 ${nameGenerator.captalizeName} Template`;
    }
    static stylus(nameGenerator) {
        return `/* ==========================================================================
-- ${nameGenerator.captalizeName} Component
========================================================================== */
`;
    }
}
exports.TemplateGenerator = TemplateGenerator;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class NameGenerator {
    constructor(name) {
        this.name = name;
        this.captalizeName = this.captalize();
    }
    captalize() {
        return this.name
            .split('.')
            .map(s => this.capitalizeFirstLetter(s))
            .join('');
    }
    capitalizeFirstLetter(string) {
        return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
    }
}
exports.NameGenerator = NameGenerator;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class TemplateGenerator {
    static module(moduleNameGenerator, componentNameGenerator) {
        return `import * as angular 				from 'angular'
import UIRouter 					from '@uirouter/angularjs'
import { Router } 					from './router'
import { ${componentNameGenerator.componentName} } 				from './components/${componentNameGenerator.name}'

export const ${moduleNameGenerator.captalizeName}Module = angular
	.module("${moduleNameGenerator.name}", [ UIRouter ])
	.component(${componentNameGenerator.componentName}.alias, new ${componentNameGenerator.componentName}())
	.config(Router)
		`;
    }
    static router(componentNameGenerator) {
        return `import { ${componentNameGenerator.componentName} } from './components/${componentNameGenerator.name}'

export const Router = (
	$stateProvider : ng.ui.IStateProvider, 
	$urlRouterProvider : ng.ui.IUrlRouterProvider
) => {
	
	$stateProvider.state('${componentNameGenerator.name}', {
		url: '/${componentNameGenerator.name}',
		component: ${componentNameGenerator.componentName}.alias
	})
} 

Router.$inject = [
	'$stateProvider',
	'$urlRouterProvider'
]
		`;
    }
}
exports.TemplateGenerator = TemplateGenerator;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __webpack_require__(0);
const angularModule = __webpack_require__(10);
const angularComponent = __webpack_require__(3);
const Utils = __webpack_require__(1);
exports.nodeTemplateGenerator = function () {
    Utils.Log.welcome();
    actions();
};
function menu(option) {
    switch (option) {
        case 1:
            angularModule.task();
            break;
        case 2:
            angularComponent.task();
            break;
        case 3:
            Utils.Log.bye();
            break;
    }
}
function actions() {
    Utils.Log.choice();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('line', (line) => {
        const option = +line;
        if (isNaN(option)) {
            Utils.Log.numbersOnly();
        }
        else {
            if (option > 0 && option < 4) {
                rl.close();
                menu(option);
            }
            else {
                Utils.Log.invalidOption();
            }
        }
    });
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var task_1 = __webpack_require__(11);
exports.task = task_1.task;
var name_generator_class_1 = __webpack_require__(6);
exports.NameGenerator = name_generator_class_1.NameGenerator;
var template_generator_class_1 = __webpack_require__(7);
exports.TemplateGenerator = template_generator_class_1.TemplateGenerator;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(0);
const Utils = __webpack_require__(1);
const angularComponent = __webpack_require__(3);
const name_generator_class_1 = __webpack_require__(6);
const template_generator_class_1 = __webpack_require__(7);
exports.task = () => {
    run();
    function run() {
        return __awaiter(this, void 0, void 0, function* () {
            const moduleName = yield Utils.readLineData(Utils.Log.moduleName, Utils.Log.moduleExample);
            const componentName = yield Utils.readLineData(Utils.Log.componentName, Utils.Log.componentExample);
            const moduleNameGenerator = new name_generator_class_1.NameGenerator(moduleName);
            const componentNameGenerator = new angularComponent.NameGenerator(componentName);
            const moduleTemplate = template_generator_class_1.TemplateGenerator.module(moduleNameGenerator, componentNameGenerator);
            const routerTemplate = template_generator_class_1.TemplateGenerator.router(componentNameGenerator);
            const componentTemplate = angularComponent.TemplateGenerator.component(componentNameGenerator);
            const controllerTemplate = angularComponent.TemplateGenerator.controller(componentNameGenerator);
            const pugTemplate = angularComponent.TemplateGenerator.pug(componentNameGenerator);
            const stylusTemplate = angularComponent.TemplateGenerator.stylus(componentNameGenerator);
            build();
            function build() {
                return __awaiter(this, void 0, void 0, function* () {
                    const fullpath = `${moduleName}/components/${componentName}`;
                    Utils.Log.creatingDirectory();
                    yield fs.mkdirSync(moduleName);
                    yield fs.mkdirSync(`${moduleName}/components`);
                    yield fs.mkdirSync(fullpath);
                    Utils.Log.creatingModule();
                    yield fs.writeFileSync(`${moduleName}/index.ts`, moduleTemplate);
                    Utils.Log.creatingRouter();
                    yield fs.writeFileSync(`${moduleName}/router.ts`, routerTemplate);
                    Utils.Log.creatingComponent();
                    yield fs.writeFileSync(`${fullpath}/index.ts`, componentTemplate);
                    Utils.Log.creatingController();
                    yield fs.writeFileSync(`${fullpath}/${componentName}.controller.ts`, controllerTemplate);
                    Utils.Log.creatingPug();
                    yield fs.writeFileSync(`${fullpath}/${componentName}.template.pug`, pugTemplate);
                    Utils.Log.creatingStyle();
                    yield fs.writeFileSync(`${fullpath}/${componentName}.style.styl`, stylusTemplate);
                    Utils.Log.moduleDone(moduleName);
                    Utils.Log.done();
                });
            }
        });
    }
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Log {
    static done() {
    }
    static creatingDirectory() {
    }
    static creatingModule() {
    }
    static creatingRouter() {
    }
    static creatingComponent() {
    }
    static creatingController() {
    }
    static creatingPug() {
    }
    static creatingStyle() {
    }
    static componentName() {
    }
    static componentExample() {
    }
    static componentDone(name) {
    }
    static moduleDone(name) {
    }
    static moduleName() {
    }
    static moduleExample(example) {
    }
    static choice() {
    }
    static numbersOnly() {
        this.choice();
    }
    static invalidOption() {
        this.choice();
    }
    static bye() {
    }
    static welcome() {
    }
}
exports.Log = Log;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __webpack_require__(0);
function readLineData(message, example) {
    return new Promise((res, rej) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        message();
        example();
        rl.on('line', (line) => {
            rl.close();
            res(line);
        });
    });
}
exports.readLineData = readLineData;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(0);
const Utils = __webpack_require__(1);
const name_generator_class_1 = __webpack_require__(4);
const template_generator_class_1 = __webpack_require__(5);
exports.task = () => {
    run();
    function run() {
        return __awaiter(this, void 0, void 0, function* () {
            const componentName = yield Utils.readLineData(Utils.Log.componentName, Utils.Log.componentExample);
            const nameGenerator = new name_generator_class_1.NameGenerator(componentName);
            const componentTemplate = template_generator_class_1.TemplateGenerator.component(nameGenerator);
            const controllerTemplate = template_generator_class_1.TemplateGenerator.controller(nameGenerator);
            const pugTemplate = template_generator_class_1.TemplateGenerator.pug(nameGenerator);
            const stylusTemplate = template_generator_class_1.TemplateGenerator.stylus(nameGenerator);
            build();
            function build() {
                return __awaiter(this, void 0, void 0, function* () {
                    Utils.Log.creatingDirectory();
                    yield fs.mkdirSync(componentName);
                    Utils.Log.creatingComponent();
                    yield fs.writeFileSync(`${componentName}/index.ts`, componentTemplate);
                    Utils.Log.creatingController();
                    yield fs.writeFileSync(`${componentName}/${componentName}.controller.ts`, controllerTemplate);
                    Utils.Log.creatingPug();
                    yield fs.writeFileSync(`${componentName}/${componentName}.template.pug`, pugTemplate);
                    Utils.Log.creatingStyle();
                    yield fs.writeFileSync(`${componentName}/${componentName}.style.styl`, stylusTemplate);
                    Utils.Log.componentDone(componentName);
                    Utils.Log.done();
                });
            }
        });
    }
};


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map