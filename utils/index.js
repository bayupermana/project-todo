export { default as chunkArray } from './chunk-array'

export function buildStoreParam(namespace, value) {
  if (!namespace && !value) {
    throw new Error('namespace is required')
  }
  return `${namespace}/${value}`
}