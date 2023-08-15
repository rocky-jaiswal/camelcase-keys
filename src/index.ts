import mapObject from 'map-obj'

import camelCase from './camelCase'

type Options = {
  readonly deep?: boolean
  readonly stopPaths?: readonly string[]
  readonly pascalCase?: boolean
}

// Reproduces behavior from `map-obj`.
const isObject = (value: any) =>
  typeof value === 'object' &&
  value !== null &&
  !(value instanceof RegExp) &&
  !(value instanceof Error) &&
  !(value instanceof Date)

const transform = (input: any, options: Options = {}) => {
  if (!isObject(input)) {
    return input
  }

  const { pascalCase = false, stopPaths, deep = false } = options

  const stopPathsSet = new Set(stopPaths)

  const makeMapper =
    (parentPath: any | undefined) =>
    (key: any, value: any): any => {
      if (deep && isObject(value)) {
        const path = parentPath === undefined ? key : `${parentPath}.${key}`

        if (!stopPathsSet.has(path)) {
          value = mapObject(value, makeMapper(path))
        }
      }

      const returnValue = camelCase(key, { pascalCase, locale: false })
      key = returnValue

      return [key, value]
    }

  return mapObject(input, makeMapper(undefined))
}

export default function camelcaseKeys(input: any | any[], options: Options = {}) {
  if (Array.isArray(input)) {
    return Object.keys(input).map((key: any) => transform((input as any[])[key], options))
  }

  return transform(input, options)
}
