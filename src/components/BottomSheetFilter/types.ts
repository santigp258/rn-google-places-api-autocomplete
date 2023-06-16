import type { ReactNode } from 'react';
import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';
import type { ClosableType } from '../../types';

export type BottomSheetModalPropsI = Omit<BottomSheetModalProps, 'children'>;

export type ClosableWithExtraType = ClosableType & { isLoading?: boolean };

export interface BottomSheetFilterProps
  extends Partial<Omit<BottomSheetModalPropsI, 'children'>> {
  renderButton?: (args: ClosableWithExtraType) => ReactNode;
  renderFooter?: (args: ClosableWithExtraType) => ReactNode;
  children?: ReactNode | ((args: ClosableWithExtraType) => void);
}

export interface BottomSheetFilterI extends ClosableType {}
