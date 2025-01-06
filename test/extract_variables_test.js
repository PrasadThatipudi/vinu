import {
  extractVariable,
  replaceVariablesWithValues,
  replaceAll,
} from "../src/extract_variables.js";
import { assertEquals } from "jsr:@std/assert";

Deno.test("extract_variable: basic declaration of const variable", () =>
  assertEquals(extractVariable("const a =23"), {
    type: "const",
    variable: "a",
    expression: "23",
  })
);

Deno.test("extract_variable: assigning declared variale", () =>
  assertEquals(extractVariable("const b = a"), {
    type: "const",
    variable: "b",
    expression: "a",
  })
);

Deno.test("extract_variable: only expression", () =>
  assertEquals(extractVariable("34+23"), {
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

Deno.test("replace_vars_with_values: basic expression", () =>
  assertEquals(
    replaceVariablesWithValues({ a: { value: 23 }, b: { value: 10 } }, "a+b"),
    "23+10"
  )
);

Deno.test("replace_vars_with_values: single variable", () =>
  assertEquals(
    replaceVariablesWithValues({ a: { value: 23 }, b: { value: 10 } }, "b"),
    "10"
  )
);

Deno.test("replace_vars_with_values: single number", () =>
  assertEquals(
    replaceVariablesWithValues({ a: { value: 23 }, b: { value: 10 } }, "120"),
    "120"
  )
);
