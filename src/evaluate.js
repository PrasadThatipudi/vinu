const add = (first, second) => first + second;
const sub = (first, second) => first - second;
const mul = (first, second) => first * second;
const div = (first, second) => first / second;
const mod = (first, second) => first % second;
export const math = { add, sub, mul, div, mod };
// non-capturing -> ?:
const VALIDATE_EXPRESSION = /^\s*\d+\s*(\s*[+-/*%]\s*\d+)*$|^\s*$/;
export const extractOperands = (expression) => expression.match(/\d+/g);

export const OPERATORS_REGEX = /[\+\-\/\*\%]/g;

export const extractOperators = (expression) =>
  expression.match(OPERATORS_REGEX) || [];

export const isExpressionValid = (expression) =>
  !!expression.match(VALIDATE_EXPRESSION);

export const executeExpression = (operations, operands, operators) =>
  operands.reduce((accumulator, operand, index) =>
    operations[operators[index - 1]](accumulator, operand)
);

export const parseErr = (err) => "\x1b[31mparse error\x1b[0m: " + err;

export const evaluate = function (expression) {
  if (!isExpressionValid(expression)) return parseErr("Unexpected eof");
  
  const operations = { "+": add, "-": sub, "*": mul, "/": div, "%": mod };
  const operands = extractOperands(expression).map((number) => +number);
  const operators = extractOperators(expression);
  return executeExpression(operations, operands, operators);
};
