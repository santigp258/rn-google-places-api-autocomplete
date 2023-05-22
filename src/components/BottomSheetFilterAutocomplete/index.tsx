import React, { FC, useCallback, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import type { ClosableType, TextSearchResponseI } from '../../types';
import BottomSheetSelect from '../BottomSheetSelect';
import type { BottomSheetFilterAutocompleteProps } from './types';
import styles from './styles';
import useDebounceCallback from '../../hooks/useDebounceCallback';
import useFetch from '../../hooks/useFetch';
import type { BottomSheetOptionType } from '../BottomSheetSelect/types';
import SearchInput from './SearchInput';

const endpoints = {
  textSearch: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
};

const BottomSheetFilterAutocomplete: FC<
  Omit<BottomSheetFilterAutocompleteProps, 'children'>
> = ({ searchPlaceholder = 'Search ', onChange, apiKey, ...rest }) => {
  const [results, setResults] = useState<BottomSheetOptionType[]>([]);

  const { isLoading, request } = useFetch<TextSearchResponseI>();

  const getPlaces = useDebounceCallback(async (value: string) => {
    if (value === '') {
      setResults([]);
      return;
    }
    const params = {
      query: value,
      key: apiKey,
    };

    const searchParams = new URLSearchParams(params);

    const url = `${endpoints.textSearch}?${searchParams}`;

    const resp = await request.get(url);

    if (resp?.results) {
      setResults(
        resp.results.map((result) => ({
          value: result.place_id,
          label: result.formatted_address,
        }))
      );
    }
  }, 500);

  const renderFooter = useCallback(
    ({ onClose }: ClosableType) => {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onClose?.();
          }}
        >
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
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <SearchInput
        onChange={getPlaces}
        placeholder={searchPlaceholder}
        onClear={handleClear}
      />
    );
  }, [getPlaces, searchPlaceholder, handleClear]);

  return (
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
  );
};

export default BottomSheetFilterAutocomplete;
