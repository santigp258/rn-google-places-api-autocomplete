import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import type { FCWithChildren } from '../../types';
import type { SelectItemProps } from './types';

export const SelectItem: FCWithChildren<SelectItemProps> = ({
  label,
  isSelected,
  isPreview,
  _view,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={isPreview ? 1 : 0.7}
      {...props}
      style={[styles.option, props.style]}
    >
      <View
        {..._view}
        style={[
          styles.container,
          isSelected && styles.selectedOption,
          _view?.style,
        ]}
      >
        {children ? (
          children
        ) : (
          <Text
            style={[styles.optionText, isSelected && styles.selectedOptionText]}
          >
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SelectItem;
