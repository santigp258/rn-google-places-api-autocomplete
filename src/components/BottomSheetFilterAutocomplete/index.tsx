import React, { FC, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import type { ClosableType } from '../../types';
import BottomSheetSelect from '../BottomSheetSelect';
import type { BottomSheetFilterAutocompleteProps } from './types';
import styles from './styles';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import useDebounceCallback from '../../hooks/useDebounceCallback';
import useFetch from '../../hooks/useFetch';

const endpoints = {
  textSearch: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
};

export interface SearchInputProps {
  onChange?: (text: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ onChange }) => {
  const [currentTerm, setCurrentTerm] = useState('');

  const handleChangeText = (text: string) => {
    setCurrentTerm(text);
    onChange?.(text);
  };

  return (
    <View style={styles.inputContainer}>
      <BottomSheetTextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={handleChangeText}
        value={currentTerm}
      />
    </View>
  );
};

const BottomSheetFilterAutocomplete: FC<BottomSheetFilterAutocompleteProps> = ({
  placeholder = 'Choose Options',
  options = [],
  searchPlaceholder = 'Search ',
  selectedOptions = [],
  onChange,
  apiKey,
}) => {
  const [results, setResults] = useState(options);

  const { isLoading, request } = useFetch();

  const getPlaces = useDebounceCallback(async (value: string) => {
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
          <Text style={styles.buttonText}>
            {isLoading ? 'loading' : 'Save'}
          </Text>
        </TouchableOpacity>
      );
    },
    [isLoading]
  );

  const renderHeader = useCallback(
    (args: ClosableType) => {
      return <SearchInput onChange={getPlaces} />;
    },
    [getPlaces]
  );
  return (
    <>
      <BottomSheetSelect
        handleStyle={styles.handleStyle}
        _container={{
          style: styles.bottomSheetContainer,
        }}
        options={results}
        onChange={onChange}
        renderFooter={renderFooter}
        renderHeader={renderHeader}
      />
    </>
  );
};

export default BottomSheetFilterAutocomplete;
