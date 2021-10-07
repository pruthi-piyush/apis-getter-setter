
'use strict';

const dbConnector = require('../dbConnector/dbConnector.js').getInstance()


class Photos {

  constructor() {
    this._photos = []
  }

  add(photo) {
    this._photos.push(photo)
    dbConnector.addPhoto(photo)
  }

  remove() {
  }

  get() {
    return this._photos
  }

}

module.exports = Photos
