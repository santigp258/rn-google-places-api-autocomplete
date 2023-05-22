import type { BottomSheetSelectProps } from '../BottomSheetSelect/types';
import type { BottomSheetTextInputProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput';

export interface BottomSheetFilterAutocompleteProps
  extends Omit<BottomSheetSelectProps, 'children' | 'options'> {
  apiKey: string;
  searchPlaceholder?: string;
}

export interface SearchInputProps
  extends Omit<BottomSheetTextInputProps, 'onChange'> {
  onChange?: (text: string) => void;
  onClear?: () => void;
}
