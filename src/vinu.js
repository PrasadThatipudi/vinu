import { evaluate } from "./evaluate.js";
import { parseErr } from "./evaluate.js";
import {
  extractVariable,
  replaceVariablesWithValues,
} from "./extract_variables.js";

const vinu_version = `Vinu 2.O
exit using ctrl+d, ctrl+c, or close()
\x1b[33mREPL is running with all permissions allowed.\x1b[0m
To specify permissions, run \`vinu repl\` with allow flags.`;

const displayVersion = () => console.log(vinu_version);

const validateVariables = function (expression) {
  const unDeclaredVariable = expression.match(/[a-z_]*/i)[0];
  //Extract regex to variable
  return unDeclaredVariable
    ? [true, unDeclaredVariable + " is not defined"]
    : [false, null];
};

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

  vars[variable] = { type, value };
  // const newVar = { type, value };
  // const result = { ...vars, [variable]: newVar };
  return;
};

const executeStatement = function (statement, variables) {
  const { variable, expression, type } = extractVariable(statement);
  const exp = replaceVariablesWithValues(variables, expression);
  const [isErr, err] = validateVariables(exp);

  if (isErr) return `Uncaught ReferenceError: ` + err;

  const result = evaluate(exp);

  if (type && variable) {
    return createVariable(variables, variable, type, result);
  }

  return result;
};

const displayResult = (result) => console.log(result);

const main = function () {
  displayVersion();
  const variables = {};

  while (true) {
    const statement = prompt("> ");
    if (statement.trim() === "close()") return;
    const result = executeStatement(statement, variables);
    displayResult(result);
  }
};

main();
