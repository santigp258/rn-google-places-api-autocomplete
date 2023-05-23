import BottomSheetFilter from '../BottomSheetFilter';
import React, { useCallback, useMemo, useRef } from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import styles from './styles';
import SelectButton from './SelectButton';
import SelectItem from './SelectItem';
import type { ClosableType, FCWithChildren } from '../../types';
import type { BottomSheetOptionType, BottomSheetSelectProps } from './types';
import type { BottomSheetFilterI } from '../BottomSheetFilter/types';
import Conditional from '../Conditional';
import PoweredByGoogle from '../GooglePlacesAutocomplete/PoweredByGoogle';

const BottomSheetSelect: FCWithChildren<BottomSheetSelectProps> = ({
  placeholder = 'Select an option',
  options = [],
  selectedOption,
  onChange,
  hasDefaultOption = false,
  showPoweredByGoogle = true,
  renderFooter,
  renderHeader,
  renderPoweredComponent,
  _container,
  _flatlist,
  _selectButton,
  ...props
}) => {
  const bottomSheetFilterRef = useRef<BottomSheetFilterI>(null);

  const renderButton = ({ onOpen }: ClosableType) => (
    <SelectButton
      {..._selectButton}
      onPress={(e) => {
        _selectButton?.onPress?.(e);
        onOpen?.();
      }}
    >
      {selectedOption?.value
        ? selectedOption?.label ?? placeholder
        : placeholder}
    </SelectButton>
  );

  const renderItem: ListRenderItem<BottomSheetOptionType> = useCallback(
    ({ item: option }) => {
      const isSelected = option.value === selectedOption?.value;
      if (option.value === 'powered-google' && showPoweredByGoogle) {
        return renderPoweredComponent ? (
          <>{renderPoweredComponent()}</>
        ) : (
          <PoweredByGoogle />
        );
      }
      return (
        <SelectItem
          style={styles.selectItem}
          label={option.label}
          onPress={(e) => {
            if (option.onPress) {
              option.onPress(option, options, e);
            }
            onChange?.(option);
            bottomSheetFilterRef.current?.onClose();
          }}
          isSelected={isSelected}
        />
      );
    },
    [
      renderPoweredComponent,
      onChange,
      options,
      selectedOption?.value,
      showPoweredByGoogle,
    ]
  );
  const renderItemEmptyComponent = () => {
    return <Text style={styles.noOptionsText}>No results were found</Text>;
  };

  const mappedOptions = useMemo(
    () =>
      [
        hasDefaultOption && {
          label: 'N/A',
          value: null,
        },
        ...options,
        options.length > 0 && {
          label: 'N/A',
          value: 'powered-google',
        },
      ].filter(Boolean) as BottomSheetOptionType[],
    [options, hasDefaultOption]
  );

  return (
    <BottomSheetFilter
      {...props}
      renderButton={props.renderButton ?? renderButton}
      ref={bottomSheetFilterRef}
    >
      {(filterCtx) => (
        <BottomSheetView {..._container}>
          <Conditional value={!!renderHeader}>
            <View style={styles.headerContainer}>
              {renderHeader?.(filterCtx)}
            </View>
          </Conditional>

          <FlatList
            renderItem={renderItem}
            ListEmptyComponent={renderItemEmptyComponent}
            {..._flatlist}
            data={mappedOptions}
            contentContainerStyle={[
              styles.flatlistContainerStyle,
              _flatlist?.contentContainerStyle,
            ]}
          />

          <Conditional value={!!renderFooter}>
            <View style={styles.footerContainer}>
              {renderFooter?.(filterCtx)}
            </View>
          </Conditional>
        </BottomSheetView>
      )}
    </BottomSheetFilter>
  );
};

export default BottomSheetSelect;
