import {BeDecoratedProps, MinimalProxy, EventConfigs} from 'be-decorated/types';
import {MatchRHS, Scope} from 'trans-render/lib/types';

export interface EndUserProps {
    summaryElSelector?: string,
    expanderPlacement?: 'left' | 'right',
    plusMinusFrom?: string,
    open?: boolean,
    openCss?: string,
    openPart?: string,
}

export interface VirtualProps extends EndUserProps, MinimalProxy {

}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export type PA = Partial<PP>;

export type PPE = [PA | undefined, EventConfigs<Proxy, Actions>];

export interface Actions{
    defineExpander(pp: PP, returnObjMold: PPE): Promise<PPE>;

    toggleExpander(pp: PP, e?: CustomEvent): PA;

    modifyVisibility(pp: PP): void;
}

