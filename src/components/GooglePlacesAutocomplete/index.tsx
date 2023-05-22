import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type {
  ClosableType,
  PlaceAutocompleteResponseI,
  TextSearchResponseI,
} from '../../types';
import BottomSheetSelect from '../BottomSheetSelect';
import type {
  GooglePlacesAutocompleteProps,
  SearchInputMethods,
} from './types';
import styles from './styles';
import useDebounceCallback from '../../hooks/useDebounceCallback';
import useFetch from '../../hooks/useFetch';
import type { BottomSheetOptionType } from '../BottomSheetSelect/types';
import SearchInput from './SearchInput';
import { endpoints } from './endpoints';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import SelectItem from '../BottomSheetSelect/SelectItem';
import Conditional from '../Conditional';
import PoweredByGoogle from './PoweredByGoogle';

const GooglePlacesAutocomplete: FC<GooglePlacesAutocompleteProps> = ({
  searchPlaceholder = 'Search ',
  endpointType = 'autocomplete',
  visualization = 'bottom-sheet',
  delay = 500,
  queryFn,
  onChange,
  apiKey,
  ...rest
}) => {
  const [results, setResults] = useState<BottomSheetOptionType[]>([]);

  const searchInputRef = useRef<SearchInputMethods>(null);

  const { isLoading, request } = useFetch<
    TextSearchResponseI | PlaceAutocompleteResponseI
  >();

  const getPlaces = useDebounceCallback(async (value: string) => {
    const endpoint = endpoints[endpointType];
    if (value === '') {
      setResults([]);
      return;
    }
    const params = {
      input: value,
      query: value,
      key: apiKey,
      ...(queryFn ? queryFn({ term: value }) : {}),
    };

    const searchParams = new URLSearchParams(params);

    const url = `${endpoint.url}?${searchParams}`;

    const resp = await request.get(url);

    setResults(endpoint.transform(resp));
  }, delay);

  const renderFooter = useCallback(
    ({ onClose }: ClosableType) => {
      return (
        <TouchableOpacity style={styles.button} onPress={onClose}>
          {isLoading ? (
            <View style={styles.buttonContainerLoader}>
              <ActivityIndicator color="white" />
            </View>
          ) : (
            <Text style={styles.buttonText}>Save</Text>
          )}
        </TouchableOpacity>
      );
    },
    [isLoading]
  );

  const handleClear = useCallback(() => {
    setResults([]);
    onChange?.(null);
  }, [onChange]);

  const renderHeader = useCallback(() => {
    return (
      <SearchInput
        onChange={getPlaces}
        placeholder={searchPlaceholder}
        onClear={handleClear}
        defaultValue={rest.selectedOption?.label ?? ''}
        component={BottomSheetTextInput}
      />
    );
  }, [getPlaces, searchPlaceholder, handleClear, rest.selectedOption]);

  const mappedResults: BottomSheetOptionType[] = useMemo(
    () => [...results],
    [results]
  );

  const renderListItem: ListRenderItem<BottomSheetOptionType> = useCallback(
    ({ item: option }) => {
      return (
        <SelectItem
          label={option.label}
          style={styles.listItem}
          onPress={() => {
            onChange?.(option);
            setResults([]);
            searchInputRef.current?.setTerm(option.label);
          }}
        />
      );
    },
    [onChange]
  );

  return (
    <>
      {visualization === 'bottom-sheet' ? (
        <BottomSheetSelect
          handleStyle={styles.handleStyle}
          _container={{
            style: styles.bottomSheetContainer,
          }}
          options={results}
          onChange={onChange}
          renderFooter={renderFooter}
          renderHeader={renderHeader}
          {...rest}
        />
      ) : (
        <>
          <SearchInput
            onChange={getPlaces}
            ref={searchInputRef}
            defaultValue={rest.selectedOption?.label ?? ''}
            placeholder={searchPlaceholder}
            onClear={handleClear}
          />

          <FlatList data={mappedResults} renderItem={renderListItem} />
          <Conditional value={mappedResults.length > 0}>
            <PoweredByGoogle />
          </Conditional>
        </>
      )}
    </>
  );
};

export default GooglePlacesAutocomplete;
