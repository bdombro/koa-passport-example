# Koa example/boilerplate

This repository demonstrates the usage of pg and raw SQL within an [Koa](https://koajs.com) application.


## Starting App

Run docker container with databse then run:

```
yarn install
yarn dev
```

This will start the application and create database tables.
Just open [http://localhost:3000](http://localhost:3000).

## Authentication

There is several authentication strategies available. You can use which one you want and remove those you don't want.

Available strategies: 

* local
* google
* twitter
* facebook

For routes you want to be accessable only by authenticated users, `authenticated` middleware can be used like:

```js
router.get('/authenticated-route', authenticated(), async (ctx, next) => {
  ctx.body = 'You are logged in'
})
```

Authenticated middleware is in `/utils/index.js`

## Database Relationships

For demonstrating ORM relationship, Post model created. The relationship is between users and posts like"

```js
  Post.belongsTo(User, {as: 'Author'})
```

You can find examples of relationship when creating new post, which each post will be associated to a user and also in route `/posts/user-posts/` which gets all posts of logged in user.
