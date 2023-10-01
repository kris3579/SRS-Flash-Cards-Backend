'use strict'; // eslint-disable-line

const superagent = require('superagent');

class Model {
  constructor(schema) {
    this.Schema = schema;
  }

  async create(data) {
    const createNew = await new this.Schema(data);
    return createNew.save().catch((error) => {
      console.log(error);
      return 'Error';
    });
  }

  async getAll() {
    const results = await this.Schema.find({});
    return results;
  }

  async findById(_id) {
    const results = await this.Schema.findById({ _id });
    return results;
  }

  async findByQuery(query) {
    const results = await this.Schema.find(query);
    return results;
  }
  
  async delete(_id) {
    const result = await this.Schema.findByIdAndDelete(_id);
    return result;
  }

  async update(_id, data) {
    const results = await this.Schema.findByIdAndUpdate(_id, data, { useFindAndModify: false, new: true });// eslint-disable-line
    return results;
  }
}
module.exports = Model;
