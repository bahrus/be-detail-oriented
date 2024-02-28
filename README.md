# be-detail-oriented

Make the fieldset and possibly other built-in elements expandable, similar to the details element.

[![Playwright Tests](https://github.com/bahrus/be-detail-oriented/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-detail-oriented/actions/workflows/CI.yml)
[![NPM version](https://badge.fury.io/js/be-detail-oriented.png)](http://badge.fury.io/js/be-detail-oriented)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-detail-oriented?style=for-the-badge)](https://bundlephobia.com/result?p=be-detail-oriented)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-detail-oriented?compression=gzip">

## Syntax

```html
<form>
    <fieldset be-detail-oriented>
        <legend>legend content</legend>
        <div>
            <label>test</label><input>
        </div>
    </fieldset>
</form>
```

## [Demo](https://codepen.io/bahrus/pen/gOjMOGj)

## Avoiding FOUC

If not using be-detail-oriented as a template instantiation plugin, to avoid FOUC, set the hidden attribute to elements inside reflecting the initial state:

```html
<form>
    <fieldset be-detail-oriented>
        <legend>legend content</legend>
        <div hidden=until-found>
            <label>test</label><input>
        </div>
    </fieldset>
</form>
```

> **Note**:  Chrome (at least) seems to have unexpected behavior when it comes to setting hidden programmatically.  In particular, not wrapping inputs and labels inside a div can prevent the hidden attribute from affecting the display, at least if it's set programmatically.  This buggy (?) behavior can be observed in this [demo](https://codepen.io/bahrus/pen/BaVxWzj).


## Customizability

A ~~number of~~ configuration setting~~s~~ ~~are~~ is available to allow customizing how the enhancement goes about making itself expandable.

```html
<form>
    <fieldset be-detail-oriented>
        <legend>legend content</legend>
        <div>
            <label>test</label><input>
        </div>
    </fieldset>
</form>
```

is shorthand for:

```html
<form>
    <fieldset be-detail-oriented='{
        "summaryElSelector": "*"
    }'>
        <legend>legend content</legend>
        <div>
            <label>test</label><input>
        </div>
    </fieldset>
</form>
```

Meaning, by default, the decorator selects the first child element it finds within, and appends the plus-minus web component to it, and hides the rest.

This web component relies on Declarative shadow DOM.

## Viewing Locally

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/dev in a modern browser.

## Importing in ES Modules:

```JavaScript
import 'be-detail-oriented/be-detail-oriented.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-detail-oriented';
</script>
```

