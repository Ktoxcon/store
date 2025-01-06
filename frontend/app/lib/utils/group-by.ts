export type GroupingCallbackFunction<Item> = (
  item: Item,
  index: number
) => string | symbol;

export type Key<Item> = Parameters<GroupingCallbackFunction<Item>>;

export function groupBy<Item>(
  iterable: Item[],
  groupingCallback: GroupingCallbackFunction<Item>
) {
  const groups: Record<string | symbol, Item[]> = Object.create(null);

  for (const item of iterable) {
    const key = groupingCallback(item, iterable.indexOf(item));

    if (key in groups) {
      groups[key].push(item);
    } else {
      groups[key] = [item];
    }
  }

  return groups;
}
