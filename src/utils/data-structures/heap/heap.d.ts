export interface HeapNode<T extends number|string, U> {
  key: T;
  value: U;
}

export abstract class Heap<T extends number|string, U = undefined> {
  constructor(elements?: (HeapNode<T, U> | T)[], leaf?: (HeapNode<T, U> | T));
  extractRoot(): HeapNode<T, U> | T;
  insert(key: T, value?: U): Heap<T, U>;
  sort(): (HeapNode<T, U> | T)[];
  fix(): void;
  isValid(): boolean;
  root(): HeapNode<T, U> | T;
  leaf(): HeapNode<T, U> | T;
  size(): number;
  isEmpty(): boolean;
  clear(): void;
}
