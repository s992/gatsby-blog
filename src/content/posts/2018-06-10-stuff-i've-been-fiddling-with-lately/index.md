---
title: Stuff I've Been Fiddling With Lately
date: '2018-06-10T19:16:07.080Z'
comments: true
path: '/blog/stuff-ive-been-fiddling-with-lately'
published: true
---

I've been playing with a variety of languages and frameworks over the past month or two, but haven't had substantial enough experience with any of them to feel comfortable writing an in-depth blog post. However, I do have some opinions so I thought I'd gather some bite-sized pieces into one post. Hoping to write more on some of these technologies in the future.

<!-- more -->

## React Native

Big fan of [React Native](https://facebook.github.io/react-native/). I've done a bit of Objective-C/Swift/Java but have never enjoyed building UIs in any of them. React Native definitely gets me a lot closer to something I'm comfortable with. That being said, it's not all great. After a lot of trial-and-error I finally landed on [React Navigation](https://reactnavigation.org/) as my routing solution. It's not perfect, but it works. The main contender, [React Native Navigation](https://github.com/wix/react-native-navigation), seems cool but it's an awful lot of setup without a real compelling argument to switch.

My biggest beef with RN routing is probably a side effect of spending the majority of my career working on web apps, but it just feels *super* inflexible. For example, the hobby app I'm working on uses drawer navigation but also wants a persistent header with some stack navigation, so basically a combination of two of the three routing options offered by React Navigation. I was unable to accomplish a persistent header with contextual back buttons without moving my routing state into Redux, which is something that React Navigation [recommends against](https://reactnavigation.org/docs/en/redux-integration.html). Overall, not a great experience but I made it work.

I'm looking forward to exploring RN more in the future.

## NativeScript

Since we use Angular at DroneDeploy, I also wanted to give [NativeScript](https://www.nativescript.org/) a fair shot. I'm no stranger to Angular and its idiosyncrasies, but I just didn't get the same rapid development vibe from NS as I did from RN. It felt like I did a lot more stumbling than I did with RN, even though I have far more experience with Angular. My biggest dislike is the wide variety of [layout containers](https://docs.nativescript.org/ui/layouts#predefined-layouts): FlexboxLayout, AbsoluteLayout, DockLayout, GridLayout, StackLayout, and WrapLayout. I get that the NS team is trying to give you solid options, but I felt like I spent the majority of my time with each component trying to decide which layout I wanted. RN's ubiquitous `<View />` made me feel a lot more productive.

I'll definitely dig into NS more in the future, but if I was greenfielding an app I would lean strongly toward RN at this point.

## Realm Database

The only database solution I've used for native apps in the past is sqlite, so I wanted to spread out a bit and try something new. I landed on [Realm](https://realm.io/products/realm-database/), which is a NoSQL database that was designed for native apps. I'm not a huge fan of NoSQL for large scale data, but I will admit that it's a great fit for a quick local database. I attempted to get Realm in sync with my Redux store via [redux-observable](https://github.com/redux-observable/redux-observable), but ended up causing more issues than I solved so I ultimately left it out of Redux. If I was working on a serious project, I'd likely spend a bit more time trying to get this working because it was a bit limiting.

Biggest issue: No cascading deletes. Realm models support relationships (both 1:m and m:m), but it is insanely easy to leave orphaned records unless you're very diligent with your delete logic. I could see this becoming *very* problematic with a complex data model.

## Elm

After avoiding [Elm](http://elm-lang.org/) for a long time (and for no good reason), I finally gave in and went through their excellent [tutorial](https://www.elm-tutorial.org/en/). The tutorial is phenomenal and gave me a solid understanding of both the language and the typical architecture of an Elm program. I think it's a neat language and I'd like to build something with it in the future, but I don't have any great ideas right now so it'll probably sit on my "one day" shelf for a while.

Two nits to pick:

- Complex business logic can get pretty verbose. This is probably in part due to my unfamiliarity with the language, but in general it felt like I did a *lot* of typing.
- I don't really care for the view/template syntax. I think I've just gotten used to XML-esque syntax for views and this threw me off my game a bit.

## ReasonML

I couldn't really get into [Reason](https://reasonml.github.io/). I think it's a cool project, but I just didn't see it giving me a strong edge over regular TypeScript + React. Also, I'm totally [one of these people](https://twitter.com/marcelcutts/status/1002153230757978113?s=19):

> An oddly common exchange
>
> "So you get all this amazing stuff with @reasonml and ReasonReact that saves you time and lets you sleep soundly at night."
>
> "Yeah but you gotta write `ReasonReact.string` to put text into components I'm out fam"


## Rust

I'm fully aware that I'm drinking the Kool-Aid, but I *really* want to like [Rust](https://www.rust-lang.org/en-US/). I really like the syntax, but the language concepts just haven't clicked with me yet. It's a pretty big shift from web development so I think I just need to stick with it, but it's pretty tough to wrap my head around. There's an Elm-inspired UI crate called [Relm](https://github.com/antoyo/relm) that looks really promising and I think I'll probably try to focus on that if I give Rust another shot.

## Other Stuff?

Want to convince me I'm wrong about any of these? Or have something I should be playing with? Leave me a comment or hit me up on [Twitter](https://twitter.com/THEseanwalsh)!

