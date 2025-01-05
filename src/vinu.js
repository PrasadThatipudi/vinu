import { is_expression_valid } from "./evaluate.js";
import {
  extract_variable,
  replace_vars_with_values,
} from "./extract_variables.js";

const vinu_version = `%cVinu 2.O
%cexit using ctrl+d, ctrl+c, or close()
%cREPL is running with all permissions allowed.
%cTo specify permissions, run \`vinu repl\` with allow flags.`;

const displayVinuVersion = () =>
  console.log(
    vinu_version,
    "color:ffffff; font-weight:bold",
    "color:ffffff; font-weight:bold",
    "color:yellow;",
    "color:ffffff; font-weight:bold"
  );

const validate_variables = function (expression) {
  const un_declared_variable = expression.match(/[a-z_]*/i)[0];
  return un_declared_variable
    ? [true, un_declared_variable + " is not defined"]
    : [false, null];
};

const execute_statement = function (statement, vars) {
  const { variable, expression, type } = extract_variable(statement);
  const exp = replace_vars_with_values(vars, expression);
  const [is_err, err] = validate_variables(exp);

  if (is_err) return `Uncaught ReferenceError: ` + err;

  if (!is_expression_valid(exp)) return "parse error: Unexpected end";
  const result = eval(exp);

  if (type && variable) {
    vars[variable] = { type: type, value: result };
    return;
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
