# intl-sort-by



Sort simple arrays or array of objects by given keys in any direction. Supports international accented characters (diacritics).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Synopsis](#synopsis)
- [API](#api)
- [intl-sort-by](#intl-sort-by)
  - [Functions](#functions)
    - [sort](#sort)
- [Interfaces](#interfaces)
- [Interface: Options](#interface-options)
  - [Hierarchy](#hierarchy)
  - [Properties](#properties)
    - [`Optional` locale](#optional-locale)
    - [`Optional` order](#optional-order)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# Synopsis

```ts
const objects = [
  { initial: "Ö", class: 1, sub: { z: 1 } },
  { initial: "o", class: 1, sub: { z: 3 } },
  { initial: "ö", class: 2, sub: { z: 3 } },
  { initial: "ğ", class: 2, sub: { z: 2 } },
];

// Sort by `initial`
const sortedByInitial = sort(objects, "initial");

// Sort by `sub.z` and then `initial`.
const sortedByMulti = sort(objects, ["sub.z", "initial"]);

// Sort by `sub.z` in reverse order and then `initial`.
const sortedByMulti = sort(objects, ["-sub.z", "initial"]);

// Sort by `sub.z` in reverse order and then `initial`. Same as above, but with options.
const sortedByMulti = sort(objects, ["sub.z", "initial"], { order: ["desc", "asc"] });
```

# API


<a name="readmemd"></a>

[intl-sort-by](#readmemd)

# intl-sort-by

## Functions

###  sort

▸ **sort**<**T**>(`array`: T[], `keys?`: string | Array‹string | string[]›, `options`: [Options](#interfacesoptionsmd)): *T[]*

*Defined in [index.ts:51](https://github.com/ozum/intl-sort-by/blob/29c3430/src/index.ts#L51)*

Sorts simple arrays or array of objects by given keys in any direction. Supports international accented characters (diacritics).

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`array` | T[] | - | is array to be sorted. |
`keys?` | string &#124; Array‹string &#124; string[]› | - | are keys to sort array based on. Could be a single value. If key starts with a hypen/minus (`-`), sorts in reverse order. |
`options` | [Options](#interfacesoptionsmd) |  {} | - |

**Returns:** *T[]*

sorted array.

# Interfaces


<a name="interfacesoptionsmd"></a>

[intl-sort-by](#readmemd) › [Options](#interfacesoptionsmd)

# Interface: Options

Options for to be used when sorting.

## Hierarchy

* **Options**

## Properties

### `Optional` locale

• **locale**? : *undefined | string*

*Defined in [index.ts:10](https://github.com/ozum/intl-sort-by/blob/29c3430/src/index.ts#L10)*

String with a BCP 47 language tag, or an array of such strings.

___

### `Optional` order

• **order**? : *Order | Array‹Order›*

*Defined in [index.ts:12](https://github.com/ozum/intl-sort-by/blob/29c3430/src/index.ts#L12)*

List of order directions to be used with given keys

