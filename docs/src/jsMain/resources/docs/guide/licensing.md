---
sidebar_position: 4
title: Licensing
---

# Licensing

## This wrapper

`ktjs-anser` is released under the **MIT** licence. The full text is in
[`LICENSE`](https://github.com/shijianjs/ktjs-anser/blob/main/LICENSE) at the repository root.

## anser

anser is also MIT licensed:

```
The MIT License (MIT)

Copyright (c) 2012-25 Ionică Bizău <bizauionica@gmail.com> (https://ionicabizau.net)
```

Its source and licence live in [IonicaBizau/anser](https://github.com/IonicaBizau/anser). anser has no
separate commercial edition and no usage restriction to declare — the whole package, including the
palette and the converters, is covered by that MIT grant.

## npm dependencies

The npm package anser ships with is the only runtime dependency the wrapper adds. Gradle assembles the
JavaScript bundle from `package.json`, so `npm ls` in a consuming project shows exactly the anser
version this module was built against.

## What that means for you

| Question | Answer |
| --- | --- |
| Can I use this in a closed-source product? | Yes, MIT permits it; keep the copyright notice. |
| Must I publish my changes? | No. |
| Are there parts of anser excluded? | No. Everything anser exports is wrapped. |
