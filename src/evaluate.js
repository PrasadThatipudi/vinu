import { replaceVariablesWithValues } from "./extract_variables.js";
// non-capturing -> ?:
const add = (first, second) => first + second;
const sub = (first, second) => first - second;
const mul = (first, second) => first * second;
const div = (first, second) => first / second;
const mod = (first, second) => first % second;
export const math = { add, sub, mul, div, mod };

const VALIDATE_EXPRESSION = /^\s*\d+\s*(\s*[+-/*%]\s*\d+)*$/;
export const extractOperands = (expression) => expression.match(/\d+/g);

export const OPERATORS_REGEX = /[\+\-\/\*\%]/g;

export const extractOperators = (expression) =>
  expression.match(OPERATORS_REGEX) || [];

export const isExpressionValid = (expression) =>
  !!expression.match(VALIDATE_EXPRESSION);

const VALIDATE_VARIABLES = /[a-z_]+/i;

const validateVariables = function (expression) {
  const unDeclaredVariable = expression.match(VALIDATE_VARIABLES);
  //Extract regex to variable
  return unDeclaredVariable
    ? [true, unDeclaredVariable[0] + " is not defined"]
    : [false, null];
};

export const executeExpression = (operations, operands, operators) =>
  operands.reduce((accumulator, operand, index) =>
    operations[operators[index - 1]](accumulator, operand)
  );

export const parseErr = (err) => "\x1b[31mparse error\x1b[0m: " + err;

const evaluate = (expression) => {
  const operations = { "+": add, "-": sub, "*": mul, "/": div, "%": mod };
  const operands = extractOperands(expression).map((number) => +number);
  const operators = extractOperators(expression);
  return executeExpression(operations, operands, operators);
};

export const evaluateExpression = function (variables, expression) {
  const exp = replaceVariablesWithValues(variables, expression);
  const [isErr, err] = validateVariables(exp);

  if (isErr) return `Uncaught ReferenceError: ` + err;
  if (!isExpressionValid(exp)) return parseErr("Unexpected eof");
  return evaluate(exp);
};
