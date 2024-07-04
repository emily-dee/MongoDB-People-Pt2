// 1. Add a person to the collection. You pick the data, but they should have an empty array for children.
db.people.insertOne({ first_name: 'Karlach',
  last_name: 'Cliffgate',
  email: 'karlach@avernus.com',
  gender: 'Female',
  age: 32,
  state: 'Texas',
  children: [] }
);


// 2. Add another person. They should have at least two children.
db.people.insertOne({ first_name: 'Jenevelle',
  last_name: 'Hallowleaf',
  email: 'shadowheart@shar.net',
  gender: 'Female',
  age: 28,
  state: 'California',
  children: [{name: 'Laezel', age: 9},{name: 'Wyll', age: 6}] }
);


// 3. Update one person named Clarence. He moved from North Dakota to South Dakota.
db.people.updateOne({first_name: 'Clarence'}, {$set: {state: 'South Dakota'}});


// 4. Update Rebecca Hayes. Remove her email address.
db.people.updateOne({first_name: 'Rebecca', last_name: 'Hayes'}, {$set: {email: null}});


// 5. Update everyone from Missouri. They all had a birthday today, so add one to their age. (expect 4 matches)
db.people.updateMany({state:'Missouri'}, {$inc: {age: 1}});


// 6. Jerry Baker has updated information. Replace with a new document
db.people.replaceOne({first_name: 'Jerry', last_name: 'Baker'}, { first_name: "Jerry", last_name: "Baker-Mendez", email: "jerry@classic.ly", gender:"Male", age: 28, state: "Vermont", "children": [{name: "Alan", age: 18}, {name: "Jenny", age: 3}] });


// 7. Delete Wanda Bowman.
db.people.deleteOne({first_name: 'Wanda', last_name: 'Bowman'});


// 8. Delete everyone who does not have an email address specified. 
db.people.deleteMany({email: null});


// 9. Create a single field index on the email field.
db.people.createIndex({email: 1});


// 10. Create a compound index on the first_name and last_name fields.
db.people.createIndex({first_name: 1, last_name: 1});


// 11. Add several documents to a new submissions collection. Do it all in one command. 
db.submissions.insertMany([
  {title: 'The River Bend', upvotes: 10, downvotes: 2, artist: db.people.findOne({first_name: 'Anna', last_name: 'Howard'})._id},
  {title: 'Nine Lives', upvotes: 7, downvotes: 0, artist: db.people.findOne({first_name: 'Scott', last_name: 'Henderson'})._id},
  {title: 'Star Bright', upvotes: 19, downvotes: 3, artist: db.people.findOne({first_name: 'Andrea', last_name: 'Burke'})._id},
  {title: 'Why Like This?', upvotes: 1, downvotes: 5, artist: db.people.findOne({first_name: 'Steven', last_name: 'Marshall'})._id},
  {title: 'Non Sequitur', upvotes: 11, downvotes: 1, artist: db.people.findOne({first_name: 'Gerald', last_name: 'Bailey'})._id},
])


// 12. Add 2 upvotes for "The River Bend".
db.submissions.updateOne({title: 'The River Bend'}, {$inc: {upvotes: 2}});


// 13. Add a field round2 = true to all submissions with at least 10 upvotes. (expect 3 matches)
db.submissions.updateMany({upvotes: {$gte: 10}}, {$set: {round2: true}});


// Extended Challenges
// 14. Update Helen Clark. She had a baby! Add a child, name: Melanie, age: 0.
db.people.updateOne({first_name: 'Helen'}, {$push: {children: {name: 'Melanie', age: 0}}});


// 15. Joan Bishop has a child named Catherine. She just had a birthday and prefers to go by "Cat". In one query update the child's name to "Cat" and increment her age by one.
db.people.updateOne({first_name: 'Joan', last_name: 'Bishop', 'children.name': 'Catherine'}, 
{$set: {'children.$.name': 'Cat'}, $inc: {'children.$.age': 1}});


// 16. List all submissions that have more downvotes than upvotes.
db.submissions.find({$expr: {$gt: ['$downvotes', '$upvotes']}});