import type {
  PlaceAutocompleteResponseI,
  TextSearchResponseI,
} from '../../types';
import type { BottomSheetOptionType } from '../BottomSheetSelect/types';
import type { EndpointType } from './types';

export const endpoints: EndpointType = {
  textSearch: {
    url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
    transform(response?: TextSearchResponseI): BottomSheetOptionType[] {
      return (
        response?.results?.map((result) => ({
          label: result.formatted_address,
          value: result.place_id,
          extra: result,
        })) ?? []
      );
    },
  },
  autocomplete: {
    url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
    transform(response?: PlaceAutocompleteResponseI): BottomSheetOptionType[] {
      return (
        response?.predictions?.map((prediction) => ({
          label: prediction.description,
          value: prediction.place_id,
          extra: prediction,
        })) ?? []
      );
    },
  },
};
