import React, { useImperativeHandle, useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import type { SearchInputMethods, SearchInputProps } from './types';
import Conditional from '../Conditional';

const SearchInput = React.forwardRef<SearchInputMethods, SearchInputProps>(
  (
    {
      onChange,
      component: TextInputComponent = TextInput,
      onClear,
      defaultValue = '',
      renderClearButton,
      ...rest
    },
    ref
  ) => {
    const [currentTerm, setCurrentTerm] = useState(defaultValue);

    useImperativeHandle(
      ref,
      () => ({
        setTerm: (term: string) => {
          setCurrentTerm(term);
        },
      }),
      []
    );

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
        <TextInputComponent
          placeholder="Search"
          onChangeText={handleChangeText}
          value={currentTerm}
          {...rest}
          style={[styles.input, rest.style]}
        />
        <Conditional value={currentTerm !== ''}>
          {renderClearButton ? (
            renderClearButton({ onClear: handleClear })
          ) : (
            <TouchableOpacity
              style={styles.inputCloseButton}
              onPress={handleClear}
            >
              <Image
                source={require('../../assets/close.png')}
                style={styles.inputCloseImage}
              />
            </TouchableOpacity>
          )}
        </Conditional>
      </View>
    );
  }
);

SearchInput.displayName = 'SearchInput';
export default SearchInput;
