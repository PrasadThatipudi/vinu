const find_variable = /^\s*(const)\s+(\w+)\s*=\s*(.+)\s*$|^(.+)$/;

export const extract_variable = function (statement) {
  const [, type, variable, expression, standalone] =
    statement.match(find_variable) || [];

  return variable && expression
    ? { variable, type, expression }
    : { expression: standalone };
};
