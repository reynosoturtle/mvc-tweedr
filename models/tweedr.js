const SAUNA = 'pickles';
const sha256 = require('js-sha256');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let getAllTweets = (data, doneWithQuery) => {

    let query = 'SELECT users.pic, users.name, tweets.message, tweets.photo_attached, tweets.created_at FROM tweets INNER JOIN users ON users.id = tweets.user_id';

    dbPoolInstance.query(query, (error, result) => {
      if ( error ) {
        console.log(error, null);
      } else {
        const allTweets = result.rows;
        doneWithQuery(allTweets);
      }
    });
  };

  let newUser = (data, doneWithQuery) => {

    let query = 'INSERT INTO users (name, password, pic) VALUES ($1, $2, $3)';
    let hash = sha256(request.body.password + SAUNA);
    let values = [request.body.name, hash, request.body.pic];

    dbPoolInstance.query(query, values, (error, result) => {
      if ( error ) {
        console.log(error, null);
      } else {
        const newUser = result.rows[0];
        doneWithQuery(newUser);
      }
    });
  };

  return {
    view: getAllTweets,
    registerComplete: newUser,
  };
};
