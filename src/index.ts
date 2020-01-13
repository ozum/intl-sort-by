/* eslint-disable no-restricted-syntax */
import get from "lodash.get";

type CompareFunction = (a: any, b: any) => number;
type Order = "asc" | "desc";

/** Options for to be used when sorting. */
export interface Options {
  /** String with a BCP 47 language tag, or an array of such strings. */
  locale?: string;
  /** List of order directions to be used with given keys */
  order?: Order | Array<Order>;
  /** Sort without modifying original array. */
  immutable?: boolean;
}

function getNestedValueComparator(compare: CompareFunction, path: string | string[], order: Order): CompareFunction {
  return order === "desc"
    ? <T extends object>(a: T, b: T) => compare(get(b, path), get(a, path))
    : <T extends object>(a: T, b: T) => compare(get(a, path), get(b, path));
}

function getValueComparator<T extends object>(compare: CompareFunction, key: keyof T, order: Order): CompareFunction {
  return order === "desc" ? (a: T, b: T) => compare(b[key], a[key]) : (a: T, b: T) => compare(a[key], b[key]);
}

function isKey<T>(key: any): key is keyof T {
  return !Array.isArray(key) && !key.includes(".");
}

function getComparators<T extends object>({ locale, order }: Options, keys?: string | Array<string | string[]>): CompareFunction[] {
  const { compare } = new Intl.Collator(locale, { numeric: true, sensitivity: "accent" });
  if (keys === undefined) {
    return [compare];
  }

  const arrayKeys = Array.isArray(keys) ? keys : [keys];
  const arrayOrder = Array.isArray(order) ? order : [order];
  return arrayKeys.map((key: any, i: number) => {
    const orderDirection = arrayOrder[i] || (typeof key[0] === "string" && key[0].startsWith("-") ? "desc" : "asc");
    const path = Array.isArray(key) ? key : key.replace(/^-/, "");
    return isKey<T>(path) ? getValueComparator(compare, path, orderDirection) : getNestedValueComparator(compare, path, orderDirection);
  });
}

/**
 * Sorts simple arrays or array of objects by given keys in any direction. Supports international accented characters (diacritics).
 *
 * @param array is array to be sorted.
 * @param keys are keys to sort array based on. Could be a single value. If key starts with a hypen/minus (`-`), sorts in reverse order.
 * @returns sorted array.
 */
export default function sort<T>(array: T[], keys?: string | Array<string | string[]>, options: Options = {}): T[] {
  const comparators = getComparators(options, keys);
  return array.sort((a: any, b: any) => {
    for (const comparator of comparators) {
      const result = comparator(a, b);
      if (result !== 0) return result;
    }
    return 0;
  });
}
