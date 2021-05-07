const { STARTING_BALANCE } = require("../config/config");

class Wallet {
  constructor() {
    this.balance = STARTING_BALANCE;
  }
}

module.exports = Wallet;
