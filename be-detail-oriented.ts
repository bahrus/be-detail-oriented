import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Actions, VirtualProps, Proxy, PP, ProxyProps, PA, PPE} from './types';
import {register} from 'be-hive/register.js';


export class BeDetailOriented extends EventTarget implements Actions {
    async defineExpander(pp: PP, mold: PPE): Promise<PPE> {
        import('be-definitive/be-definitive.js');
        import('be-importing/be-importing.js');
        const {summaryElSelector, self, expanderPlacement, plusMinusFrom} = pp;

        const summaryEl = self.querySelector(summaryElSelector!);
        if(summaryEl === null) throw {msg: '404', summaryElSelector};
        const plusMinus = document.createElement('plus-minus');
        plusMinus.setAttribute('be-importing', plusMinusFrom!);
        if(self.id === ''){
            self.id = crypto.randomUUID(); 
        }
        plusMinus.setAttribute('aria-owns', self.id);
        const verb = expanderPlacement === 'left' ? 'prepend' : 'appendChild';
        (<any>summaryEl)[verb](plusMinus);
        const {inject} = await import('be-decorated/inject.js');
        inject({mold, tbdSlots: {
            of: plusMinus
        }});
        return mold;
    }


    toggleExpander(pp: ProxyProps, e?: CustomEvent): PA {
        const open = e?.detail.value;
        return {
            open
        }
        
    }

    modifyVisibility(pp: ProxyProps): void {
        const {self, open, summaryElSelector} = pp;
        const {children} = self;
        const summaryEl = self.querySelector(summaryElSelector!);
        for(const child of children){
            if(child === summaryEl) continue;
            if(open){
                (<any>child).hidden = false;
            }else{
                (<any>child).hidden = 'until-found';
            }
            
        } 
    }
}

const tagName = 'be-detail-oriented';
const ifWantsToBe = 'detail-oriented';
const upgrade = '*';

define<Proxy & BeDecoratedProps<Proxy, Actions>, Actions>({
    config: {
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            virtualProps: ['summaryElSelector', 'expanderPlacement', 'plusMinusFrom'],
            proxyPropDefaults: {
                open: false,
                expanderPlacement: 'left',
                summaryElSelector: '*',
                plusMinusFrom: 'plus-minus/plus-minus.html'
            },
            emitEvents: ['open']
        },
        actions:{
            defineExpander: {
                ifAllOf: ['summaryElSelector'],
                returnObjMold: [
                    {resolved: true},
                    {toggleExpander: {
                        on: 'expanded-changed',
                        of: "tbd",
                        doInit: true,
                    }}
                ]
            },
            modifyVisibility: {
                ifKeyIn: ['open']
            }
        }
    },
    complexPropDefaults:{
        controller: BeDetailOriented
    }
});
register(ifWantsToBe, upgrade, tagName);

