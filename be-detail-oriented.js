import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeDetailOriented extends EventTarget {
    async defineExpander(pp, mold) {
        import('be-definitive/be-definitive.js');
        import('be-importing/be-importing.js');
        const { summaryElSelector, self, expanderPlacement, plusMinusFrom } = pp;
        const summaryEl = self.querySelector(summaryElSelector);
        if (summaryEl === null)
            throw { msg: '404', summaryElSelector };
        const plusMinus = document.createElement('plus-minus');
        plusMinus.setAttribute('be-importing', plusMinusFrom);
        if (self.id === '') {
            self.id = crypto.randomUUID();
        }
        plusMinus.setAttribute('aria-owns', self.id);
        const verb = expanderPlacement === 'left' ? 'prepend' : 'appendChild';
        summaryEl[verb](plusMinus);
        const { inject } = await import('be-decorated/inject.js');
        inject({ mold, tbdSlots: {
                of: plusMinus
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
            upgrade,
            ifWantsToBe,
            virtualProps: ['summaryElSelector', 'expanderPlacement', 'plusMinusFrom'],
            proxyPropDefaults: {
                expanderPlacement: 'left',
                summaryElSelector: '*',
                plusMinusFrom: 'plus-minus/plus-minus.html'
            }
        },
        actions: {
            defineExpander: {
                ifAllOf: ['summaryElSelector'],
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
