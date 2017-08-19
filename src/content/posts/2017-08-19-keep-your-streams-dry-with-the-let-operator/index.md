---
title: Keep Your Streams DRY with the "let" Operator
date: '2017-08-19T14:37:39.151Z'
comments: true
path: '/blog/keep-your-streams-dry-with-the-let-operator'
published: true
---
I may have been living under a rock, but I just learned about the RxJS `let` operator two days ago at MidwestJS. As soon as I saw it, I realized there was immediate value to be gained by starting to use it.

<!-- more -->

To demonstrate the value, let's take a look at a contrived example. Imagine you have an observable representing the current user (e.g., a stream from [ngrx/store](https://github.com/ngrx/store)). For some reason (remember, this is a contrived example!), you need to calculate the user's full name every time you get it from the store, but only if the user is logged in.

You might implement it like this:

```js
user$
  .filter(user => user && user.loggedIn)
  .map(user => `${user.firstName} ${user.lastName}`)
  .subscribe(doSomething)
```

You probably have to repeat this chain a lot throughout your codebase because you need to access your user a lot, so you refactor the filter and map predicates into reusable functions:

```js
const userIsLoggedIn = user => user && user.loggedIn;
const getFullName = user => `${user.firstName} ${user.lastName}`;

user$
  .filter(userIsLoggedIn)
  .map(getFullName)
  .subscribe(doSomething);
```

This is good, but we can do better. The `let` operator (as in, ["let me have the whole observable"](https://www.learnrxjs.io/operators/utility/let.html)) allows you to take the source observable, perform some operations on it, and return a new observable for the stream. In our example, we can use `let` to avoid writing a filter/map chain every time we want to grab the user's full name:

```js
const userIsLoggedIn = user => user && user.loggedIn;
const getFullName = user => `${user.firstName} ${user.lastName}`;

const getFullNameIfLoggedIn = stream => 
  stream
    .filter(userIsLoggedIn)
    .map(getFullName);

user$
  .let(getFullNameIfLoggedIn)
  .subscribe(doSomething);
```

Now our logic to get the logged in user's full name is abstracted away and we don't have to reimplment the filter/map chain everywhere we touch the user. If we need to add some extra logic we only have to do it in one place instead of finding and updating the chain everywhere in the codebase. Maybe we want to add a filter to ensure that the user has a first and last name before we try to access them. With `let`, it's a piece of cake:

```js
const userIsLoggedIn = user => user && user.loggedIn;
const userHasFullName = user => user.firstName && user.lastName;
const getFullName = user => `${user.firstName} ${user.lastName}`;

const getFullNameIfLoggedIn = stream => 
  stream
    .filter(userIsLoggedIn)
    .filter(userHasFullName)
    .map(getFullName);

user$
  .let(getFullNameIfLoggedIn)
  .subscribe(doSomething);
```

By updating `getFullNameIfLoggedIn`, our new filter will be applied to everywhere in the codebase that we are using it in conjunction with `let`.

There are a lot of places in my code where I've reimplemented the same operator chain over and over again, and I am looking forward to migrating them to use `let`. Hopefully you can do the same in your codebases!
