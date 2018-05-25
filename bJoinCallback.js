const fs = require('fs');
const joiner = (response) => {
  fs.readFile('./users.json', (err, data) => {
    const users = JSON.parse(data);
    fs.readFile('./books.json', (err, data) => {
      const books = JSON.parse(data);
      fs.readFile('./reviews.json', (err, data) => {
        const reviews = JSON.parse(data);
        const output = [];

        for (let review of reviews) {
          for (let book of books) {
            if (book.id !== review.bookId) {
              continue;
            }
            for (let user of users) {
              if (user.id !== review.userId) {
                continue;
              }
              const joined = {
                "name": user.firstName,
                "book": book.title,
                "rating": review.stars,
                "review": review.text
              }
              output.push(joined);
            }
          }
        }

        return response(output);

      })
    })
  })


}




module.exports = joiner;
