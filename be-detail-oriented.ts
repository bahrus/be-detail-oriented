import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Actions, VirtualProps, Proxy, PP, ProxyProps, PA, PPE} from './types';
import {register} from 'be-hive/register.js';

const templLookup = new Map<string, HTMLTemplateElement>();

export class BeDetailOriented extends EventTarget implements Actions {
    async defineExpander(pp: PP, mold: PPE): Promise<PPE> {
        import('be-definitive/be-definitive.js');
        import('be-importing/be-importing.js');
        const {summaryElSelector, self} = pp;
        if(self.id === ''){
            self.id = crypto.randomUUID();
        }
        const summaryEl = self.querySelector(summaryElSelector!);
        if(summaryEl === null) throw {msg: '404', summaryElSelector};
        const {expanderMarkup} = pp;
        const fragment = (new DOMParser() as any).parseFromString(expanderMarkup, 'text/html', {
            includeShadowRoots: true
        }) as Document;
        const instance = fragment.body.firstChild as Element;
        instance.setAttribute('aria-owns', self.id);
        summaryEl.appendChild(instance!);
        const {inject} = await import('be-decorated/inject.js');
        inject({mold, tbdSlots: {
            of: instance
        }});
        return mold;
    }

    toggleExpander(pp: ProxyProps, e?: CustomEvent): void {
        const {self, summaryElSelector} = pp;
        const {children} = self;
        const val = e?.detail.value;
        const summaryEl = self.querySelector(summaryElSelector!);
        for(const child of children){
            if(child === summaryEl) continue;
            if(val){
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
            virtualProps: ['expanderMarkup', 'summaryElSelector'],
            proxyPropDefaults: {
                expanderMarkup: String.raw `<plus-minus be-importing=plus-minus/plus-minus.html></plus-minus>`,
                summaryElSelector: '*',
            }
        },
        actions:{
            defineExpander: {
                ifAllOf: ['expanderMarkup', 'summaryElSelector'],
                returnObjMold: [
                    {resolved: true},
                    {toggleExpander: {
                        on: 'expanded-changed',
                        of: "tbd",
                        doInit: true,
                    }}
                ]
            }
        }
    },
    complexPropDefaults:{
        controller: BeDetailOriented
    }
});
register(ifWantsToBe, upgrade, tagName);

