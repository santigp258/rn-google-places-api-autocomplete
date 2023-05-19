import BottomSheetFilter from '../BottomSheetFilter';
import React, { useMemo, useRef } from 'react';
import { FlatList, ListRenderItem, Text } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import styles from './styles';
import SelectButton from './SelectButton';
import SelectItem from './SelectItem';
import type { ClosableType, FCWithChildren } from '../../types';
import type { BottomSheetOptionType, BottomSheetSelectProps } from './types';
import type { BottomSheetFilterI } from '../BottomSheetFilter/types';

const BottomSheetSelect: FCWithChildren<BottomSheetSelectProps> = ({
  placeholder = 'Select an option',
  options = [],
  selectedOption = {},
  onChange,
  hasDefaultOption = true,
  ...props
}) => {
  const bottomSheetFilterRef = useRef<BottomSheetFilterI>(null);

  const renderButton = ({ onOpen }: ClosableType) => (
    <SelectButton onPress={onOpen}>
      {selectedOption?.value
        ? selectedOption?.label ?? placeholder
        : placeholder}
    </SelectButton>
  );

  const renderItem: ListRenderItem<BottomSheetOptionType> = ({
    item: option,
  }) => {
    const isSelected = option.value === selectedOption?.value;
    return (
      <SelectItem
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
  };

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
      ].filter(Boolean) as BottomSheetOptionType[],
    [options, hasDefaultOption]
  );

  return (
    <BottomSheetFilter
      {...props}
      renderButton={renderButton ?? props.renderButton}
      ref={bottomSheetFilterRef}
    >
      {() => (
        <BottomSheetView>
          <FlatList
            data={mappedOptions}
            renderItem={renderItem}
            ListEmptyComponent={renderItemEmptyComponent}
          />
        </BottomSheetView>
      )}
    </BottomSheetFilter>
  );
};

export default BottomSheetSelect;
