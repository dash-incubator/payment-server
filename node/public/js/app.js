/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/bip70/create.js":
/*!***********************************!*\
  !*** ./resources/bip70/create.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\nconst create = async function(data) {\r\n    return await fetch('/payment/create', {\r\n            body: JSON.stringify(data),\r\n            cache: 'no-cache',\r\n            headers: {\r\n                'Accept': 'application/json',\r\n                'Content-Type': 'application/json'\r\n            },\r\n            method: 'POST',\r\n            mode: 'cors'\r\n        })\r\n        .then((response) => {\r\n            if (response.status >= 200 && response.status < 300) {\r\n                return response.json();\r\n            }\r\n\r\n            return {};\r\n        });\r\n};\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (create);\r\n\n\n//# sourceURL=webpack:///./resources/bip70/create.js?");

/***/ }),

/***/ "./resources/bip70/index.js":
/*!**********************************!*\
  !*** ./resources/bip70/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create */ \"./resources/bip70/create.js\");\n/* harmony import */ var _poll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./poll */ \"./resources/bip70/poll.js\");\n\r\n\r\n\r\n__webpack_require__.g.bip70 = { create: _create__WEBPACK_IMPORTED_MODULE_0__.default, poll: _poll__WEBPACK_IMPORTED_MODULE_1__.default };\r\n\n\n//# sourceURL=webpack:///./resources/bip70/index.js?");

/***/ }),

/***/ "./resources/bip70/poll.js":
/*!*********************************!*\
  !*** ./resources/bip70/poll.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\nconst poll = async function(url, success, platform = false) {\r\n    setTimeout(async () => {\r\n        let response = await fetch(url, {\r\n                cache: 'no-cache',\r\n                headers: {\r\n                    'Accept': 'application/json',\r\n                    'Content-Type': 'application/json'\r\n                }\r\n            })\r\n            .then((response) => {\r\n                if (response.status >= 200 && response.status < 300) {\r\n                    return response.json();\r\n                }\r\n\r\n                return {};\r\n            });\r\n\r\n        if (response.complete || false) {\r\n            if (platform) {\r\n                console.log(response);\r\n            }\r\n            else {\r\n                window.location.replace(success);\r\n            }\r\n        }\r\n\r\n        poll(url, success);\r\n    }, (10 * 1000));\r\n}\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (poll);\r\n\n\n//# sourceURL=webpack:///./resources/bip70/poll.js?");

/***/ }),

/***/ "./resources/index/incubator.js":
/*!**************************************!*\
  !*** ./resources/index/incubator.js ***!
  \**************************************/
/***/ (() => {

eval("let data = localStorage.getItem('data') || \"{}\",\r\n    qr = document.getElementById('qr');\r\n\r\n\r\nasync function bip70() {\r\n    data = JSON.parse( data );\r\n\r\n    if (!data || (data.expires || 0) <= (Date.now() / 1000)) {\r\n        data = await window.bip70.create({\r\n            pay: [\r\n                {\r\n                    amount: 0.005,\r\n                    address: 'yNgkWeuCEzyH8J7PBB9vYQGspsa81Ajfrs'\r\n                }\r\n            ],\r\n            storage: {\r\n                random: 'Hey Ash this is the full response from Dash Platform',\r\n                timestamp: Date.now()\r\n            }\r\n        });\r\n\r\n        localStorage.setItem('data', JSON.stringify(data));\r\n    }\r\n\r\n    qr.src = data.qr;\r\n\r\n    window.bip70.poll(data.poll, '/unlocked-content', true);\r\n}\r\n\r\n\r\nbip70();\r\n\n\n//# sourceURL=webpack:///./resources/index/incubator.js?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./resources/bip70/create.js");
/******/ 	__webpack_require__("./resources/bip70/index.js");
/******/ 	__webpack_require__("./resources/bip70/poll.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./resources/index/incubator.js");
/******/ 	
/******/ })()
;