/**
* Seeds database with a collection of users and their article and shortform submissions.
* To be used with the snapshot JSON files that our system periodically backs up to S3.
*
* Instructions:
* run command `node seed`
*/

const fs = require('fs');
const Seed = require('seed');
const MongoStore = require('seed-mongodb')
const store = new MongoStore({
  db: 'no-commerce',
  host: 'localhost',
  port: 27017,
});

/**
* Removes all records from a collection
* @param {name} string The name of the collection (i.e. if you would use db.users.find() in mongo CLI, this param would be `users`)
*/
const emptyCollection = (name) => {
  return new Promise((resolve, reject) => {
    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb://localhost:27017/no-commerce";
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection(name).remove({}, function(err, obj) {
        if (err) throw err;
        db.close();
        console.log(obj.result.n + " document(s) deleted");
        resolve(obj.result.n + " document(s) deleted");
      });
    });
  })
}

/**
* Fills a collection with records from a JSON file
* @param {name} string The name of the collection (i.e. if you would use db.users.find() in mongo CLI, this param would be `users`)
* @param {fileName} string The path to the .json file to be seeded into the collection
*/
const seedCollection = (name, fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, jsonFile) => {
      if (err) {
        console.log(`Error reading seed file ${jsonFile}: `, err);
        return;
      }
      const Model = Seed.Model.extend(name, {
        store: store
      });
      const objArray = JSON.parse(jsonFile);
      objArray.forEach((obj, i) => {
        const model = new Model(obj);
        model.save(function (err, data) {
          if (err) return console.error(err);
          console.log(`${name} ${i}/${objArray.length} has been saved!`);
          if(i === objArray.length-1) {
            resolve('Completed seeding');
          }
        });
      });
    });
  })
}

if (process.env.NODE_ENV === 'production' && process.env.FORCE_SEED !== 'force') {
  console.log('Do not seed production.  Use FORCE_SEED=force env var to force seed.');
  return false;
}

emptyCollection('users')
  .then(() => emptyCollection(''))
  .then(() => seedCollection('users', './users/seeds/.json'))
  .then(() => seedCollection('', './seeds/.json'))

  .catch(err => {
    console.log('Error seeding:', err);
  });
