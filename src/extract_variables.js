import { extractOperators, OPERATORS_REGEX } from "./evaluate.js";

const find_variable = /^\s*(const|let)\s+(\w+)\s*=(.+)$|^(.+)$/;

export const extractVariable = function (statement) {
  const [, type, variable, expression, standalone] =
    statement.match(find_variable) || [];

  return variable && expression
    ? { variable, type, expression }
    : { expression: standalone };
};

export const replaceAll = (array, target, replacement) =>
  array.map((element) => (element === target ? replacement : element));

const getOperandValue = (variables, operand) =>
  variables[operand] ? variables[operand].value : operand;

export const replaceVariablesWithValues = function (variables, expression) {
  const operands = expression.split(OPERATORS_REGEX).map((op) => op.trim());
  const operators = extractOperators(expression);
  // extract the return statement into a variable
  return (
    // getOperandValue(variables, operands[0]) +
    operators.reduce(
      (exp, operator, index) =>
        exp.concat(operator, getOperandValue(variables, operands[index + 1])),
      getOperandValue(variables, operands[0]).toString()
    )
  );
};
