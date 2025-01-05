import { extract_operators } from "./evaluate.js";

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

const extract_identifiers = /\w+/g;
const get_variable_value = (vars, variable) =>
  vars[variable] ? vars[variable].value : variable;

export const replace_vars_with_values = function (vars, expression) {
  const variables = expression.match(extract_identifiers);
  const operators = extract_operators(expression);
  return (
    get_variable_value(vars, variables[0]) +
    operators.reduce(
      (exp, operator, index) =>
        exp + operator + get_variable_value(vars, variables[index + 1]),
      ""
    )
  );
};
