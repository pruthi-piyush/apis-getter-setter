
'use strict';


const request = require('request-promise')

const Albums = require('../albums/albums.js')
const albumsObj = new Albums()

const Photos = require('../photos/photos.js')
const photosObj = new Photos()

async function fetchData() {

  // need to first fetch albums
  // and wait for it as albumId is foreign key
  await fetchAlbums()
  fetchPhotos()

}

async function fetchAlbums() {

  return new Promise( (resolve, reject) => {
    let options = {
      uri : 'https://jsonplaceholder.typicode.com/albums',
         method : 'GET'
    }

    request(options)
    .then(function(albums) {

      // add albums

      albums = JSON.parse(albums)

      console.log("Albums : ", albums)
      console.log('Albums Length == > ', albums.length)

      for(let album of albums) {
        albumsObj.add(album)
      }

    resolve({})

    })
    .catch(function(err) {
      console.log("Some Error in fetchAlbums service", err)
      // TODO : handle this error, for now shutting down process
      // but , we can do some retry logic here on error
      process.exit(0)
    })
  })

}

async function fetchPhotos() {

  console.log("Fetching Photos")
  let options = {
    uri : 'https://jsonplaceholder.typicode.com/photos'
  }

  for(let album of albumsObj.get()) {
    options.qs = { albumId : album.id }

    request(options)
      .then(function(photos) {
        photos = JSON.parse(photos)

        console.log("Photos : ", photos)
        console.log('Photos Length == > ', photos.length)

        for( let photo of photos ) {
          photosObj.add(photo)
        }
        console.log("All Photos Length ==>", photosObj.get())
        console.log("All Photos Length ==>", photosObj.get().length)
      })
    .catch(function(err) {
      console.log("Some Error in fetchPhotos service", err)
      // TODO : handle this error, for now shutting down process
      // but , we can do some retry logic here on error
      process.exit(0)
    })

  }


}

  
module.exports = {
  fetchData : fetchData
}
