type Options = {
    readonly deep?: boolean;
    readonly stopPaths?: readonly string[];
    readonly pascalCase?: boolean;
};
export default function camelcaseKeys(input: any | any[], options?: Options): any;
export {};
