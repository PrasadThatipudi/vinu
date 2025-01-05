import { math } from "../src/evaluate.js";
import {
  execute_expression,
  extract_operands,
  extract_operators,
  is_expression_valid,
} from "../src/evaluate.js";
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
  assertEquals(extract_operators("23"), [])
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
  assertEquals(is_expression_valid("alpha"), true)
);

Deno.test("is_expression_valid: single operand with spaces", () =>
  assert(is_expression_valid(" 23   "))
);

Deno.test("is_expression_valid: insufficient operands", () =>
  assertEquals(is_expression_valid(" 23 +"), true)
);

Deno.test("execute_expression: single operand", () =>
  assertEquals(execute_expression({}, [2], []), 2)
);

Deno.test("execute_expression: add operation", () =>
  assertEquals(execute_expression({ "+": math.add }, [2, 5], ["+"]), 7)
);

Deno.test("execute_expression: sub operation", () =>
  assertEquals(execute_expression({ "-": math.sub }, [2, 5], ["-"]), -3)
);

Deno.test("execute_expression: mul operation", () =>
  assertEquals(execute_expression({ "*": math.mul }, [2, 5], ["*"]), 10)
);

Deno.test("execute_expression: div operation", () =>
  assertEquals(execute_expression({ "/": math.div }, [2, 5], ["/"]), 0.4)
);

Deno.test("execute_expression: mod operation", () =>
  assertEquals(execute_expression({ "%": math.mod }, [2, 5], ["%"]), 2)
);

Deno.test("execute_expression: multiple operations", () =>
  assertEquals(
    execute_expression(
      {
        "%": math.mod,
        "+": math.add,
        "-": math.sub,
        "*": math.mul,
        "/": math.div,
      },
      [2, 5, 3, 1, 8, 2],
      ["%", "+", "-", "*", "/"]
    ),
    16
  )
);
