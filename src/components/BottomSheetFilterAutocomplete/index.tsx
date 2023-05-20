import React, { FC, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import useDebounce from '../../hooks/useDebounce';

import type { ClosableType } from '../../types';
import BottomSheetSelect from '../BottomSheetSelect';
import type { BottomSheetFilterAutocompleteProps } from './types';
import styles from './styles';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

const BottomSheetFilterAutocomplete: FC<BottomSheetFilterAutocompleteProps> = ({
  placeholder = 'Choose Options',
  options = [],
  searchPlaceholder = 'Search ',
  selectedOptions = [],
  onChange,
}) => {
  const [currentTerm, setCurrentTerm] = useState('');

  const [results, setResults] = useState(options);

  const debouncedTerm = useDebounce(currentTerm, 500);

  const renderFooter = ({ onClose }: ClosableType) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setCurrentTerm('');
          onClose?.();
        }}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = (args: ClosableType) => {
    return (
      <View style={styles.inputContainer}>
        <BottomSheetTextInput style={styles.input} placeholder="Search" />
      </View>
    );
  };

  return (
    <>
      <BottomSheetSelect
        handleStyle={styles.handleStyle}
        _container={{
          style: styles.bottomSheetContainer,
        }}
        renderFooter={renderFooter}
        renderHeader={renderHeader}
      />
    </>
  );
};

export default BottomSheetFilterAutocomplete;
