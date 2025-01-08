import {
  extractVariable,
  replaceVariablesWithValues,
} from "../src/extract_variables.js";
import { assertEquals } from "jsr:@std/assert";

Deno.test("extract_variable: basic declaration of const variable", () =>
  assertEquals(extractVariable("const a =23"), {
    type: "const",
    variable: "a",
    expression: "23",
  })
);

Deno.test("extract_variable: basic declaration of let variable", () =>
  assertEquals(extractVariable("let a =23"), {
    type: "let",
    variable: "a",
    expression: "23",
  })
);

Deno.test("extract_variable: no space between let and variable name", () =>
  assertEquals(extractVariable("leta =23"), {
    type: undefined,
    variable: "leta",
    expression: "23",
  })
);

Deno.test("extract_variable: no space between const and variable name", () =>
  assertEquals(extractVariable("consta =23"), {
    type: undefined,
    variable: "consta",
    expression: "23",
  })
);

// Deno.test(
//   "extract_variable: semicolon at the end of let variable  declaration",
//   () =>
//     assertEquals(extractVariable("let a =23;"), {
//       type: "let",
//       variable: "a",
//       expression: "23",
//     })
// );

// Deno.test(
//   "extract_variable: semicolon at the end of const variable declaration",
//   () =>
//     assertEquals(extractVariable("const a =23;"), {
//       type: "const",
//       variable: "a",
//       expression: "23",
//     })
// );

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

Deno.test("extract_variable: assignment to variable", () =>
  assertEquals(extractVariable("a=3"), {
    variable: "a",
    type: undefined,
    expression: "3",
  })
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
