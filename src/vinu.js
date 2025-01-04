import { evaluate } from "./evaluate.js";

const vinu_version = `Vinu 2.O
exit using ctrl+d, ctrl+c, or close()
%cREPL is running with all permissions allowed.
%cTo specify permissions, run \`vinu repl\` with allow flags.`;

const displayVinuVersion = () =>
  console.log(vinu_version, "color:yellow", "color:white");

const main = function () {
  displayVinuVersion();

  while (true) {
    const expression = prompt("> ");
    console.log(evaluate(expression));
  }
};

// main();
