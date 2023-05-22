import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styles from './styles';
import type { FCWithChildren } from '../../types';
import type { SelectButtonProps } from './types';

export const SelectButton: FCWithChildren<SelectButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.5} {...props}>
      <View style={styles.container}>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholder} numberOfLines={1}>
            {children}
          </Text>
        </View>
        <View style={styles.arrowContainer}>
          <Image
            source={require('../../assets/arrow-down.png')}
            style={styles.arrow}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SelectButton;
