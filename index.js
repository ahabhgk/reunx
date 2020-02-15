var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = __importStar(require("react"));
    var createX = function (useHook) {
        var initialArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            initialArgs[_i - 1] = arguments[_i];
        }
        var Context = react_1.createContext(null);
        var Provider = function (_a) {
            var children = _a.children;
            var value = useHook.apply(void 0, initialArgs);
            return (react_1.default.createElement(Context.Provider, { value: value }, children));
        };
        return { Provider: Provider, Context: Context };
    };
    exports.createX = createX;
    var useX = function (x) { return react_1.useContext(x.Context); };
    exports.useX = useX;
    var combineProvider = function () {
        var Providers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            Providers[_i] = arguments[_i];
        }
        return Providers.reduce(function (Acc, Cur) { return function (_a) {
            var children = _a.children;
            return (react_1.default.createElement(Acc, null,
                react_1.default.createElement(Cur, null, children)));
        }; });
    };
    exports.combineProvider = combineProvider;
});
