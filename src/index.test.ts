import sort from "./index";

const objects = [
  { initial: "Ö", class: 1, sub: { z: 1 } },
  { initial: "o", class: 1, sub: { z: 3 } },
  { initial: "ö", class: 2, sub: { z: 3 } },
  { initial: "ğ", class: 2, sub: { z: 2 } },
];

const simple = ["Ö", "o", "ö", "ğ"];

describe("sort", () => {
  it("should sort value array.", () => {
    expect(sort(simple)).toEqual(["ğ", "o", "Ö", "ö"]);
  });

  it("should return object array as is if no keys are provided.", () => {
    expect(sort(objects)).toEqual([
      { initial: "Ö", class: 1, sub: { z: 1 } },
      { initial: "o", class: 1, sub: { z: 3 } },
      { initial: "ö", class: 2, sub: { z: 3 } },
      { initial: "ğ", class: 2, sub: { z: 2 } },
    ]);
  });

  it("should sort object array based on single key.", () => {
    // console.log(sort(objects, "initial", { locale: "tr", order: "asc" }));
    expect(sort(objects, "initial", { locale: "tr", order: "asc" })).toEqual([
      { initial: "ğ", class: 2, sub: { z: 2 } },
      { initial: "o", class: 1, sub: { z: 3 } },
      { initial: "Ö", class: 1, sub: { z: 1 } },
      { initial: "ö", class: 2, sub: { z: 3 } },
    ]);
  });

  it("should sort object array based on multiple keys.", () => {
    expect(sort(objects, ["class", "initial"])).toEqual([
      { initial: "o", class: 1, sub: { z: 3 } },
      { initial: "Ö", class: 1, sub: { z: 1 } },
      { initial: "ğ", class: 2, sub: { z: 2 } },
      { initial: "ö", class: 2, sub: { z: 3 } },
    ]);
  });

  it("should sort object array based on multiple keys with mixed orders.", () => {
    expect(sort(objects, ["class", "-initial"])).toEqual([
      { initial: "Ö", class: 1, sub: { z: 1 } },
      { initial: "o", class: 1, sub: { z: 3 } },
      { initial: "ö", class: 2, sub: { z: 3 } },
      { initial: "ğ", class: 2, sub: { z: 2 } },
    ]);
  });

  it("should sort object array based on nested attributes.", () => {
    expect(sort(objects, ["sub.z", "initial"])).toEqual([
      { initial: "Ö", class: 1, sub: { z: 1 } },
      { initial: "ğ", class: 2, sub: { z: 2 } },
      { initial: "o", class: 1, sub: { z: 3 } },
      { initial: "ö", class: 2, sub: { z: 3 } },
    ]);
  });

  it("should sort object array based on nested attributes (string) in reverse order.", () => {
    expect(sort(objects, ["sub.z", "initial"], { order: ["desc"] })).toEqual([
      { initial: "o", class: 1, sub: { z: 3 } },
      { initial: "ö", class: 2, sub: { z: 3 } },
      { initial: "ğ", class: 2, sub: { z: 2 } },
      { initial: "Ö", class: 1, sub: { z: 1 } },
    ]);
  });

  it("should sort object array based on nested attributes (string) in reverse order - 2.", () => {
    expect(sort(objects, ["-sub.z", "initial"])).toEqual([
      { initial: "o", class: 1, sub: { z: 3 } },
      { initial: "ö", class: 2, sub: { z: 3 } },
      { initial: "ğ", class: 2, sub: { z: 2 } },
      { initial: "Ö", class: 1, sub: { z: 1 } },
    ]);
  });

  it("should sort object array based on nested attributes (array) in reverse order.", () => {
    expect(sort(objects, [["sub", "z"], "initial"], { order: ["desc"] })).toEqual([
      { initial: "o", class: 1, sub: { z: 3 } },
      { initial: "ö", class: 2, sub: { z: 3 } },
      { initial: "ğ", class: 2, sub: { z: 2 } },
      { initial: "Ö", class: 1, sub: { z: 1 } },
    ]);
  });
});
