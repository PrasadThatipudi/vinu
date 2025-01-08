import { math } from "../src/evaluate.js";
import {
  executeExpression,
  extractOperands,
  extractOperators,
  isExpressionValid,
} from "../src/evaluate.js";
import { assertEquals, assert } from "jsr:@std/assert";

Deno.test("extract_operands: one operand", () =>
  assertEquals(extractOperands("23"), ["23"])
);

Deno.test("extract_operands: multiple operands", () =>
  assertEquals(extractOperands("23+ 34"), ["23", "34"])
);

Deno.test("extract_operands: non-numeric values", () =>
  assertEquals(extractOperands("a b"), null)
);

Deno.test("extract_operators: single operator", () =>
  assertEquals(extractOperators("23+5"), ["+"])
);

Deno.test("extract_operators: multiple operators", () =>
  assertEquals(extractOperators("23+5/3-2*6%5"), ["+", "/", "-", "*", "%"])
);

Deno.test("extract_operators: no operators", () =>
  assertEquals(extractOperators("23"), [])
);

Deno.test("is_expression_valid: single operand", () =>
  assert(isExpressionValid("23"))
);

Deno.test("is_expression_valid: single operation", () =>
  assert(isExpressionValid("23 + 34"))
);

Deno.test("is_expression_valid: multiple operations", () =>
  assert(isExpressionValid("23+5/3-2*6%5"))
);

Deno.test("is_expression_valid: non-numeric characters", () =>
  assertEquals(isExpressionValid("alpha"), false)
);

Deno.test("is_expression_valid: single operand with spaces", () =>
  assert(isExpressionValid(" 23   "))
);

Deno.test("is_expression_valid: insufficient operands", () =>
  assertEquals(isExpressionValid(" 23 +"), false)
);

Deno.test("execute_expression: single operand", () =>
  assertEquals(executeExpression({}, [2], []), 2)
);

Deno.test("execute_expression: add operation", () =>
  assertEquals(executeExpression({ "+": math.add }, [2, 5], ["+"]), 7)
);

Deno.test("execute_expression: sub operation", () =>
  assertEquals(executeExpression({ "-": math.sub }, [2, 5], ["-"]), -3)
);

Deno.test("execute_expression: mul operation", () =>
  assertEquals(executeExpression({ "*": math.mul }, [2, 5], ["*"]), 10)
);

Deno.test("execute_expression: div operation", () =>
  assertEquals(executeExpression({ "/": math.div }, [2, 5], ["/"]), 0.4)
);

Deno.test("execute_expression: mod operation", () =>
  assertEquals(executeExpression({ "%": math.mod }, [2, 5], ["%"]), 2)
);

Deno.test("execute_expression: multiple operations", () =>
  assertEquals(
    executeExpression(
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
