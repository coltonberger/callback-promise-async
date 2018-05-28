const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

// Note the "async" keyword (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
const joiner = async () => {
    // You cannot use fs.readFileSync here
    // Use https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
    // Use the `await` operator to avoid manually returning a promise (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) LINK DOESNT WORK!!!!
    const users = JSON.parse(await readFileAsync('./users.json'));
    const books = JSON.parse(await readFileAsync('./books.json'));
    const reviews = JSON.parse(await readFileAsync('./reviews.json'));
    let output = [];

    for (let review of reviews) {
      for (let book of books) {
        for (let user of users) {
          if (review.userId === user.id && review.bookId === book.id) {

            let joined = {
              "name":user.firstName,
              "book":book.title,
              "rating":review.stars,
              "review":review.text
            }
            output.push(joined);
          }
        }
      }
    }

    return output;
  };

module.exports = joiner;
