import { extract_operators, operators_regex } from "./evaluate.js";

const find_variable = /^\s*(const|let)\s+(\w+)\s*=\s*(.+)\s*$|^(.+)$/;

export const extract_variable = function (statement) {
  const [, type, variable, expression, standalone] =
    statement.match(find_variable) || [];

  return variable && expression
    ? { variable, type, expression }
    : { expression: standalone };
};

export const replaceAll = (array, target, replacement) =>
  array.map((element) => (element === target ? replacement : element));

const get_operand_value = (vars, operand) =>
  vars[operand] ? vars[operand].value : operand;

export const replace_vars_with_values = function (vars, expression) {
  const operands = expression.split(operators_regex);
  const operators = extract_operators(expression);
  return (
    get_operand_value(vars, operands[0]) +
    operators.reduce(
      (exp, operator, index) =>
        exp + operator + get_operand_value(vars, operands[index + 1]),
      ""
    )
  );
};
