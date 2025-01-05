import { is_expression_valid } from "./evaluate.js";
import {
  extract_variable,
  replace_vars_with_values,
} from "./extract_variables.js";

const vinu_version = `Vinu 2.O
exit using ctrl+d, ctrl+c, or close()
\x1b[33mREPL is running with all permissions allowed.\x1b[0m
To specify permissions, run \`vinu repl\` with allow flags.`;

const displayVinuVersion = () => console.log(vinu_version);

const validate_variables = function (expression) {
  const un_declared_variable = expression.match(/[a-z_]*/i)[0];
  return un_declared_variable
    ? [true, un_declared_variable + " is not defined"]
    : [false, null];
};

const is_variable_name_valid = function (variable) {
  return !variable.match(/^\s*\d+/);
};

const parse_err = (err) => "\x1b[31mparse error\x1b[0m: " + err;

const create_variable = function (vars, variable, type, value) {
  if (!isNaN(variable))
    return parse_err(
      `Unexpected token \`numeric literal (${variable}, ${variable})\`. Expected yield, an identifier`
    );

  if (!is_variable_name_valid(variable))
    return parse_err(`Identifier cannot follow number`);

  vars[variable] = { type: type, value: value };
  return;
};

const execute_statement = function (statement, vars) {
  const { variable, expression, type } = extract_variable(statement);
  const exp = replace_vars_with_values(vars, expression);
  const [is_err, err] = validate_variables(exp);

  if (is_err) return `Uncaught ReferenceError: ` + err;

  if (!is_expression_valid(exp)) return "parse error: Unexpected end";
  const result = eval(exp);

  if (type && variable) {
    return create_variable(vars, variable, type, result);
  }

  return result;
};

const main = function () {
  displayVinuVersion();
  const vars = {};

  while (true) {
    const statement = prompt("> ");
    console.log(execute_statement(statement, vars));
  }
};

main();
