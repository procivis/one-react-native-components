export function addElementIf<T>(condition: boolean, obj: T) {
  return condition ? Array(obj) : [];
}

export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;
