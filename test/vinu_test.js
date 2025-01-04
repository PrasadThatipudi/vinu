import {
  extract_operands,
  extract_operators,
  is_expression_valid,
} from "../src/vinu.js";
import { assertEquals, assert } from "jsr:@std/assert";

Deno.test("extract_operands: one operand", () =>
  assertEquals(extract_operands("23"), ["23"])
);

Deno.test("extract_operands: multiple operands", () =>
  assertEquals(extract_operands("23+ 34"), ["23", "34"])
);

Deno.test("extract_operands: non-numeric values", () =>
  assertEquals(extract_operands("a b"), null)
);

Deno.test("extract_operators: single operator", () =>
  assertEquals(extract_operators("23+5"), ["+"])
);

Deno.test("extract_operators: multiple operators", () =>
  assertEquals(extract_operators("23+5/3-2*6%5"), ["+", "/", "-", "*", "%"])
);

Deno.test("extract_operators: no operators", () =>
  assertEquals(extract_operators("23"), null)
);

Deno.test("is_expression_valid: single operand", () =>
  assert(is_expression_valid("23"))
);

Deno.test("is_expression_valid: single operation", () =>
  assert(is_expression_valid("23 + 34"))
);

Deno.test("is_expression_valid: multiple operations", () =>
  assert(is_expression_valid("23+5/3-2*6%5"))
);

Deno.test("is_expression_valid: non-numeric characters", () =>
  assertEquals(is_expression_valid("alpha"), false)
);

Deno.test("is_expression_valid: single operand with spaces", () =>
  assert(is_expression_valid(" 23   "))
);

Deno.test("is_expression_valid: insufficient operands", () =>
  assertEquals(is_expression_valid(" 23 +"), false)
);

Deno.test("is_expression_valid: insufficient operators", () =>
  assertEquals(is_expression_valid(" 23 + + 34"), false)
);
