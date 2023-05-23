import type { ReactNode } from 'react';
import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';
import type { ClosableType } from '../../types';

export type BottomSheetModalPropsI = Omit<BottomSheetModalProps, 'children'>;

export interface BottomSheetFilterProps
  extends Partial<Omit<BottomSheetModalPropsI, 'children'>> {
  renderButton?: (args: ClosableType) => ReactNode;
  renderFooter?: (args: ClosableType) => ReactNode;
  children?: ReactNode | ((args: ClosableType) => void);
}

export interface BottomSheetFilterI extends ClosableType {}
