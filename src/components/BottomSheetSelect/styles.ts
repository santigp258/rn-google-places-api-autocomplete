import { StyleSheet } from 'react-native';
import colors from '../../colors';

const styles = StyleSheet.create({
  noOptionsText: {
    alignSelf: 'center',
    marginTop: 10,
  },
  arrow: {
    width: 10,
    height: 10,
  },
  arrowContainer: {
    alignItems: 'flex-end',
  },
  button: {
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 5,
    borderColor: colors.gray['300'],
  },
  option: {
    marginTop: 4,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderColor: colors.gray['300'],
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  selectedOptionText: {
    color: 'white',
  },
  optionText: {
    color: colors.gray['700'],
    textTransform: 'capitalize',
  },

  placeholder: {
    textTransform: 'capitalize',
    color: colors.gray['600'],
  },
  container: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'red',
  },
});

export default styles;
