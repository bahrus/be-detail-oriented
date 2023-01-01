import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeDetailOriented extends EventTarget {
    #plusMinus;
    async defineExpander(pp, mold) {
        import('be-definitive/be-definitive.js');
        import('be-importing/be-importing.js');
        const { summaryElSelector, self, expanderPlacement, plusMinusFrom } = pp;
        const summaryEl = self.querySelector(summaryElSelector);
        if (summaryEl === null)
            throw { msg: '404', summaryElSelector };
        let plusMinus = summaryEl.querySelector('plus-minus');
        let alreadyExisted = true;
        if (plusMinus === null) {
            plusMinus = document.createElement('plus-minus');
            alreadyExisted = false;
        }
        if (customElements.get('plus-minus') === undefined) {
            plusMinus.setAttribute('be-importing', plusMinusFrom);
        }
        if (self.id === '') {
            self.id = crypto.randomUUID();
        }
        plusMinus.setAttribute('aria-owns', self.id);
        this.#plusMinus = new WeakRef(plusMinus);
        if (!alreadyExisted) {
            const verb = expanderPlacement === 'left' ? 'prepend' : 'appendChild';
            summaryEl[verb](plusMinus);
        }
        const { inject } = await import('be-decorated/inject.js');
        inject({ mold, tbdSlots: {
                of: plusMinus
            } });
        return mold;
    }
    toggleExpander(pp, e) {
        const open = e?.detail.value;
        return {
            open
        };
    }
    modifyVisibility(pp) {
        const { self, open, summaryElSelector, openCss, openPart } = pp;
        if (this.#plusMinus !== undefined) {
            const plusMinus = this.#plusMinus.deref();
            if (plusMinus !== undefined) {
                plusMinus.expanded = open;
            }
        }
        const { children } = self;
        const summaryEl = self.querySelector(summaryElSelector);
        for (const child of children) {
            if (child === summaryEl)
                continue;
            if (open) {
                child.hidden = false;
            }
            else {
                child.hidden = 'until-found';
            }
        }
        const verb = open ? 'add' : 'remove';
        self.classList[verb](openCss);
        self.part[verb](openPart);
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
            virtualProps: ['summaryElSelector', 'expanderPlacement', 'plusMinusFrom', 'openCss', 'openPart'],
            proxyPropDefaults: {
                open: false,
                openCss: 'detail-oriented-open',
                openPart: 'detail-oriented-open',
                expanderPlacement: 'left',
                summaryElSelector: '*',
                plusMinusFrom: 'plus-minus/plus-minus.html'
            },
            emitEvents: ['open']
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
            },
            modifyVisibility: {
                ifKeyIn: ['open']
            }
        }
    },
    complexPropDefaults: {
        controller: BeDetailOriented
    }
});
register(ifWantsToBe, upgrade, tagName);
