import { evaluateExpression } from "./evaluate.js";
import { parseErr } from "./evaluate.js";
import { extractVariable } from "./extract_variables.js";

const version = `Vinu 1.O
exit using ctrl+d, ctrl+c, or close()
\x1b[33mREPL is running with all permissions allowed.\x1b[0m
To specify permissions, run \`vinu repl\` with allow flags.`;

const displayVersion = () => console.log(version);

const isVariableNameValid = function (variable) {
  return !variable.match(/^\s*\d+/);
};

const createVariable = function (variables, variable, type, value) {
  if (!isNaN(variable))
    return [
      variables,
      parseErr(
        `Unexpected token \`numeric literal (${variable}, ${variable})\`. Expected yield, an identifier`
      ),
    ];

  if (!isVariableNameValid(variable))
    return [variables, parseErr(`Identifier cannot follow number`)];

  if (variable in variables && variables[variable].type !== type)
    return [
      variables,
      `Uncaught SyntaxError: Identifier '${variable}' has already been declared`,
    ];

  const newVar = { type, value };
  const result = { ...variables, [variable]: newVar };
  return [result];
};

const executeStatement = function (statement, variables) {
  const { variable, expression, type } = extractVariable(statement);
  const result = evaluateExpression(variables, expression);

  if (type && variable) {
    return createVariable(variables, variable, type, result);
  }

  return [variables, result];
};

const displayResult = (result) => console.log(result);
const readStatement = () => prompt("> ").trim();

const main = function () {
  displayVersion();
  let variables = {};
  let statement = readStatement();

  while (statement !== "close()") {
    const [latestVariables, result] = executeStatement(statement, variables);
    variables = latestVariables;
    displayResult(result);
    statement = readStatement();
  }
};

main();
