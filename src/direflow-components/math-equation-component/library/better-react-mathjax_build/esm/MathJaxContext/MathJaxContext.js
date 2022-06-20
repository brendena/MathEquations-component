var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { createContext, useContext, useRef } from "react";
export var MathJaxBaseContext = createContext(undefined);
var v3Promise;
var MathJaxContext = function (_a) {
    var _b = _a.version, version = _b === void 0 ? 3 : _b, onError = _a.onError, typesettingOptions = _a.typesettingOptions, _c = _a.renderMode, renderMode = _c === void 0 ? "post" : _c, hideUntilTypeset = _a.hideUntilTypeset, children = _a.children;
    var previousContext = useContext(MathJaxBaseContext);
    var mjContext = useRef(previousContext);
    function scriptInjector(res, rej) {
        var mathJax = window.MathJax;
        res(mathJax);
    }
    if (typeof mjContext.current === "undefined") {
        var baseContext = {
            typesettingOptions: typesettingOptions,
            renderMode: renderMode,
            hideUntilTypeset: hideUntilTypeset
        };
        v3Promise = new Promise(scriptInjector);
        mjContext.current = __assign(__assign({}, baseContext), { version: 3, promise: v3Promise });
    }
    return React.createElement(MathJaxBaseContext.Provider, { value: mjContext.current }, children);
};
export default MathJaxContext;
