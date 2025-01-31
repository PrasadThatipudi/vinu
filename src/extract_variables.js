import { extractOperators, OPERATORS_REGEX } from "./evaluate.js";

const find_variable =
  /^\s*(const(?=\s+)|let(?=\s+))?\s*(\w+)\s*=\s*(.+)$|^(.+)$/;

export const extractVariable = function (statement) {
  const [, type, variable, expression, standalone] =
    statement.match(find_variable);

  return standalone
    ? { expression: standalone }
    : { variable, type, expression };
};

const getOperandValue = (variables, operand) =>
  operand in variables ? variables[operand].value : operand;

const replaceAllVariablesWithVAlues = (variables, operands, operators) =>
  operators.reduce(
    (exp, operator, index) =>
      exp.concat(operator, getOperandValue(variables, operands[index + 1])),
    getOperandValue(variables, operands[0]).toString()
  );

export const replaceVariablesWithValues = function (variables, expression) {
  const operands = expression.split(OPERATORS_REGEX).map((op) => op.trim());
  const operators = extractOperators(expression);

  return replaceAllVariablesWithVAlues(variables, operands, operators);
};
