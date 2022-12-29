import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
const templLookup = new Map();
export class BeDetailOriented extends EventTarget {
    async defineExpander(pp, mold) {
        import('be-definitive/be-definitive.js');
        import('be-importing/be-importing.js');
        const { summaryElSelector, self, expanderPlacement } = pp;
        if (self.id === '') {
            self.id = crypto.randomUUID();
        }
        const summaryEl = self.querySelector(summaryElSelector);
        if (summaryEl === null)
            throw { msg: '404', summaryElSelector };
        const templ = this.#sanitize(pp);
        const fragment = templ.content.cloneNode(true);
        const plusMinus = fragment.querySelector('plus-minus');
        if (plusMinus !== null) {
            plusMinus.setAttribute('be-importing', "plus-minus/plus-minus.html");
        }
        const instance = fragment.firstElementChild;
        instance.setAttribute('aria-owns', self.id);
        const verb = expanderPlacement === 'left' ? 'prepend' : 'appendChild';
        summaryEl[verb](instance);
        const { inject } = await import('be-decorated/inject.js');
        inject({ mold, tbdSlots: {
                of: instance
            } });
        return mold;
    }
    #sanitize(pp) {
        let { expanderMarkup } = pp;
        if (expanderMarkup instanceof HTMLTemplateElement)
            return expanderMarkup;
        if (typeof Sanitizer !== undefined) {
            const sanitizer = new Sanitizer({
                allowCustomElements: true,
                allowElements: ['plus-minus'],
                allowAttributes: {
                    "data-be-importing": ["plus-minus"]
                }
            });
            expanderMarkup = sanitizer.sanitizeFor('template', expanderMarkup);
        }
        else {
            const templ = document.createElement('template');
            templ.innerHTML = expanderMarkup;
            expanderMarkup = templ;
        }
        return expanderMarkup;
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
            virtualProps: ['expanderMarkup', 'summaryElSelector', 'expanderPlacement'],
            proxyPropDefaults: {
                expanderMarkup: String.raw `<plus-minus be-importing=plus-minus/plus-minus.html></plus-minus>`,
                expanderPlacement: 'left',
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
                            doInit: true,
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
