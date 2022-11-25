# be-detail-oriented

Make the fieldset and possibly other built-in elements expandable, similar to the detail element.

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

