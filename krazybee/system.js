
'use strict';

const dataFetcher = require('./modules/dataFetcher/dataFetcher.js')


class System  {

  constructor() {
  }

  start() {
    console.log('Starting System')
    // need to first fetch data via rest api calls 
    // and save it in database
    dataFetcher.fetchData()
  }

  stop() {
    console.log('Stopping System')
  }

  static getInstance() {

    if( null == this._instance ) {
      this._instance = new System()
    }

    return this._instance

  }

}

module.exports = System
