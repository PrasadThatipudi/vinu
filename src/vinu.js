import { evaluate } from "./evaluate.js";
import { parseErr } from "./evaluate.js";
import { extractVariable } from "./extract_variables.js";

const vinu_version = `Vinu 2.O
exit using ctrl+d, ctrl+c, or close()
\x1b[33mREPL is running with all permissions allowed.\x1b[0m
To specify permissions, run \`vinu repl\` with allow flags.`;

const displayVersion = () => console.log(vinu_version);

const isVariableNameValid = function (variable) {
  return !variable.match(/^\s*\d+/);
};

const createVariable = function (vars, variable, type, value) {
  if (!isNaN(variable))
    return parseErr(
      `Unexpected token \`numeric literal (${variable}, ${variable})\`. Expected yield, an identifier`
    );

  if (!isVariableNameValid(variable))
    return parseErr(`Identifier cannot follow number`);

  if (variable in vars && vars[variable].type !== type)
    return `Uncaught SyntaxError: Identifier '${variable}' has already been declared`;

  vars[variable] = { type, value };
  // const newVar = { type, value };
  // const result = { ...vars, [variable]: newVar };
  // return result;
};

const executeStatement = function (statement, variables) {
  const { variable, expression, type } = extractVariable(statement);
  const result = evaluate(variables, expression);

  if (type && variable) {
    return createVariable(variables, variable, type, result);
  }

  return result;
};

const displayResult = (result) => console.log(result);

const main = function () {
  displayVersion();
  const variables = {};
  let statement = prompt("> ").trim();

  while (statement !== "close()") {
    // let result = undefined;
    // if (statement.startsWith("const") || statement.startsWith("let")) {
    //   variables = executeStatement(statement, variables);
    // } else {
    //   result = executeStatement(statement, variables);
    // }
    const result = executeStatement(statement, variables);
    displayResult(result);
    statement = prompt("> ").trim();
  }
};

main();
