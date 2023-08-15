"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UPPERCASE = /[\p{Lu}]/u;
const LOWERCASE = /[\p{Ll}]/u;
const LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS = /[_.\- ]+/;
const LEADING_SEPARATORS = new RegExp('^' + SEPARATORS.source);
const SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, 'gu');
const NUMBERS_AND_IDENTIFIER = new RegExp('\\d+' + IDENTIFIER.source, 'gu');
const preserveCamelCase = (string, toLowerCase, toUpperCase, preserveConsecutiveUppercase) => {
    let isLastCharLower = false;
    let isLastCharUpper = false;
    let isLastLastCharUpper = false;
    let isLastLastCharPreserved = false;
    for (let index = 0; index < string.length; index++) {
        const character = string[index];
        isLastLastCharPreserved = index > 2 ? string[index - 3] === '-' : true;
        if (isLastCharLower && UPPERCASE.test(character)) {
            string = string.slice(0, index) + '-' + string.slice(index);
            isLastCharLower = false;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = true;
            index++;
        }
        else if (isLastCharUpper &&
            isLastLastCharUpper &&
            LOWERCASE.test(character) &&
            (!isLastLastCharPreserved || preserveConsecutiveUppercase)) {
            string = string.slice(0, index - 1) + '-' + string.slice(index - 1);
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = false;
            isLastCharLower = true;
        }
        else {
            isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
        }
    }
    return string;
};
const preserveConsecutiveUppercase = (input, toLowerCase) => {
    LEADING_CAPITAL.lastIndex = 0;
    return input.replace(LEADING_CAPITAL, (m1) => toLowerCase(m1));
};
const postProcess = (input, toUpperCase) => {
    SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
    NUMBERS_AND_IDENTIFIER.lastIndex = 0;
    return input
        .replace(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier))
        .replace(NUMBERS_AND_IDENTIFIER, (m) => toUpperCase(m));
};
function camelCase(input, options = {}) {
    if (!(typeof input === 'string' || Array.isArray(input))) {
        throw new TypeError('Expected the input to be `string | string[]`');
    }
    options = {
        pascalCase: false,
        preserveConsecutiveUppercase: false,
        ...options
    };
    if (Array.isArray(input)) {
        input = input
            .map((x) => x.trim())
            .filter((x) => x.length)
            .join('-');
    }
    else {
        input = input.trim();
    }
    if (input.length === 0) {
        return '';
    }
    let strInput = input;
    const toLowerCase = options.locale === false
        ? (string) => string.toLowerCase()
        : (string) => string.toLocaleLowerCase(options.locale);
    const toUpperCase = options.locale === false
        ? (string) => string.toUpperCase()
        : (string) => string.toLocaleUpperCase(options.locale);
    if (strInput.length === 1) {
        if (SEPARATORS.test(strInput)) {
            return '';
        }
        return options.pascalCase ? toUpperCase(strInput) : toLowerCase(strInput);
    }
    const hasUpperCase = strInput !== toLowerCase(strInput);
    if (hasUpperCase) {
        input = preserveCamelCase(strInput, toLowerCase, toUpperCase, options.preserveConsecutiveUppercase);
    }
    strInput = strInput.replace(LEADING_SEPARATORS, '');
    strInput = options.preserveConsecutiveUppercase
        ? preserveConsecutiveUppercase(strInput, toLowerCase)
        : toLowerCase(strInput);
    if (options.pascalCase) {
        input = toUpperCase(strInput.charAt(0)) + strInput.slice(1);
    }
    return postProcess(strInput, toUpperCase);
}
exports.default = camelCase;
//# sourceMappingURL=camelCase.js.map