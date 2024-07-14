const HMACGenerator = require('./HMAC.js');
const HelpTable = require('./HelpTable.js');
const GameRules = require('./GameRules.js');    
const readline = require('readline');

function validateInput(args) {
    if (args.length < 3 || args.length % 2 === 0) {
        console.error("Error: You must provide an odd number of non-repeating strings (at least 3).");
        console.error("Example: node task3.js Rock Paper Scissors");
        process.exit(1);
    }
    const uniqueArgs = new Set(args);
    if (uniqueArgs.size !== args.length) {
        console.error("Error: Moves must be non-repeating.");
        console.error("Example: node Task.js Rock Paper Scissors");
        process.exit(1);
    }
}

function main() {
    const args = process.argv.slice(2);
    validateInput(args);

    const hmacGen = new HMACGenerator();
    const gameRules = new GameRules(args);
    const helpTable = new HelpTable(args);

    const computerMove = args[Math.floor(Math.random() * args.length)];
    const hmacValue = hmacGen.generateHMAC(computerMove);

    console.log(`HMAC: ${hmacValue}`);

    function showMenu() {
        console.log("Menu:");
        args.forEach((move, index) => {
            console.log(`${index + 1} - ${move}`);
        });
        console.log("0 - Exit");
        console.log("? - Help");
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function promptUser() {
        showMenu();
        rl.question("Enter your choice: ", (userInput) => {
            if (userInput === "0") {
                console.log("Goodbye!");
                rl.close();
            } else if (userInput === "?") {
                helpTable.displayTable();
                promptUser();
            } else if (/^\d+$/.test(userInput) && 1 <= parseInt(userInput) && parseInt(userInput) <= args.length) {
                const playerMove = args[parseInt(userInput) - 1];
                console.log(`Your move: ${playerMove}`);
                console.log(`Computer move: ${computerMove}`);
                console.log(`Key: ${hmacGen.getKey()}`);
                const result = gameRules.determineWinner(playerMove, computerMove);
                console.log(`Result: ${result}`);
                const hmacCalcLink = `https://www.liavaag.org/English/SHA-Generator/HMAC/`;
                console.log(`You can verify the HMAC using this link: ${hmacCalcLink}`);
                rl.close();
            } else {
                console.log("Invalid input. Please try again.");
                promptUser();
            }
        });
    }

    promptUser();
}

main();