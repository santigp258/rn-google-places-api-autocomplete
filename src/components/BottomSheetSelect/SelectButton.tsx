import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
        <Text style={styles.placeholder}>{children}</Text>
        {/*<Feather size={wp(6)} color="#C8C8C8" name={'chevron-down'} />*/}
        <Text>hello</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectButton;
