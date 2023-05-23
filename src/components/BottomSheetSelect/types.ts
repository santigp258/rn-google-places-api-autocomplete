import type {
  FlatListProps,
  GestureResponderEvent,
  ImageProps,
  TextProps,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';
import type { BottomSheetFilterProps } from '../BottomSheetFilter/types';
import type { ClosableType, GooglePoweredI } from '../../types';
import type { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import type { ReactNode } from 'react';

export interface SelectButtonProps extends TouchableOpacityProps {
  _text?: TextProps;
  _image?: Partial<ImageProps>;
}

export interface SelectItemProps extends TouchableOpacityProps {
  label?: string;
  isSelected?: boolean;
  isPreview?: boolean;
  _view?: ViewProps;
}

export type BottomSheetOptionType<T = Record<any, any>> = {
  label: string;
  value: string | number | null;
  onPress?: (
    option: BottomSheetOptionType,
    options: BottomSheetOptionType[],
    event: GestureResponderEvent
  ) => void;
  extra?: T;
};

export interface BottomSheetSelectFlatlistI
  extends Omit<FlatListProps<BottomSheetOptionType>, 'data'> {}

export interface BottomSheetSelectProps
  extends Omit<BottomSheetFilterProps, 'onChange'>,
    GooglePoweredI {
  selectedOption?: BottomSheetOptionType | null;
  hasDefaultOption?: boolean;
  options?: BottomSheetOptionType[];
  placeholder?: string;
  renderHeader?: (args: ClosableType) => ReactNode;
  onChange?: (option: BottomSheetOptionType | null) => void;
  showPoweredByGoogle?: boolean;
  _container?: Omit<BottomSheetViewProps, 'children'>;
  _flatlist?: Partial<BottomSheetSelectFlatlistI>;
  _selectButton?: SelectButtonProps;
}
