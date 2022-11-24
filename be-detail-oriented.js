import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
const templLookup = new Map();
export class BeDetailOriented extends EventTarget {
    addExpander(pp, mold) {
        const { summaryElSelector, self, expanderMarkup } = pp;
        let templ = templLookup.get(expanderMarkup);
        if (templ === undefined) {
            templ = document.createElement('template');
            templ.innerHTML = expanderMarkup;
            templLookup.set(expanderMarkup, templ);
        }
        const summaryEl = self.querySelector(summaryElSelector);
        if (summaryEl === null)
            throw { msg: '404', summaryElSelector };
        summaryEl.appendChild(templ.content.cloneNode(true));
        const { children } = self;
        for (const child of children) {
            if (child === summaryEl)
                continue;
            //child.setAttribute('hidden', 'until-found');
            child.hidden = 'until-found';
        }
        return mold;
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
                <button aria-label=Expand>
                <svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-square">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                </button>`,
                summaryElSelector: '*',
            }
        },
        actions: {
            addExpander: {
                ifAllOf: ['expanderMarkup', 'summaryElSelector'],
            }
        }
    },
    complexPropDefaults: {
        controller: BeDetailOriented
    }
});
register(ifWantsToBe, upgrade, tagName);
