import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';

export interface EndUserProps extends IBE{
    summaryElSelector?: string,
    expanderPlacement?: 'left' | 'right',
    plusMinusFrom?: string,
    open?: boolean,
    openCss?: string,
    openPart?: string,
}

export interface AllProps extends EndUserProps {

}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];

export type ProPOA = Promise<POA>;

export interface Actions{
    defineExpander(self: this): ProPOA;

    toggleExpander(self: this, e?: CustomEvent): PAP;

    modifyVisibility(self: this): void;
}

