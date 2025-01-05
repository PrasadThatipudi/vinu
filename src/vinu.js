import { is_expression_valid } from "./evaluate.js";
import { extract_variable } from "./extract_variables.js";

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

const execute_expression = function (statement, vars) {
  const { variable, expression, type } = extract_variable(statement);
  if (type && variable) {
    vars[variable] = { type: type, value: eval(expression) };
    return;
  }

  if (isNaN(expression)) return vars[expression.trim()].value;

  if (!is_expression_valid(expression)) return "parse error: Unexpected end";
  return eval(expression);
};

const main = function () {
  displayVinuVersion();
  const vars = {};

  while (true) {
    const statement = prompt("> ");
    console.log(execute_expression(statement, vars));
  }
};

main();
