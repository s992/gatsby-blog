---
title: "npm as a Build System Can Be Slightly Annoying"
date: '2015-09-21T18:30:00.000Z'
comments: true
path: "/blog/npm-as-a-build-system-can-be-slightly-annoying"
published: true
---

I was originally going to title this article, "Why I Don't Like npm as a Build System," but I thought that sounded a little confrontational. I actually like the *concept* of npm as a build system, but there's one thing that project maintainers frequently forget: their Windows users ([there are dozens of us!](https://www.youtube.com/watch?v=lKie-vgUGdI)). This morning, I read a [great article](http://www.sitepoint.com/guide-to-npm-as-a-build-tool/) on ditching your Grunt/Gulp/etc dependency and using npm as your build system via [npm scripts](https://docs.npmjs.com/misc/scripts). It reminded me of a slight annoyance I ran into earlier this year when looking into contributing to [angular-formly](https://github.com/formly-js/angular-formly).

<!-- more -->

Now, the first thing I want to say is that this is in no way meant to be an attack against angular-formly or its maintainer, the excellent [Kent C. Dodds](https://twitter.com/kentcdodds) - I recommend angular-formly to anyone who will listen, and Kent is at the top of my "awesome open source maintainers and also really cool people in general" list (it's a very exclusive list). The only reason I'm using angular-formly as an example is because it's the first project that popped into my mind when I read the blog post. Also, angular-formly has since been updated to resolve this problem. :)

That being said, I did run into a minor frustration when looking at making a contribution. I don't remember exactly what I was trying to do, but it probably had something to do with one of these issues: [#269](https://github.com/formly-js/angular-formly/issues/269) or [#279](https://github.com/formly-js/angular-formly/issues/279). I made a change to my local copy of the project and, being a good coder, decided to run the tests before firing off an untested pull request. Easy enough, right? Just kick it off with: `npm run test`.

Wrong! Windows wasn't OK with that: `'NODE_ENV' is not recognized as an internal or external command, operable program, or batch file.`

You see, a lot of projects that use npm as a build system will set the `NODE_ENV` environment variable before kicking off their scripts (which, by the way, is a perfectly reasonable thing to do). The problem is that the vast majority of project maintainers work on *nix systems and Windows tends to slip their minds. This is what the `npm test` command executed: `NODE_ENV=test karma start`. In Windows, it would have to be rewritten to `set NODE_ENV=test&&karma start`. That will work for cmd, anyway - Powershell is a completely different beast and I haven't actually figured out how to write a one-liner equivalent for Powershell.

So, what's the solution? Well, I hadn't seen the angular-formly repo since it had been fixed and I had been planning on trying to tackle the problem myself. Turns out another angular-formly user, [benoror](https://github.com/benoror), ran into the same thing I had and had decided to [solve it](https://github.com/formly-js/angular-formly/pull/350). A few days later, [better-npm-run](https://github.com/benoror/better-npm-run) was born! It's a library that aims to solve the cross-platform compatibility issues with npm scripts. I ran through a few of angular-formly's npm scripts as I was writing this post and they all seem to work great.

As you can see from [the commit](https://github.com/formly-js/angular-formly/commit/6fbaea258a1f3c5737f7d4276ad49c2a065988e3) that added better-npm-run to angular-formly, it is quite a bit more verbose than simple npm scripts. That's not too high a price to pay, though - as a project maintainer, the unfortunate alternative is potentially alienating Windows users who would love to help make your project better but choose not to because of the barrier to entry. It may be a very slight barrier, but I guarantee that some people who would have otherwise contributed to a project decided not to because they either

1. Couldn't be bothered to figure out how to run the scripts in their environment, or
2. Didn't have the knowledge they needed to figure out how to run the scripts in their environment.

I might be overly optimistic, but I'd like to think that the majority of open source maintainers would like to be as open as possible to new contributors - regardless of their operating system. If you're one of those maintainers, I'd encourage you to make sure your build and test scripts work on all platforms. If you don't have access to a Windows machine, I'd be happy to clone your repo and run your scripts - just drop me a line.
