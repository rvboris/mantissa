export interface ICategoryBaseNode {
  name: string,
  props: number,
  children?: ICategoryBaseNode[],
  parent?: ICategoryBaseNode,
  toGqlObject?: () => void
}
