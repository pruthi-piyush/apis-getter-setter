
'use strict';

const dbConnector = require('../dbConnector/dbConnector.js').getInstance()


class Albums {

  constructor() {
    this._albums = []
  }


  add(album) {

    this._albums.push(album)
    dbConnector.addAlbum(album)

  }

  remove() {
  }

  get() {
    return this._albums
  }

  getAlbum(albumId) {
  }

}


module.exports = Albums
