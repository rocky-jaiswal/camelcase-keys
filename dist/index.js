"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const map_obj_1 = __importDefault(require("map-obj"));
const camelCase_1 = __importDefault(require("./camelCase"));
// Reproduces behavior from `map-obj`.
const isObject = (value) => typeof value === 'object' &&
    value !== null &&
    !(value instanceof RegExp) &&
    !(value instanceof Error) &&
    !(value instanceof Date);
const transform = (input, options = {}) => {
    if (!isObject(input)) {
        return input;
    }
    const { pascalCase = false, deep = false } = options;
    const makeMapper = (parentPath) => (key, value) => {
        if (deep && isObject(value)) {
            const path = parentPath === undefined ? key : `${parentPath}.${key}`;
            value = (0, map_obj_1.default)(value, makeMapper(path));
        }
        const returnValue = (0, camelCase_1.default)(key, { pascalCase, locale: false });
        key = returnValue;
        return [key, value];
    };
    return (0, map_obj_1.default)(input, makeMapper(undefined));
};
function camelcaseKeys(input, options = {}) {
    if (Array.isArray(input)) {
        return Object.keys(input).map((key) => transform(input[key], options));
    }
    return transform(input, options);
}
exports.default = camelcaseKeys;
//# sourceMappingURL=index.js.map