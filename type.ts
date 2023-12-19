import type { Key, ReactNode } from 'react';

export type OffscreenMode = 'visible' | 'hidden';

export interface IProps {
  mode: OffscreenMode;
  children: ReactNode;
}

export type TNodesScrollPosition = [Element, { x: number; y: number }];

export type TOutlet = {
  scrollOffset: number;
  key: Key;
  pathname: string;
  outlet: React.ReactElement | null;
  cacheScrollNodes?: TNodesScrollPosition[];
  compRef?: HTMLDivElement | null;
};

export type TOffScreen = {
  action: string;
  location: {
    pathname: string;
    key: Key;
  };
  outlet: React.ReactElement | null;
};
