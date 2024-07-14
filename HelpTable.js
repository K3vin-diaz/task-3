const { table } = require('table');

class HelpTable {
    constructor(moves) {
        this.moves = moves;
    }

    displayTable() {
        const tableSize = this.moves.length + 1;
        const tableData = Array.from({ length: tableSize }, () => Array(tableSize).fill(''));
        tableData[0][0] = 'PC\\User >';
        for (let i = 1; i < tableSize; i++) {
            tableData[0][i] = this.moves[i - 1];
            tableData[i][0] = this.moves[i - 1];
        }
        for (let i = 1; i < tableSize; i++) {
            for (let j = 1; j < tableSize; j++) {
                if (i === j) {
                    tableData[i][j] = 'Draw';
                } else if ((j - i + this.moves.length) % this.moves.length <= Math.floor(this.moves.length / 2)) {
                    tableData[i][j] = 'Win';
                } else {
                    tableData[i][j] = 'Lose';
                }
            }
        }
        console.log(table(tableData));
    }
}

module.exports = HelpTable;