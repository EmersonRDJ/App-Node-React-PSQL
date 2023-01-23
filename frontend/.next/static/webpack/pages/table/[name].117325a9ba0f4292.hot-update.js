"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/table/[name]",{

/***/ "./src/components/Table.jsx":
/*!**********************************!*\
  !*** ./src/components/Table.jsx ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ \"./node_modules/@fortawesome/react-fontawesome/index.es.js\");\n/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ \"./node_modules/@fortawesome/free-solid-svg-icons/index.mjs\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _redux_slices_tableContentSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../redux/slices/tableContentSlice */ \"./src/redux/slices/tableContentSlice.js\");\n// React\n\nvar _s = $RefreshSig$();\n\n// Font Awesome\n\n\n// Redux\n\n// Redux actions\n\nconst Table = (props)=>{\n    _s();\n    const tableRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    // Redux state\n    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();\n    const tableContent = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.tableContent);\n    const tableHeader = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.tableHeader);\n    // Component state\n    const [currDir, setCurrDir] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"asc\");\n    const [currProp, setCurrProp] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(tableHeader[0]);\n    console.log(tableHeader[0]);\n    // Sort rows when clicking on the header property\n    function sortRows(param) {\n        let { property =currProp , direction =currDir , newTableContent =tableContent , changeDir =true  } = param;\n        if (changeDir) {\n            if (currProp === property) {\n                direction = direction === \"asc\" ? \"desc\" : \"asc\";\n            } else {\n                direction = \"asc\";\n            }\n        }\n        setCurrDir(direction);\n        setCurrProp(property);\n        const sortedRows = [\n            ...newTableContent.data\n        ].sort((a, b)=>{\n            if (a[property] < b[property] || a[property] === null && b[property] !== null) {\n                return direction === \"asc\" ? -1 : 1;\n            } else if (a[property] > b[property] || a[property] !== null && b[property] === null) {\n                return direction === \"asc\" ? 1 : -1;\n            } else {\n                return 0;\n            }\n        });\n        dispatch((0,_redux_slices_tableContentSlice__WEBPACK_IMPORTED_MODULE_4__.setData)(sortedRows));\n    }\n    // Render header\n    function showHeader(infos) {\n        if (infos) {\n            return infos.map((info)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                    onClick: ()=>sortRows({\n                            property: info.name\n                        }),\n                    className: \"px-2 py-4 cursor-pointer row text-left p-4 \".concat(currProp === info.name ? \"bg-slate-500\" : \"bg-slate-400\"),\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"flex flex-shrink-0 row\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"mx-1 text-[2.5vh]\",\n                                children: info.name\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\emers\\\\Desktop\\\\App-Node-React-PSQL\\\\frontend\\\\src\\\\components\\\\Table.jsx\",\n                                lineNumber: 59,\n                                columnNumber: 29\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"mx-1 text-[2.5vh]\",\n                                children: currProp === info.name ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {\n                                    icon: currDir === \"asc\" ? _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__.faSortDown : _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__.faSortUp\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\emers\\\\Desktop\\\\App-Node-React-PSQL\\\\frontend\\\\src\\\\components\\\\Table.jsx\",\n                                    lineNumber: 60,\n                                    columnNumber: 91\n                                }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {\n                                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__.faSort\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\emers\\\\Desktop\\\\App-Node-React-PSQL\\\\frontend\\\\src\\\\components\\\\Table.jsx\",\n                                    lineNumber: 60,\n                                    columnNumber: 163\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\emers\\\\Desktop\\\\App-Node-React-PSQL\\\\frontend\\\\src\\\\components\\\\Table.jsx\",\n                                lineNumber: 60,\n                                columnNumber: 29\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\emers\\\\Desktop\\\\App-Node-React-PSQL\\\\frontend\\\\src\\\\components\\\\Table.jsx\",\n                        lineNumber: 58,\n                        columnNumber: 25\n                    }, this)\n                }, info.name, false, {\n                    fileName: \"C:\\\\Users\\\\emers\\\\Desktop\\\\App-Node-React-PSQL\\\\frontend\\\\src\\\\components\\\\Table.jsx\",\n                    lineNumber: 57,\n                    columnNumber: 21\n                }, this));\n        }\n    }\n    // Render table body\n    function showRows(contents) {\n        if (contents) {\n            return contents.map((content, i)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                    className: \"\".concat(i % 2 === 0 ? \"bg-slate-200\" : \"bg-slate-100\", \" text-l h-fit\"),\n                    onDoubleClick: ()=>{\n                        props.setForm(content);\n                        props.setOpenForm(true);\n                    },\n                    children: tableHeader.data.map((key)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                            className: \"text-[2vh] border-b-2 border-slate-400 text-left p-3 max-w-screen-sm break-words\",\n                            children: String(content[key.name])\n                        }, key.name, false, {\n                            fileName: \"C:\\\\Users\\\\emers\\\\Desktop\\\\App-Node-React-PSQL\\\\frontend\\\\src\\\\components\\\\Table.jsx\",\n                            lineNumber: 75,\n                            columnNumber: 25\n                        }, this))\n                }, content.id, false, {\n                    fileName: \"C:\\\\Users\\\\emers\\\\Desktop\\\\App-Node-React-PSQL\\\\frontend\\\\src\\\\components\\\\Table.jsx\",\n                    lineNumber: 73,\n                    columnNumber: 17\n                }, this));\n        }\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"table\", {\n        ref: tableRef,\n        className: \"table-auto w-full \".concat(props.aS ? \"mr-4 mb-4\" : \"\"),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"thead\", {\n                className: \"sticky top-[-1px]\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                    className: \"text-xl\",\n                    children: showHeader(tableHeader.data)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\emers\\\\Desktop\\\\App-Node-React-PSQL\\\\frontend\\\\src\\\\components\\\\Table.jsx\",\n                    lineNumber: 88,\n                    columnNumber: 17\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\emers\\\\Desktop\\\\App-Node-React-PSQL\\\\frontend\\\\src\\\\components\\\\Table.jsx\",\n                lineNumber: 87,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tbody\", {\n                className: \"h-fit\",\n                children: showRows(tableContent.data)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\emers\\\\Desktop\\\\App-Node-React-PSQL\\\\frontend\\\\src\\\\components\\\\Table.jsx\",\n                lineNumber: 92,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\emers\\\\Desktop\\\\App-Node-React-PSQL\\\\frontend\\\\src\\\\components\\\\Table.jsx\",\n        lineNumber: 86,\n        columnNumber: 9\n    }, undefined);\n};\n_s(Table, \"XPm0ArJrPfGQgq/GHWdkBgjBfDg=\", false, function() {\n    return [\n        react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch,\n        react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector,\n        react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector\n    ];\n});\n_c = Table;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Table);\nvar _c;\n$RefreshReg$(_c, \"Table\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9UYWJsZS5qc3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsUUFBUTtBQUNSOztBQUEwRDtBQUUxRCxlQUFlO0FBQ2lEO0FBQ2dCO0FBRWhGLFFBQVE7QUFDOEM7QUFFdEQsZ0JBQWdCO0FBQ2tFO0FBRWxGLE1BQU1ZLFFBQVFDLENBQUFBLFFBQVM7O0lBQ25CLE1BQU1DLFdBQVdaLDZDQUFNQSxDQUFDLElBQUk7SUFFNUIsY0FBYztJQUNkLE1BQU1hLFdBQVdOLHdEQUFXQTtJQUM1QixNQUFNTyxlQUFlUix3REFBV0EsQ0FBQ1MsQ0FBQUEsUUFBU0EsTUFBTUQsWUFBWTtJQUM1RCxNQUFNRSxjQUFjVix3REFBV0EsQ0FBQ1MsQ0FBQUEsUUFBU0EsTUFBTUMsV0FBVztJQUUxRCxrQkFBa0I7SUFDbEIsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUduQiwrQ0FBUUEsQ0FBRTtJQUN4QyxNQUFNLENBQUNvQixVQUFVQyxZQUFZLEdBQUdyQiwrQ0FBUUEsQ0FBQ2lCLFdBQVcsQ0FBQyxFQUFFO0lBRXZESyxRQUFRQyxHQUFHLENBQUNOLFdBQVcsQ0FBQyxFQUFFO0lBRTFCLGlEQUFpRDtJQUNqRCxTQUFTTyxTQUFTLEtBQTRGLEVBQUU7WUFBOUYsRUFBRUMsVUFBV0wsU0FBUSxFQUFFTSxXQUFZUixRQUFPLEVBQUVTLGlCQUFrQlosYUFBWSxFQUFFYSxXQUFVLElBQUksR0FBRSxHQUE1RjtRQUNkLElBQUdBLFdBQVU7WUFDVCxJQUFHUixhQUFhSyxVQUFTO2dCQUNyQkMsWUFBWUEsY0FBZSxRQUFRLFNBQVMsS0FBSTtZQUNwRCxPQUNLO2dCQUNEQSxZQUFhO1lBQ2pCLENBQUM7UUFDTCxDQUFDO1FBQ0RQLFdBQVdPO1FBQ1hMLFlBQVlJO1FBQ1osTUFBTUksYUFBYTtlQUFJRixnQkFBZ0JHLElBQUk7U0FBQyxDQUFDQyxJQUFJLENBQUMsQ0FBQ0MsR0FBR0MsSUFBTTtZQUN4RCxJQUFJRCxDQUFDLENBQUNQLFNBQVMsR0FBR1EsQ0FBQyxDQUFDUixTQUFTLElBQUlPLENBQUMsQ0FBQ1AsU0FBUyxLQUFLLElBQUksSUFBSVEsQ0FBQyxDQUFDUixTQUFTLEtBQUssSUFBSSxFQUFFO2dCQUMzRSxPQUFPQyxjQUFlLFFBQU8sQ0FBQyxJQUFJLENBQUM7WUFDdkMsT0FBTyxJQUFJTSxDQUFDLENBQUNQLFNBQVMsR0FBR1EsQ0FBQyxDQUFDUixTQUFTLElBQUlPLENBQUMsQ0FBQ1AsU0FBUyxLQUFLLElBQUksSUFBSVEsQ0FBQyxDQUFDUixTQUFTLEtBQUssSUFBSSxFQUFFO2dCQUNsRixPQUFPQyxjQUFlLFFBQU8sSUFBSSxDQUFDLENBQUM7WUFDdkMsT0FBTztnQkFDSCxPQUFPO1lBQ1gsQ0FBQztRQUNMO1FBQ0FaLFNBQVNKLHdFQUFtQkEsQ0FBQ21CO0lBQ2pDO0lBRUEsZ0JBQWdCO0lBQ2hCLFNBQVNLLFdBQVdDLEtBQUssRUFBRTtRQUN2QixJQUFHQSxPQUFNO1lBQ0wsT0FDSUEsTUFBTUMsR0FBRyxDQUFDLENBQUNDLHFCQUNQLDhEQUFDQztvQkFBR0MsU0FBUyxJQUFNZixTQUFTOzRCQUFFQyxVQUFTWSxLQUFLRyxJQUFJO3dCQUFDO29CQUFHQyxXQUFXLDhDQUF3RyxPQUF6RHJCLGFBQWFpQixLQUFLRyxJQUFJLEdBQUksaUJBQWlCLGNBQWE7OEJBQ2xLLDRFQUFDRTt3QkFBS0QsV0FBVTs7MENBQ1osOERBQUNDO2dDQUFLRCxXQUFVOzBDQUFzQkosS0FBS0csSUFBSTs7Ozs7OzBDQUMvQyw4REFBQ0U7Z0NBQUtELFdBQVU7MENBQXFCckIsYUFBYWlCLEtBQUtHLElBQUksaUJBQUcsOERBQUNyQywyRUFBZUE7b0NBQUN3QyxNQUFPekIsWUFBYSxRQUFPYix5RUFBVUEsR0FBR0MsdUVBQVE7Ozs7O3lEQUFPLDhEQUFDSCwyRUFBZUE7b0NBQUN3QyxNQUFNdkMscUVBQU1BOzs7Ozt3Q0FBRzs7Ozs7Ozs7Ozs7O21CQUhDaUMsS0FBS0csSUFBSTs7Ozs7UUFRcE0sQ0FBQztJQUNMO0lBRUEsb0JBQW9CO0lBQ3BCLFNBQVNJLFNBQVNDLFFBQVEsRUFBRTtRQUN4QixJQUFHQSxVQUFTO1lBQ1IsT0FDRUEsU0FBU1QsR0FBRyxDQUFDLENBQUNVLFNBQVNDLGtCQUNyQiw4REFBQ0M7b0JBQW9CUCxXQUFXLEdBQStDLE9BQTVDTSxJQUFFLE1BQU0sSUFBSSxpQkFBaUIsY0FBYyxFQUFDO29CQUFnQkUsZUFBZSxJQUFNO3dCQUFDckMsTUFBTXNDLE9BQU8sQ0FBQ0o7d0JBQVVsQyxNQUFNdUMsV0FBVyxDQUFDLElBQUk7b0JBQUM7OEJBQy9KbEMsWUFBWWEsSUFBSSxDQUFDTSxHQUFHLENBQUMsQ0FBQ2dCLG9CQUNuQiw4REFBQ0M7NEJBQUdaLFdBQVU7c0NBQ1RhLE9BQU9SLE9BQU8sQ0FBQ00sSUFBSVosSUFBSSxDQUFDOzJCQUR5RVksSUFBSVosSUFBSTs7Ozs7bUJBRjdHTSxRQUFRUyxFQUFFOzs7OztRQVMzQixDQUFDO0lBQ0w7SUFFQSxxQkFDSSw4REFBQ0M7UUFBTUMsS0FBSzVDO1FBQVU0QixXQUFXLHFCQUFtRCxPQUE3QjdCLE1BQU04QyxFQUFFLEdBQUcsY0FBYyxFQUFFOzswQkFDOUUsOERBQUNDO2dCQUFNbEIsV0FBVTswQkFDYiw0RUFBQ087b0JBQUdQLFdBQVU7OEJBQ1JQLFdBQVdqQixZQUFZYSxJQUFJOzs7Ozs7Ozs7OzswQkFHckMsOERBQUM4QjtnQkFBTW5CLFdBQVU7MEJBQ1hHLFNBQVM3QixhQUFhZSxJQUFJOzs7Ozs7Ozs7Ozs7QUFJNUM7R0FuRk1uQjs7UUFJZUgsb0RBQVdBO1FBQ1BELG9EQUFXQTtRQUNaQSxvREFBV0E7OztLQU43Qkk7QUFxRk4sK0RBQWVBLEtBQUtBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvVGFibGUuanN4PzU0OWQiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gUmVhY3RcclxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xyXG5cclxuLy8gRm9udCBBd2Vzb21lXHJcbmltcG9ydCB7IEZvbnRBd2Vzb21lSWNvbiB9IGZyb20gJ0Bmb3J0YXdlc29tZS9yZWFjdC1mb250YXdlc29tZSdcclxuaW1wb3J0IHsgZmFTb3J0LCBmYVNvcnREb3duLCBmYVNvcnRVcCB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucydcclxuXHJcbi8vIFJlZHV4XHJcbmltcG9ydCB7IHVzZVNlbGVjdG9yLCB1c2VEaXNwYXRjaCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xyXG5cclxuLy8gUmVkdXggYWN0aW9uc1xyXG5pbXBvcnQgeyBzZXREYXRhIGFzIHNldFRhYmxlQ29udGVudERhdGEgfSBmcm9tICcuLi9yZWR1eC9zbGljZXMvdGFibGVDb250ZW50U2xpY2UnXHJcblxyXG5jb25zdCBUYWJsZSA9IHByb3BzID0+IHtcclxuICAgIGNvbnN0IHRhYmxlUmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICAgIC8vIFJlZHV4IHN0YXRlXHJcbiAgICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7IFxyXG4gICAgY29uc3QgdGFibGVDb250ZW50ID0gdXNlU2VsZWN0b3Ioc3RhdGUgPT4gc3RhdGUudGFibGVDb250ZW50KVxyXG4gICAgY29uc3QgdGFibGVIZWFkZXIgPSB1c2VTZWxlY3RvcihzdGF0ZSA9PiBzdGF0ZS50YWJsZUhlYWRlcilcclxuICAgIFxyXG4gICAgLy8gQ29tcG9uZW50IHN0YXRlXHJcbiAgICBjb25zdCBbY3VyckRpciwgc2V0Q3VyckRpcl0gPSB1c2VTdGF0ZShgYXNjYClcclxuICAgIGNvbnN0IFtjdXJyUHJvcCwgc2V0Q3VyclByb3BdID0gdXNlU3RhdGUodGFibGVIZWFkZXJbMF0pXHJcblxyXG4gICAgY29uc29sZS5sb2codGFibGVIZWFkZXJbMF0pXHJcblxyXG4gICAgLy8gU29ydCByb3dzIHdoZW4gY2xpY2tpbmcgb24gdGhlIGhlYWRlciBwcm9wZXJ0eVxyXG4gICAgZnVuY3Rpb24gc29ydFJvd3MoeyBwcm9wZXJ0eSA9IGN1cnJQcm9wLCBkaXJlY3Rpb24gPSBjdXJyRGlyLCBuZXdUYWJsZUNvbnRlbnQgPSB0YWJsZUNvbnRlbnQsIGNoYW5nZURpcj10cnVlIH0pIHtcclxuICAgICAgICBpZihjaGFuZ2VEaXIpe1xyXG4gICAgICAgICAgICBpZihjdXJyUHJvcCA9PT0gcHJvcGVydHkpe1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gZGlyZWN0aW9uID09PSBgYXNjYCA/IGBkZXNjYCA6IGBhc2NgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBgYXNjYFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldEN1cnJEaXIoZGlyZWN0aW9uKVxyXG4gICAgICAgIHNldEN1cnJQcm9wKHByb3BlcnR5KTtcclxuICAgICAgICBjb25zdCBzb3J0ZWRSb3dzID0gWy4uLm5ld1RhYmxlQ29udGVudC5kYXRhXS5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhW3Byb3BlcnR5XSA8IGJbcHJvcGVydHldIHx8IGFbcHJvcGVydHldID09PSBudWxsICYmIGJbcHJvcGVydHldICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlyZWN0aW9uID09PSBgYXNjYCA/IC0xIDogMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhW3Byb3BlcnR5XSA+IGJbcHJvcGVydHldIHx8IGFbcHJvcGVydHldICE9PSBudWxsICYmIGJbcHJvcGVydHldID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlyZWN0aW9uID09PSBgYXNjYCA/IDEgOiAtMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGlzcGF0Y2goc2V0VGFibGVDb250ZW50RGF0YShzb3J0ZWRSb3dzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVuZGVyIGhlYWRlclxyXG4gICAgZnVuY3Rpb24gc2hvd0hlYWRlcihpbmZvcykge1xyXG4gICAgICAgIGlmKGluZm9zKXtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIGluZm9zLm1hcCgoaW5mbykgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDx0aCBvbkNsaWNrPXsoKSA9PiBzb3J0Um93cyh7IHByb3BlcnR5OmluZm8ubmFtZSB9KX1jbGFzc05hbWU9e2BweC0yIHB5LTQgY3Vyc29yLXBvaW50ZXIgcm93IHRleHQtbGVmdCBwLTQgJHsgY3VyclByb3AgPT09IGluZm8ubmFtZSA/IGBiZy1zbGF0ZS01MDBgIDogYGJnLXNsYXRlLTQwMGB9YH0ga2V5PXtpbmZvLm5hbWV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtc2hyaW5rLTAgcm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJteC0xIHRleHQtWzIuNXZoXVwiPnsgaW5mby5uYW1lIH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJteC0xIHRleHQtWzIuNXZoXVwiPntjdXJyUHJvcCA9PT0gaW5mby5uYW1lID8gPEZvbnRBd2Vzb21lSWNvbiBpY29uPXsgY3VyckRpciA9PT0gYGFzY2AgPyBmYVNvcnREb3duIDogZmFTb3J0VXAgfS8+IDogPEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYVNvcnR9Lz4gfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW5kZXIgdGFibGUgYm9keVxyXG4gICAgZnVuY3Rpb24gc2hvd1Jvd3MoY29udGVudHMpIHtcclxuICAgICAgICBpZihjb250ZW50cyl7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgY29udGVudHMubWFwKChjb250ZW50LCBpKSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtjb250ZW50LmlkfSBjbGFzc05hbWU9e2Ake2klMiA9PT0gMCA/ICdiZy1zbGF0ZS0yMDAnIDogJ2JnLXNsYXRlLTEwMCd9IHRleHQtbCBoLWZpdGB9IG9uRG91YmxlQ2xpY2s9eygpID0+IHtwcm9wcy5zZXRGb3JtKGNvbnRlbnQpOyBwcm9wcy5zZXRPcGVuRm9ybSh0cnVlKX19PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0YWJsZUhlYWRlci5kYXRhLm1hcCgoa2V5KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0ZXh0LVsydmhdIGJvcmRlci1iLTIgYm9yZGVyLXNsYXRlLTQwMCB0ZXh0LWxlZnQgcC0zIG1heC13LXNjcmVlbi1zbSBicmVhay13b3Jkc1wiIGtleT17a2V5Lm5hbWV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1N0cmluZyhjb250ZW50W2tleS5uYW1lXSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4oXHJcbiAgICAgICAgPHRhYmxlIHJlZj17dGFibGVSZWZ9IGNsYXNzTmFtZT17YHRhYmxlLWF1dG8gdy1mdWxsICR7IHByb3BzLmFTID8gJ21yLTQgbWItNCcgOiAnJyB9YH0+XHJcbiAgICAgICAgICAgIDx0aGVhZCBjbGFzc05hbWU9J3N0aWNreSB0b3AtWy0xcHhdJyA+XHJcbiAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwidGV4dC14bFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgc2hvd0hlYWRlcih0YWJsZUhlYWRlci5kYXRhKSB9XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICA8dGJvZHkgY2xhc3NOYW1lPSdoLWZpdCc+XHJcbiAgICAgICAgICAgICAgICB7IHNob3dSb3dzKHRhYmxlQ29udGVudC5kYXRhKSB9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgPC90YWJsZT5cclxuICAgIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFibGUiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZVJlZiIsInVzZUVmZmVjdCIsIkZvbnRBd2Vzb21lSWNvbiIsImZhU29ydCIsImZhU29ydERvd24iLCJmYVNvcnRVcCIsInVzZVNlbGVjdG9yIiwidXNlRGlzcGF0Y2giLCJzZXREYXRhIiwic2V0VGFibGVDb250ZW50RGF0YSIsIlRhYmxlIiwicHJvcHMiLCJ0YWJsZVJlZiIsImRpc3BhdGNoIiwidGFibGVDb250ZW50Iiwic3RhdGUiLCJ0YWJsZUhlYWRlciIsImN1cnJEaXIiLCJzZXRDdXJyRGlyIiwiY3VyclByb3AiLCJzZXRDdXJyUHJvcCIsImNvbnNvbGUiLCJsb2ciLCJzb3J0Um93cyIsInByb3BlcnR5IiwiZGlyZWN0aW9uIiwibmV3VGFibGVDb250ZW50IiwiY2hhbmdlRGlyIiwic29ydGVkUm93cyIsImRhdGEiLCJzb3J0IiwiYSIsImIiLCJzaG93SGVhZGVyIiwiaW5mb3MiLCJtYXAiLCJpbmZvIiwidGgiLCJvbkNsaWNrIiwibmFtZSIsImNsYXNzTmFtZSIsInNwYW4iLCJpY29uIiwic2hvd1Jvd3MiLCJjb250ZW50cyIsImNvbnRlbnQiLCJpIiwidHIiLCJvbkRvdWJsZUNsaWNrIiwic2V0Rm9ybSIsInNldE9wZW5Gb3JtIiwia2V5IiwidGQiLCJTdHJpbmciLCJpZCIsInRhYmxlIiwicmVmIiwiYVMiLCJ0aGVhZCIsInRib2R5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Table.jsx\n"));

/***/ })

});