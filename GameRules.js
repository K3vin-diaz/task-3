class GameRules {
    constructor(moves) {
        this.moves = moves;
    }

    determineWinner(playerMove, computerMove) {
        const playerIndex = this.moves.indexOf(playerMove);
        const computerIndex = this.moves.indexOf(computerMove);

        if (playerIndex === computerIndex) {
            return 'Draw';
        } else if ((computerIndex - playerIndex + this.moves.length) % this.moves.length <= Math.floor(this.moves.length / 2)) {
            return 'Lose';
        } else {
            return 'Win';
        }
    }
}

module.exports = GameRules;