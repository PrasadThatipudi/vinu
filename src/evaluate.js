export const math = { add, sub, mul, div, mod };
const add = (first, second) => first + second;
const sub = (first, second) => first - second;
const mul = (first, second) => first * second;
const div = (first, second) => first / second;
const mod = (first, second) => first % second;

const validate_expression = /^\s*\d+\s*(\s*[+-/*%]\s*\d+)*$/;
export const extract_operands = (expression) => expression.match(/\d+/g);
export const extract_operators = (expression) => expression.match(/[+-/*%]/g);
export const is_expression_valid = (expression) =>
  !!expression.match(validate_expression);

export const execute_expression = (operations, operands, operators) =>
  operands.reduce((accumulator, operand, index) =>
    operations[operators[index - 1]](accumulator, operand)
  );

export const evaluate = function (expression) {
  if (!is_expression_valid(expression)) return "parse error: Unexpected eof";

  const operations = { "+": add, "-": sub, "*": mul, "/": div, "%": mod };
  const operands = extract_operands(expression).map((number) => +number);
  const operators = extract_operators(expression);
  return execute_expression(operations, operands, operators);
};
