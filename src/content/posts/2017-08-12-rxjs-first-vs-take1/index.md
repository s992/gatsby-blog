---
title: 'RxJS: first() vs. take(1)'
date: '2017-08-12T06:18:32.778Z'
comments: true
path: '/blog/rxjs-first-vs-take1'
published: true
---
When I first started using RxJS (and for a while afterwards), I assumed that `first()` was just a convenience method that functioned identically to `take(1)`. Occasionally I'd see the error, "EmptyError: no elements in sequence," but I never made the connection to my code.

<!-- more -->

It turns out there's a very important distinction between the two methods: `first()` will emit an error if the stream completes before a value is emitted. Or, if you've provided a predicate (i.e. `first(value => value === 'foo')`), it will emit an error if the stream completes before a value that passes the predicate is emitted.

`take(1)`, on the other hand, will happily carry on if a value is never emitted from the stream. Here's a simple example:

```js
const subject$ = new Rx.Subject();

// logs "no elements in sequence" when the subject completes
subject$.first().subscribe(null, (err) => console.log(err.message));

// never does anything
subject$.take(1).subscribe(console.log);

subject$.complete();
```

Another example, using a predicate:

```js
const observable$ = Rx.Observable.of(1, 2, 3);

// logs "no elements in sequence" when the observable completes
observable$
  .first((value) => value > 5)
  .subscribe(null, (err) => console.log(err.message));

// the above can also be written like this, and will never do
// anything because the filter predicate will never return true
observable$
  .filter((value) => value > 5);
  .take(1)
  .subscribe(console.log);
```

As a newcomer to RxJS, this behavior was very confusing to me, although it was my own fault because I made some incorrect assumptions. If I had bothered to check the docs, I would have seen that the behavior is [clearly documented](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-first):

> Throws an error if `defaultValue` was not provided and a matching element is not found.

The reason I've run into this so frequently is a fairly common Angular 2 pattern where observables are cleaned up manually during the `OnDestroy` lifecycle hook:

```js
class MyComponent implements OnInit, OnDestroy {
  private stream$: Subject = someDelayedStream();
  private destroy$ = new Subject();

  ngOnInit() {
    this.stream$
      .takeUntil(this.destroy$)
      .first()
      .subscribe(doSomething);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
```

The code looks harmless at first, but problems arise when the component in destroyed before `stream$` can emit a value. Because I'm using `first()`, an error is thrown when the component is destroyed. I'm usually only subscribing to a stream to get a value that is to be used within the component, so I don't care if the component gets destroyed before the stream emits. Because of this, I've started using `take(1)` in almost all places where I would have previously used `first()`.

`filter(fn).take(1)` is a bit more verbose than `first(fn)`, but in most cases I prefer a little more verbosity over handling errors that ultimately have no impact on the application.

Also important to note: The same applies for `last()` and `takeLast(1)`.