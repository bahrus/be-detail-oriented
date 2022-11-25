import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
const templLookup = new Map();
let defined = false;
export class BeDetailOriented extends EventTarget {
    async defineExpander(pp, mold) {
        const { summaryElSelector, self } = pp;
        const summaryEl = self.querySelector(summaryElSelector);
        if (summaryEl === null)
            throw { msg: '404', summaryElSelector };
        let instance;
        if (!defined) {
            const { expanderMarkup } = pp;
            const fragment = new DOMParser().parseFromString(expanderMarkup, 'text/html', {
                includeShadowRoots: true
            });
            instance = fragment.body.firstChild;
            import('be-definitive/be-definitive.js');
            defined = true;
        }
        else {
            instance = document.createElement('be-detail-oriented-toggle');
        }
        summaryEl.appendChild(instance);
        const { inject } = await import('be-decorated/inject.js');
        inject({ mold, tbdSlots: {
                of: instance
            } });
        return mold;
    }
    toggleExpander(pp, e) {
        const { self, summaryElSelector } = pp;
        const { children } = self;
        const val = e?.detail.value;
        const summaryEl = self.querySelector(summaryElSelector);
        for (const child of children) {
            if (child === summaryEl)
                continue;
            if (val) {
                child.hidden = false;
            }
            else {
                child.hidden = 'until-found';
            }
        }
    }
}
const tagName = 'be-detail-oriented';
const ifWantsToBe = 'detail-oriented';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            virtualProps: ['expanderMarkup', 'summaryElSelector'],
            proxyPropDefaults: {
                expanderMarkup: String.raw `
<be-detail-oriented-toggle t-a-i-l-b be-definitive='{
    "config": {
        "propDefaults": {
            "expanded": false,
            "collapsed": true,
            "hydratingTransform": {
                "form": [{}, {
                    "click": {
                        "prop": "expanded",
                        "toggleProp": true
                    }
                }]
            },
            "transform": {
                "expandP": {
                    "hidden": "expanded"
                },
                "collapseP": {
                    "hidden": "collapsed"
                }
            }
        },
        "propInfo": {
            "expanded": {
                "notify": {
                    "negateTo": "collapsed",
                    "dispatch": true
                }
            }
        }
    }
}'
>
    <template shadowroot=open>
    <form>
        <button type=button name=expand part="expand button" aria-label=Expand>
            <svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-square">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </button>
        <button type=button name=collapse part="collapse button" aria-label=Collapse hidden>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
                <g>
                    <line fill="none" stroke="#000000" stroke-width="4" stroke-miterlimit="10" x1="14" y1="31" x2="50" y2="31"/>
                </g>
                <rect x="1" y="1" fill="none" stroke="#000000" stroke-width="6" stroke-miterlimit="10" width="62" height="62"/>
            </svg>
        </button>
    </form>
    <style adopt>
        form {
            display: inline;
        }
        button {
            background-color: transparent;
            background-repeat: no-repeat;
            border: none;
            cursor: pointer;
            overflow: hidden;
            outline: none;
            margin: 0;
            padding: 0;
            position: relative;
            top: 2px;
        }
        :host{
            margin: 0;
            padding: 0;
        }
    </style>
   </template>
</be-detail-oriented-toggle>            

                `,
                summaryElSelector: '*',
            }
        },
        actions: {
            defineExpander: {
                ifAllOf: ['expanderMarkup', 'summaryElSelector'],
                returnObjMold: [
                    { resolved: true },
                    { toggleExpander: {
                            on: 'expanded-changed',
                            of: "tbd",
                            //doInit: true,
                        } }
                ]
            }
        }
    },
    complexPropDefaults: {
        controller: BeDetailOriented
    }
});
register(ifWantsToBe, upgrade, tagName);
