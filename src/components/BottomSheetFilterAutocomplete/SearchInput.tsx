import React, { FC, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import type { SearchInputProps } from './types';
import Conditional from '../Conditional';

const SearchInput: FC<SearchInputProps> = ({ onChange, onClear, ...rest }) => {
  const [currentTerm, setCurrentTerm] = useState('');

  const handleChangeText = (text: string) => {
    setCurrentTerm(text);
    onChange?.(text);
  };

  const handleClear = () => {
    setCurrentTerm('');
    onClear?.();
  };

  return (
    <View style={styles.inputContainer}>
      <BottomSheetTextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={handleChangeText}
        value={currentTerm}
        {...rest}
      />
      <Conditional value={currentTerm !== ''}>
        <TouchableOpacity style={styles.inputCloseButton} onPress={handleClear}>
          <Image
            source={require('../../assets/close.png')}
            style={styles.inputCloseImage}
          />
        </TouchableOpacity>
      </Conditional>
    </View>
  );
};
export default SearchInput;
