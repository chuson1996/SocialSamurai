Theme: https://html5up.net/future-imperfect  
Video Url: https://www.youtube.com/watch?v=v7UIz_ANLb0

## Api

1. User register: /api/register
2. User login:    /api/login
3. Pull session data (user data, challenges data): /api/session
4. Create comment: /api/challenges/:challengeId/comments
5. Create 2nd comment: /api/challenges/:challengeId/comments/:commentId
5. CRUD operation: /api/challenges(/?:challengeId) and /api/users(/?:userId)

## Populate the database

```bash
mongo ds029456.mlab.com:29456/social-samurai -u admin -p admin < db-script.js
```

## Connect to MongoLab
```bash
mongo ds029456.mlab.com:29456/social-samurai -u admin -p admin
```
