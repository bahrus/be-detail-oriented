import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, ProPOA} from './types';
import {register} from 'be-hive/register.js';

export class BeDetailOriented extends BE<AP, Actions> implements Actions{
    static override get beConfig(){
        return {
            parse: true,
        } as BEConfig;
    }
    #plusMinus: WeakRef<Element> | undefined;
    async defineExpander(self: this): ProPOA {
        import('be-definitive/be-definitive.js');
        import('be-importing/be-importing.js');
        const {summaryElSelector, enhancedElement, expanderPlacement, plusMinusFrom} = self;

        const summaryEl = enhancedElement.querySelector(summaryElSelector!);
        if(summaryEl === null) throw {msg: '404', summaryElSelector};
        let plusMinus = summaryEl.querySelector('plus-minus');
        let alreadyExisted = true;
        if(plusMinus === null){
            plusMinus = document.createElement('plus-minus');  
            alreadyExisted = false;     
        }
        if(customElements.get('plus-minus') === undefined){
            plusMinus.setAttribute('be-importing', plusMinusFrom!);
        }
        
        if(enhancedElement.id === ''){
            enhancedElement.id = crypto.randomUUID(); 
        }
        plusMinus.setAttribute('aria-owns', enhancedElement.id);
        this.#plusMinus = new WeakRef(plusMinus);
        if(!alreadyExisted){
            const verb = expanderPlacement === 'left' ? 'prepend' : 'appendChild';
            (<any>summaryEl)[verb](plusMinus);
        }
        return [{
            resolved: true
        }, {
            toggleExpander: {
                on: 'expanded-changed',
                of: plusMinus,
                doInit: true,
            }
        }]
        // const {inject} = await import('be-decorated/inject.js');
        // inject({mold, tbdSlots: {
        //     of: plusMinus
        // }});
        // return mold;
    }

    toggleExpander(self: this, e?: CustomEvent<any> | undefined): PAP {
        const open = e?.detail.value;
        return {
            open
        }
    }

    modifyVisibility(self: this): void {

        const {enhancedElement, open, summaryElSelector, openCss, openPart} = self;
        if(this.#plusMinus !== undefined){
            const plusMinus = this.#plusMinus.deref();
            if(plusMinus !== undefined){
                (<any>plusMinus).expanded = open;
            }
        }
        const {children} = enhancedElement;
        const summaryEl = enhancedElement.querySelector(summaryElSelector!);
        for(const child of children){
            if(child === summaryEl) continue;
            if(open){
                (<any>child).hidden = false;
            }else{
                (<any>child).hidden = 'until-found';
            }
            
        } 
        const verb = open ? 'add' : 'remove';
        enhancedElement.classList[verb](openCss!);
        enhancedElement.part[verb](openPart!);
    }
}

export interface BeDetailOriented extends AllProps{}

const tagName = 'be-detail-oriented';
const ifWantsToBe = 'detail-oriented';
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config:{
        tagName,
        propDefaults:{
            ...propDefaults
        },
        actions:{

        }
    },
    superclass: BeDetailOriented
});

register(ifWantsToBe, upgrade, tagName);