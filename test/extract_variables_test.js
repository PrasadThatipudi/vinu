import { extract_variable } from "../src/extract_variables.js";
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
