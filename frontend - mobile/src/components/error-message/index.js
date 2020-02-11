import React from 'react';
import {Text, StyleSheet} from 'react-native';

const ErrorMessage = ({isError = '', message = '', style = {}}) => {
  return isError ? <Text style={[styles.error, style]}>{message}</Text> : null;
};
export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
});
