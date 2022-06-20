"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathJaxBaseContext = void 0;
var react_1 = __importStar(require("react"));
exports.MathJaxBaseContext = react_1.createContext(undefined);
var v3Promise;
var MathJaxContext = function (_a) {
    var _b = _a.version, version = _b === void 0 ? 3 : _b, onError = _a.onError, typesettingOptions = _a.typesettingOptions, _c = _a.renderMode, renderMode = _c === void 0 ? "post" : _c, hideUntilTypeset = _a.hideUntilTypeset, children = _a.children;
    var previousContext = react_1.useContext(exports.MathJaxBaseContext);
    var mjContext = react_1.useRef(previousContext);
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
    return react_1.default.createElement(exports.MathJaxBaseContext.Provider, { value: mjContext.current }, children);
};
exports.default = MathJaxContext;
