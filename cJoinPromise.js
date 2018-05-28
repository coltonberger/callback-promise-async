const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

const joiner = () => {
  let users;
  let books;
  let reviews;
  let output = [];

  return readFileAsync('./users.json')
    .then((data)=>{
      users = JSON.parse(data);
      return readFileAsync('./books.json');
    }).then((data)=>{
      books = JSON.parse(data)
      return readFileAsync('./reviews.json')
    }).then((data)=>{
      reviews = JSON.parse(data);

      for (let review of reviews) {
        for (let book of books) {
          for (let user of users) {

            if (review.userId === user.id && review.bookId === book.id)  {

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
    })
}

module.exports = joiner;
