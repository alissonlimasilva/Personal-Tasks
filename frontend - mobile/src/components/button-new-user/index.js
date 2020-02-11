import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import colors from '../../res/colors';

const ButtonNewUser = ({onPress = () => {}}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Náo possui cadastro? </Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.link}>Criar nova conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    color: '#fff',
  },
  link: {
    color: colors.buttonColor,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default ButtonNewUser;
