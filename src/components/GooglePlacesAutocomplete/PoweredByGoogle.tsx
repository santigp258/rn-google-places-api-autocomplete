import styles from './styles';
import { Image, View } from 'react-native';
import SelectItem from '../BottomSheetSelect/SelectItem';
import React from 'react';

const PoweredByGoogle = () => {
  return (
    <SelectItem style={styles.listItem} isPreview>
      <View style={styles.poweredByGoogleItemContainer}>
        <Image
          source={require('../../assets/powered_by_google_on_white.png')}
          resizeMode="contain"
        />
      </View>
    </SelectItem>
  );
};

export default PoweredByGoogle;
