/**
 * Created by hieu on 9/27/16.
 */
db = db.getSiblingDB('sosam');
db.getCollectionNames();
db.users.drop();
db.createCollection('user');
db.user.insertOne({
    email: "admin@email.com",
    name: "admin",
    hash: "Test hash",
    salt: "Test salt"
});