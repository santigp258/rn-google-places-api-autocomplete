import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styles from './styles';
import type { FCWithChildren } from '../../types';
import type { SelectButtonProps } from './types';

export const SelectButton: FCWithChildren<SelectButtonProps> = ({
  children,
  _image,
  _text,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      {...props}
      style={[styles.button, props.style]}
    >
      <View style={styles.container}>
        <View style={styles.placeholderContainer}>
          <Text
            numberOfLines={1}
            {..._text}
            style={[styles.placeholder, _text?.style]}
          >
            {children}
          </Text>
        </View>
        <View style={styles.arrowContainer}>
          <Image
            source={require('../../assets/arrow-down.png')}
            {..._image}
            style={[styles.arrow, _image?.style]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SelectButton;
