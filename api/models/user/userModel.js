'use strict'; // eslint-disable-line

const model = require('../model');

class userModel extends model {
  async addCards(user) {
    // const results = await this.Schema.findByIdAndUpdate(user._id,
    //   { animeList: user.animeList, totalVotes: user.totalVotes, matchList: user.matchList },
    //   { useFindAndModify: false, new: true });
    // return results;
  }
}

module.exports = userModel;
