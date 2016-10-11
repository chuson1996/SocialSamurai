/**
 * Created by hieu on 9/27/16.
 */
var crypto = require('crypto');

db = db.getSiblingDB('social-samurai');
db.getCollectionNames();

// Populate users
db.users.drop();
db.createCollection('users');
db.users.insertOne({
    _id: ObjectId('000011112222333344445555'),
    email: "john@email.com",
    name: "Tri Tran",
    hash: "6f4e5b9923ccc892d0429ea9948ce46c5025f818fc351a15b9c6a677fa9333ae720b1526bfd6762faedef9ff07b229bf565c804cc890bc4fc86b5a2663d379b1",
    salt: "698b5e3bf3576b010f4990a0da65c8d4"
});

db.users.insertOne({
    _id: ObjectId('000011112222333344445556'),
    email: "admin@email.com",
    name: "Admin",
    hash: "6f4e5b9923ccc892d0429ea9948ce46c5025f818fc351a15b9c6a677fa9333ae720b1526bfd6762faedef9ff07b229bf565c804cc890bc4fc86b5a2663d379b1",
    salt: "698b5e3bf3576b010f4990a0da65c8d4"
});

// Populate challenges
db.challenges.drop();
db.createCollection('challenges');
db.challenges.insertOne({
    title: "Challenge 1: Who is Social Samurai?",
    description: "Go to 5 strangers and get compliments from them.",
    videoUrl: "v7UIz_ANLb0",
    level: 1,
    comments: [
        {
            _creator: ObjectId('000011112222333344445555'),
            body: "What is love?",
            comments: [
                {
                    _creator: ObjectId('000011112222333344445556'),
                    body: "Baby don't hurt me"
                },
                {
                    _creator: ObjectId('000011112222333344445555'),
                    body: "Don't hurt me"
                },
                {
                    _creator: ObjectId('000011112222333344445556'),
                    body: "No more"
                }
            ]
        }
    ]
});
db.challenges.insertOne({
    title: "Challenge 2",
    description: "Smile honey",
    videoUrl: "Test url",
    level: 2,
    comments: []
});
db.challenges.insertOne({
    title: "Challenge 3",
    description: "Chicken noodle",
    videoUrl: "Test url",
    level: 3,
    comments: []
});