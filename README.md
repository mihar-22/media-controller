# Media Controller

**⚠️ DEMONSTRATION PURPOSES ONLY - DON'T USE IN PRODUCTION!**

This project takes inspiration from [media-chrome][media-chrome] in designing a lightweight
solution for enabling a custom media player UI to built purely with markup and CSS that
works with any `HTMLMediaElement` spec-compliant player. The difference is `media-chrome` uses
a `MutationObserver` approach in which the `media` element is injected into UI components,
whereas this library abstracts that functionality to a controller (`media-controller`) and relies
on context properties and events to communicate with it.

## Demo

```bash
$: git clone git@github.com:mihar-22/media-controller.git

$: cd media-controller

$: npm i

$: npm start
```

[media-chrome]: https://github.com/muxinc/media-chrome
