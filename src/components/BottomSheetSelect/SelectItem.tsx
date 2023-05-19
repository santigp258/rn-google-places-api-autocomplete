import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import type { FCWithChildren } from '../../types';
import type { SelectItemProps } from './types';

export const SelectItem: FCWithChildren<SelectItemProps> = ({
  label,
  isSelected,
  ...props
}) => {
  return (
    <TouchableOpacity style={styles.option} activeOpacity={0.3} {...props}>
      <View style={[styles.container, isSelected && styles.selectedOption]}>
        <Text
          style={[styles.optionText, isSelected && styles.selectedOptionText]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectItem;
