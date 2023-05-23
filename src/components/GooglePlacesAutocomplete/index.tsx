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
import { endpoints as defaultEndpoints } from './endpoints';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import SelectItem from '../BottomSheetSelect/SelectItem';
import Conditional from '../Conditional';
import PoweredByGoogle from './PoweredByGoogle';

const GooglePlacesAutocomplete: FC<GooglePlacesAutocompleteProps> = ({
  searchPlaceholder = 'Search ',
  endpointType = 'autocomplete',
  visualization = 'bottom-sheet',
  delay = 500,
  query,
  endpoints: endpointsProp,
  onChange,
  apiKey,
  selectedOption,
  renderPoweredComponent,
  showPoweredByGoogle = true,
  _bottomSheet,
  _list,
  renderFooter: renderFooterProp,
  renderEmptyComponent,
}) => {
  const [results, setResults] = useState<BottomSheetOptionType[]>([]);

  const searchInputRef = useRef<SearchInputMethods>(null);

  const { isLoading, request } = useFetch<
    TextSearchResponseI | PlaceAutocompleteResponseI
  >();

  const endpoints = useMemo(
    () => ({ ...defaultEndpoints, ...endpointsProp }),
    [endpointsProp]
  );

  const getPlaces = useDebounceCallback(async (value: string) => {
    const endpoint = endpoints[endpointType as keyof typeof endpoints];

    if (!endpoint) {
      return console.error(
        `Endpoint ${endpointType} no correspond with supported endpoints. Supported endpoints: ${Object.keys(
          endpoints
        ).join(',')}`
      );
    }
    if (value === '') {
      setResults([]);
      return;
    }
    const params = {
      input: value,
      query: value,
      key: apiKey,
      ...(query
        ? typeof query === 'function'
          ? query({ term: value })
          : query
        : {}),
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
        defaultValue={
          // ignore N/A option as default value
          selectedOption?.value ? selectedOption?.label : ''
        }
        component={BottomSheetTextInput}
        {..._bottomSheet?._search}
        onChange={getPlaces}
        placeholder={searchPlaceholder}
        onClear={handleClear}
      />
    );
  }, [
    _bottomSheet?._search,
    getPlaces,
    searchPlaceholder,
    handleClear,
    selectedOption,
  ]);

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
          renderFooter={renderFooterProp ?? renderFooter}
          {..._bottomSheet}
          options={results}
          onChange={onChange}
          selectedOption={selectedOption}
          renderHeader={renderHeader}
          showPoweredByGoogle={showPoweredByGoogle}
          renderPoweredComponent={renderPoweredComponent}
          _flatlist={{
            ..._bottomSheet?._flatlist,
            ListEmptyComponent:
              _bottomSheet?._flatlist?.ListEmptyComponent ??
              renderEmptyComponent,
          }}
          _container={{
            ..._bottomSheet?._container,
            style: [
              styles.bottomSheetContainer,
              _bottomSheet?._container?.style,
            ],
          }}
        />
      ) : (
        <>
          <SearchInput
            defaultValue={selectedOption?.label ?? ''}
            placeholder={searchPlaceholder}
            {..._list?._search}
            onChange={getPlaces}
            ref={searchInputRef}
            onClear={handleClear}
          />

          <FlatList
            renderItem={renderListItem}
            {..._list?._flatlist}
            ListEmptyComponent={
              _list?._flatlist?.ListEmptyComponent ?? renderEmptyComponent
            }
            data={mappedResults}
          />
          <Conditional value={mappedResults.length > 0 && showPoweredByGoogle}>
            {renderPoweredComponent ? (
              renderPoweredComponent()
            ) : (
              <PoweredByGoogle />
            )}
          </Conditional>
        </>
      )}
    </>
  );
};

export default GooglePlacesAutocomplete;
