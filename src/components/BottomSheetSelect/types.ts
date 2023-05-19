import type {
  GestureResponderEvent,
  TouchableOpacityProps,
} from 'react-native';
import type { BottomSheetFilterProps } from '../BottomSheetFilter/types';

export interface SelectButtonProps extends TouchableOpacityProps {}

export interface SelectItemProps extends TouchableOpacityProps {
  label: string;
  isSelected?: boolean;
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
  selectedOption?: BottomSheetOptionType;
  hasDefaultOption?: boolean;
  options?: BottomSheetOptionType[];
  placeholder?: string;
  onChange?: (option: BottomSheetOptionType | null) => void;
}
