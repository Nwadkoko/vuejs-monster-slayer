function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: []
    };
  },
  computed: {
    monsterHealthStyles() {
      return {
        width: this.monsterHealth <= 0 ? "0%" : this.monsterHealth + "%",
      };
    },
    playerHealthStyles() {
      return {
        width: this.playerHealth <= 0 ? "0%" : this.playerHealth + "%",
      };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
        if(value <= 0 && this.monsterHealth <= 0) {
            // A draw
            this.winner = "draw";
        } else if (value <= 0) {
            // Player lost
            this.winner = "monster";
        }
    },
    monsterHealth(value) {
        if(value <= 0 && this.playerHealth <= 0) {
            // A draw
            this.winner = "draw";
        } else if (value <= 0) {
            // Monster lost
            this.winner = "player";
        } 
    }
  },
  methods: {
    attackMonster() {
      this.currentRound++;

      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttack() {
      this.currentRound++;

      const attackValue = getRandomValue(11, 19);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);

      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage("player", "heal", healValue);
      this.attackPlayer();
    },
    startNewGame() {
        this.playerHealth = this.monsterHealth = 100;
        this.winner = null;
        this.currentRound = 0;
        this.logMessages = [];
    },
    surrender() {
        this.winner = "monster";
    },
    addLogMessage(who, what, value) {
        this.logMessages.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value
        });
    }
  },
});

app.mount("#game");
