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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var MathJaxContext_1 = require("../MathJaxContext");
var typesettingFailed = function (err) {
    return "Typesetting failed: " + (typeof err.message !== "undefined" ? err.message : err.toString());
};
var MathJax = function (_a) {
    var _b;
    var _c = _a.inline, inline = _c === void 0 ? false : _c, hideUntilTypeset = _a.hideUntilTypeset, onInitTypeset = _a.onInitTypeset, onTypeset = _a.onTypeset, text = _a.text, dynamic = _a.dynamic, typesettingOptions = _a.typesettingOptions, renderMode = _a.renderMode, children = _a.children, rest = __rest(_a, ["inline", "hideUntilTypeset", "onInitTypeset", "onTypeset", "text", "dynamic", "typesettingOptions", "renderMode", "children"]);
    // in render mode "pre", this keeps track of the last value on text to determine when we need to run typesetting
    var lastChildren = react_1.useRef("");
    /* the parent of all MathJax content, in render mode "pre" the content generated by MathJax is added to this node
    after rendering whereas in render mode "post", the content of this node is processed by MathJax after rendering */
    var ref = react_1.useRef(null);
    var mjPromise = react_1.useContext(MathJaxContext_1.MathJaxBaseContext);
    // allow context values to steer this component for some props if they are undefined
    var usedHideUntilTypeset = hideUntilTypeset !== null && hideUntilTypeset !== void 0 ? hideUntilTypeset : mjPromise === null || mjPromise === void 0 ? void 0 : mjPromise.hideUntilTypeset;
    var usedRenderMode = renderMode !== null && renderMode !== void 0 ? renderMode : mjPromise === null || mjPromise === void 0 ? void 0 : mjPromise.renderMode;
    var usedConversionOptions = typesettingOptions !== null && typesettingOptions !== void 0 ? typesettingOptions : mjPromise === null || mjPromise === void 0 ? void 0 : mjPromise.typesettingOptions;
    var usedDynamic = dynamic === false ? false : (dynamic || process.env.NODE_ENV !== "production");
    // whether initial typesetting of this element has been done or not
    var initLoad = react_1.useRef(false);
    // mutex to signal when typesetting is ongoing (without it we may have race conditions)
    var typesetting = react_1.useRef(false);
    // handler for initial loading
    var checkInitLoad = function () {
        if (!initLoad.current) {
            if (usedHideUntilTypeset === "first" && ref.current !== null) {
                ref.current.style.visibility = "visible";
            }
            if (onInitTypeset)
                onInitTypeset();
            initLoad.current = true;
        }
    };
    // callback for when typesetting is done
    var onTypesetDone = function () {
        var _a, _b;
        if (usedHideUntilTypeset === "every" && usedDynamic && usedRenderMode === "post" && ref.current !== null) {
            ref.current.style.visibility = (_b = (_a = rest.style) === null || _a === void 0 ? void 0 : _a.visibility) !== null && _b !== void 0 ? _b : "visible";
        }
        checkInitLoad();
        if (onTypeset)
            onTypeset();
        typesetting.current = false;
    };
    // validator for text input with renderMode = "pre"
    var validText = function (inputText) { return typeof inputText === "string" && inputText.length > 0; };
    // guard which resets the visibility to hidden when hiding the content between every typesetting
    if (!typesetting.current &&
        ref.current !== null &&
        usedDynamic &&
        usedHideUntilTypeset === "every" &&
        usedRenderMode === "post") {
        ref.current.style.visibility = "hidden";
    }
    /**
     * Effect for typesetting, important that this does not trigger a new render and runs as seldom as possible (only
     * when needed). It is good that it is in an effect because then we are sure that the DOM to be is ready and
     * thus, we don't have to use a custom timeout to accommodate for this. Layout effects runs on the DOM to be before
     * the browser has a chance to paint. Thereby, we reduce the chance of ugly flashes of non-typeset content.
     *
     * Note: useLayoutEffect causes an ugly warning in the server console with SSR so we make sure to use useEffect if
     * we are in the backend instead. Neither of them run in the backend so no extra care needs to be taken of the
     * Promise.reject() passed from context (which happens on SSR) on server.
     */
    var effectToUse = typeof window !== "undefined" ? react_1.useLayoutEffect : react_1.useEffect;
    effectToUse(function () {
        if (usedDynamic || !initLoad.current) {
            if (ref.current !== null) {
                if (mjPromise) {
                    if (usedRenderMode === "pre") {
                        if (!validText(text))
                            throw Error("Render mode 'pre' requires text prop to be set and non-empty, which was currently \"" + text + "\"");
                        if (!typesettingOptions || !typesettingOptions.fn)
                            throw Error("Render mode 'pre' requires 'typesettingOptions' prop with 'fn' property to be set on MathJax element or in the MathJaxContext");
                    }
                    if (usedRenderMode === "post" || text !== lastChildren.current) {
                        if (!typesetting.current) {
                            typesetting.current = true;
                            if (mjPromise.version === 3) {
                                mjPromise.promise
                                    .then(function (mathJax) {
                                    if (usedRenderMode === "pre") {
                                        var updateFn_1 = function (output) {
                                            lastChildren.current = text;
                                            mathJax.startup.document.clear();
                                            mathJax.startup.document.updateDocument();
                                            if (ref.current !== null)
                                                ref.current.innerHTML = output.outerHTML;
                                            onTypesetDone();
                                        };
                                        if (typesettingOptions.fn.endsWith("Promise"))
                                            mathJax.startup.promise
                                                .then(function () {
                                                return mathJax[usedConversionOptions.fn](text, __assign(__assign({}, ((usedConversionOptions === null || usedConversionOptions === void 0 ? void 0 : usedConversionOptions.options) || {})), { display: !inline }));
                                            })
                                                .then(updateFn_1)
                                                .catch(function (err) {
                                                onTypesetDone();
                                                throw Error(typesettingFailed(err));
                                            });
                                        else
                                            mathJax.startup.promise
                                                .then(function () {
                                                var output = mathJax[usedConversionOptions.fn](text, __assign(__assign({}, ((usedConversionOptions === null || usedConversionOptions === void 0 ? void 0 : usedConversionOptions.options) || {})), { display: !inline }));
                                                updateFn_1(output);
                                            })
                                                .catch(function (err) {
                                                onTypesetDone();
                                                throw Error(typesettingFailed(err));
                                            });
                                    }
                                    else {
                                        // renderMode "post"
                                        mathJax.startup.promise
                                            .then(function () {
                                            mathJax.typesetClear([ref.current]);
                                            return mathJax.typesetPromise([ref.current]);
                                        })
                                            .then(onTypesetDone)
                                            .catch(function (err) {
                                            onTypesetDone();
                                            throw Error(typesettingFailed(err));
                                        });
                                    }
                                })
                                    .catch(function (err) {
                                    onTypesetDone();
                                    throw Error(typesettingFailed(err));
                                });
                            }
                            else {
                                // version 2
                                mjPromise.promise
                                    .then(function (mathJax) {
                                    mathJax.Hub.Queue(["Typeset", mathJax.Hub, ref.current]);
                                    mathJax.Hub.Queue(onTypesetDone);
                                })
                                    .catch(function (err) {
                                    onTypesetDone();
                                    throw Error(typesettingFailed(err));
                                });
                            }
                        }
                    }
                }
                else
                    throw Error("MathJax was not loaded, did you use the MathJax component outside of a MathJaxContext?");
            }
        }
    });
    return (react_1.default.createElement("span", __assign({}, rest, { style: __assign(__assign({ display: inline ? "inline" : "block" }, rest.style), { visibility: usedHideUntilTypeset ? "hidden" : (_b = rest.style) === null || _b === void 0 ? void 0 : _b.visibility }), ref: ref }), children));
};
exports.default = MathJax;