import {BeDecoratedProps, MinimalProxy, EventConfigs} from 'be-decorated/types';
import {MatchRHS, Scope} from 'trans-render/lib/types';

export interface EndUserProps {
    expanderMarkup?: string,
    summaryElSelector?: string,
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
    addExpander(pp: PP, returnObjMold: PPE): PPE;
}

