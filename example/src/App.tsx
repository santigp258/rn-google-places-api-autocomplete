import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, View } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import type { BottomSheetOptionType } from 'rn-google-places-api-autocomplete';
import { GooglePlacesAutocomplete } from 'rn-google-places-api-autocomplete';

export default function App() {
  const [selectedOption, setSelectedOption] =
    useState<BottomSheetOptionType | null>(null);
  const apiKey = process.env.GOOGLE_API_KEY ?? '';

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <GooglePlacesAutocomplete
            apiKey={apiKey}
            endpointType="autocomplete"
            onChange={(option) => setSelectedOption(option)}
            selectedOption={selectedOption}
            query={{
              components: 'country:co',
              types: '(cities)',
              language: 'es',
            }}
          />
        </View>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#d4d4d8',
  },
  filterContainer: {
    width: '100%',
  },
});
