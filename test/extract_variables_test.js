import { extract_variable, replaceAll } from "../src/extract_variables.js";
import { assertEquals } from "jsr:@std/assert";

Deno.test("extract_variable: basic declaration of const variable", () =>
  assertEquals(extract_variable("const a =23"), {
    type: "const",
    variable: "a",
    expression: "23",
  })
);

Deno.test("extract_variable: assigning declared variale", () =>
  assertEquals(extract_variable("const b = a"), {
    type: "const",
    variable: "b",
    expression: "a",
  })
);

Deno.test("extract_variable: only expression", () =>
  assertEquals(extract_variable("34+23"), {
    expression: "34+23",
  })
);

Deno.test("replaceAll: basic replacement", () =>
  assertEquals(replaceAll([1, 2, 1], 1, 3), [3, 2, 3])
);

Deno.test("replaceAll: empty array", () =>
  assertEquals(replaceAll([], 1, 3), [])
);

Deno.test("replaceAll: insufficient target", () =>
  assertEquals(replaceAll([2, 3, 4], 1, 3), [2, 3, 4])
);
