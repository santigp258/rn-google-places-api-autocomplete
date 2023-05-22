import { StyleSheet } from 'react-native';
import colors from '../../colors';

const styles = StyleSheet.create({
  noOptionsText: {
    alignSelf: 'center',
    marginTop: 10,
  },
  selectedItemButton: {
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.gray['500'],
    padding: 10,
  },
  selectedItemButtonText: {
    color: colors.gray['500'],
    marginRight: 4,
    fontSize: 20,
  },
  input: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  inputContainer: {
    marginTop: 5,
    position: 'relative',
  },
  inputCloseButton: {
    position: 'absolute',
    right: 15,
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputCloseImage: {
    width: 10,
    height: 10,
  },
  handleStyle: {
    backgroundColor: colors.gray['200'],
  },
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: colors.gray['200'],
  },
  listItem: {
    backgroundColor: 'white',
  },
  poweredByGoogleItemContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  poweredByGoogleImage: {
    width: 100,
    backgroundColor: 'red',
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonContainerLoader: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
});

export default styles;
