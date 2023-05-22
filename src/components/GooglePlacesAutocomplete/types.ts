import type { BottomSheetSelectProps } from '../BottomSheetSelect/types';
import type { BottomSheetTextInputProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput';
import type { BottomSheetOptionType } from '../BottomSheetSelect/types';
import type React from 'react';

export type GooglePlacesAutocompleteVisualizationType = 'bottom-sheet' | 'list';

export interface GooglePlacesAutocompleteProps
  extends Omit<BottomSheetSelectProps, 'children' | 'options'> {
  apiKey: string;
  searchPlaceholder?: string;
  // This function is useful to modify the search parameter key.
  queryFn?: (arg: { term: string }) => Record<string, string>;
  visualization?: GooglePlacesAutocompleteVisualizationType;
  delay?: number;
  endpointType?: GooglePlacesEndpointsType;
}

export interface SearchInputProps
  extends Omit<BottomSheetTextInputProps, 'onChange'> {
  onChange?: (text: string) => void;
  onClear?: () => void;
  defaultValue?: string;
  component?: React.FC;
}

export interface SearchInputMethods {
  setTerm: (term: string) => void;
}

export type GooglePlacesEndpointsType = 'textSearch' | 'autocomplete';

export type EndpointType = {
  [key in GooglePlacesEndpointsType]: {
    url: string;
    transform: (response?: any) => BottomSheetOptionType[];
  };
};
