import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import useDebounce from '../../hooks/useDebounce';

import type { ClosableType } from '../../types';
import BottomSheetSelect from '../BottomSheetSelect';

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
