
'use strict';

// need to fetch client connections from pool
const { Pool }  = require('pg')

class DbConnector {

  constructor() {

    // make pool
    this.pool = new Pool( 
                          {
                            user : 'piyush',
                            host : '127.0.0.1',
                            database : 'typicode',
                            password : 'piyush123',
                            port : 5432
                          }
                        )

    this.pool.on('error', (err, client) => {
        console.log("Error From connection Pool", error)
    })

  }


  async addAlbum(album) {

    const client = await this.pool.connect()

    try {
      let res = await client.query("insert into album values($1, $2, $3)",
                                   [album.id, album.userId, album.title]
                                  )
    }
    catch(err) {
      console.log('Error in Adding album', err)
    }
    finally {
      // give client back to pool
      client.release()
    }

  }

  async addPhoto(photo) {

    const client = await this.pool.connect()

    // TODO : use copy operation for bulk insert

    try {
      let res = await client.query("insert into photo values($1, $2, $3, $4, $5)",
                                   [ photo.id, 
                                     photo.albumId,
                                     photo.title,
                                     photo.url,
                                     photo.thumbnailUrl
                                   ]
                                  )
    }
    catch(err) {
      console.log('Error in Adding photo', err)
    }
    finally {
      // give client back to pool
      client.release()
    }


  }

  async getAlbumById(albumId) {

    const client = await this.pool.connect()
    
    try {
      let res = await client.query("select * from album where id = $1",
                                   [ albumId ]
                                  )
      let row = res.rows[0]
      return row
    }
    catch(err) {
      console.log('Error in getAlbumById service', err)
      // TODO : throw this error to callee
      // where this can be handled properly
    }
    finally {
      // give client back to pool
      client.release()
    }


  }
  
  async getPhoto(albumId, id) {

    const client = await this.pool.connect()
    
    try {
      let res = await client.query("select * from photo where albumid = $1 and id = $2",
                                   [ albumId, id ]
                                  )
      let row = res.rows[0]
      return row
    }
    catch(err) {
      console.log('Error in getPhoto service', err)
      // TODO : throw this error to callee
      // where this can be handled properly
    }
    finally {
      // give client back to pool
      client.release()
    }


  }
  static getInstance() {

    if( null == this._instance ) {
      this._instance = new DbConnector()
    }

    return this._instance

  }

}

module.exports = DbConnector
