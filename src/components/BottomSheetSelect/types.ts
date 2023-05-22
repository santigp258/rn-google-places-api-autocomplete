import type {
  GestureResponderEvent,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';
import type { BottomSheetFilterProps } from '../BottomSheetFilter/types';
import type { ClosableType } from 'rn-google-places-autocomplete';
import type { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import type { ReactNode } from 'react';

export interface SelectButtonProps extends TouchableOpacityProps {}

export interface SelectItemProps extends TouchableOpacityProps {
  label?: string;
  isSelected?: boolean;
  isPreview?: boolean;
  _view?: ViewProps;
}

export type BottomSheetOptionType = {
  label: string;
  value: string | number | null;
  onPress?: (
    option: BottomSheetOptionType,
    options: BottomSheetOptionType[],
    event: GestureResponderEvent
  ) => void;
};

export interface BottomSheetSelectProps
  extends Omit<BottomSheetFilterProps, 'onChange'> {
  selectedOption?: BottomSheetOptionType | null;
  hasDefaultOption?: boolean;
  options?: BottomSheetOptionType[];
  placeholder?: string;
  renderHeader?: (args: ClosableType) => ReactNode;
  onChange?: (option: BottomSheetOptionType | null) => void;
  _container?: Omit<BottomSheetViewProps, 'children'>;
}
