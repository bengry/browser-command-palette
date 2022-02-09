/**
 * Reduce an array to an object using the array's items identifier
 */
export function toObject<T, K extends string>(items: readonly T[], keyGetter: (item: T) => K) {
  return items.reduce((draftObject, currentItem) => {
    const key = keyGetter(currentItem);
    draftObject[key] = currentItem;
    return draftObject;
  }, {} as Record<K, T>);
}
