import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import colors from '../../res/colors';
import metrics from '../../res/metrics';
import global from '../../res/styles/global';

const Input = ({style = {}, contentStyle = {}, ...props}) => {
  return (
    <View style={[styles.content, global.shadow, contentStyle]}>
      <TextInput style={[styles.input, style]} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    borderRadius: metrics.borderRadius,
    backgroundColor: colors.inputBackground,
    justifyContent: 'center',
    elevation: 15,
    paddingHorizontal: 10,
    minHeight: metrics.heightButton,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
});

export default Input;
