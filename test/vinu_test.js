import { extract_operands, extract_operators } from "../src/vinu.js";
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
