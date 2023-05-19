import BottomSheetFilter from '../BottomSheetFilter';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import useDebounce from '../../hooks/useDebounce';
import Conditional from '../Conditional';

import type { ClosableType } from '../../types';
import styles from './styles';
import BottomSheetSelect from '../BottomSheetSelect';

export const MultiSelectItem = ({
  label,
  hasDeleteButton = true,
  ...props
}) => {
  return (
    <TouchableOpacity style={styles.selectedItemButton} {...props}>
      <Text style={styles.selectedItemButtonText}>{label}</Text>
      <Conditional value={hasDeleteButton}>
        <View
          style={{
            backgroundColor: styles.selectedItemButtonText.color,
            borderRadius: 9999,
          }}
        >
          {/*  <Ionicons name="close" color="white" />*/} <Text>Close</Text>
        </View>
      </Conditional>
    </TouchableOpacity>
  );
};

const BottomSheetFilterAutocomplete = ({
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
        onPress={() => {
          setCurrentTerm('');
          onClose?.();
        }}
      >
        <Text>Confirm</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <BottomSheetSelect renderFooter={renderFooter} />
    </>
  );
};

export default BottomSheetFilterAutocomplete;
