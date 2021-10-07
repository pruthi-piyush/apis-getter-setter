
'use strict';

var express = require('express');
var router = express.Router();

const dbConnector = require('../modules/dbConnector/dbConnector.js').getInstance()


router.get('/', async function(req, res, next) {

  let data = {}

  console.log(req.query)


  if("album" === req.query.type) {

    if(null == req.query.id) {
      return res.status(400).send("Invalid Key : id")
    }

    let albumInfo = await fetchAlbumInfo(req.query.id)
    return res.status(200).send(albumInfo)

  } 
  else if( "photo" === req.query.type ) {

    if(null == req.query.id) {
      return res.status(400).send("Invalid Key : id")
    }

    if(null == req.query.album) {
      return res.status(400).send("Invalid Key : album")
    }

    let photoInfo = await fetchPhotoInfo(req.query.album,req.query.id)
    return res.status(200).send(photoInfo)

  }
  else {
    return res.status(400).send("Please request a valid type : 'album' or 'photo' ")
  }

});

async function fetchAlbumInfo(albumId) {

  // can give this record from RAM too, as we maintain albums and photos in memory
  // for now, giving it through database ( for more complex architectures,
  // where keeping this stuff in memory might not suffice

  let albumInfo = await dbConnector.getAlbumById(albumId)
  return albumInfo

}

async function fetchPhotoInfo(albumId, id) {

  // can give this record from RAM too, as we maintain albums and photos in memory
  // for now, giving it through database ( for more complex architectures,
  // where keeping this stuff in memory might not suffice

  let photoInfo = await dbConnector.getPhoto(albumId, id)
  return photoInfo

}

module.exports = router
