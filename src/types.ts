import type React from 'react';
import type { ReactNode } from 'react';

export type FCWithChildren<T = {}> = React.FC<T & { children?: ReactNode }>;

export type ClosableType = {
  onClose: () => void;
  onOpen: () => void;
};
