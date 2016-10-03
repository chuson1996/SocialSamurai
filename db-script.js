/**
 * Created by hieu on 9/27/16.
 */
db = db.getSiblingDB('sosam');
db.getCollectionNames();

// Populate users
db.users.drop();
db.createCollection('users');
db.users.insertOne({
    _id: ObjectId('000011112222333344445555'),
    email: "admin@email.com",
    name: "admin",
    hash: "Test hash",
    salt: "Test salt"
});

// Populate challenges
db.challenges.drop();
db.createCollection('challenges');
db.challenges.insertOne({
    title: "Challenge 1",
    description: "Dance baby",
    videoUrl: "Test url",
    comments: [
        {
            _creator: ObjectId('000011112222333344445555'),
            body: "What is love?",
            comments: [
                {
                    _creator: ObjectId('000011112222333344445555'),
                    body: "Baby don't hurt me"
                },
                {
                    _creator: ObjectId('000011112222333344445555'),
                    body: "Don't hurt me"
                },
                {
                    _creator: ObjectId('000011112222333344445555'),
                    body: "No more"
                }
            ]
        }
    ]
})