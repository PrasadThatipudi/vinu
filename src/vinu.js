const add = (first, second) => first + second;
const sub = (first, second) => first - second;
const mul = (first, second) => first * second;
const div = (first, second) => first / second;
const mod = (first, second) => first % second;
const vinu_script = `Vinu 2.O
exit using ctrl+d, ctrl+c, or close()
%cREPL is running with all permissions allowed.
%cTo specify permissions, run \`vinu repl\` with allow flags.`;

const displayVinu = () =>
  console.log(vinu_script, "color:yellow", "color:white");

const validate_expression = /^\d+\s*(\s*[+-/*%]\s*\d+)*$/;
export const extract_operands = (expression) => expression.match(/\d+/g);
export const extract_operators = (expression) => expression.match(/[+-/*%]/g);
export const is_expression_valid = (expression) =>
  !!expression.match(validate_expression);

export const evaluate = function (expression) {
  if (!is_expression_valid(expression)) return "parse error: Unexpected eof";

  const operations = { "+": add, "-": sub, "*": mul, "/": div, "%": mod };
  const operands = extract_operands(expression).map((number) => +number);
  const operators = extract_operators(expression);

  return operands.reduce((accumulator, operand, index) =>
    operations[operators[index - 1]](accumulator, operand)
  );
};

const main = function () {
  displayVinu();

  while (true) {
    const expression = prompt("> ");
    console.log(evaluate(expression));
  }
};

// main();
