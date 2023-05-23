import type {
  BottomSheetOptionType,
  BottomSheetSelectProps,
} from '../BottomSheetSelect/types';
import type { BottomSheetTextInputProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput';
import type React from 'react';
import type { ReactNode } from 'react';
import type { GooglePoweredI } from '../../types';
import type { FlatListProps } from 'react-native';

export type GooglePlacesAutocompleteVisualizationType = 'bottom-sheet' | 'list';

export interface ListI {
  _flatlist: Omit<FlatListProps<BottomSheetOptionType>, 'data'>;
  _search?: SearchInputProps;
}

export interface BottomSheetI
  extends Omit<
    BottomSheetSelectProps,
    'children' | 'options' | 'selectedOption' | 'onChange'
  > {
  _search?: SearchInputProps;
}

export interface GooglePlacesAutocompleteProps
  extends Pick<
      BottomSheetSelectProps,
      'selectedOption' | 'onChange' | 'renderFooter'
    >,
    GooglePoweredI {
  apiKey: string;
  searchPlaceholder?: string;
  // This function is useful to modify the search parameter key.
  query?:
    | Record<string, string>
    | ((arg: { term: string }) => Record<string, string>);

  visualization?: GooglePlacesAutocompleteVisualizationType;
  delay?: number;
  endpointType?: GooglePlacesEndpointsType | string;
  endpoints?: EndpointType;
  _bottomSheet?: BottomSheetI;
  _list?: ListI;
  renderEmptyComponent?: React.ComponentType<any> | React.ReactElement;
}

export interface SearchInputProps
  extends Omit<BottomSheetTextInputProps, 'onChange'> {
  onChange?: (text: string) => void;
  onClear?: () => void;
  defaultValue?: string;
  component?: React.FC;
  renderClearButton?: (args: { onClear: () => void }) => ReactNode;
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
