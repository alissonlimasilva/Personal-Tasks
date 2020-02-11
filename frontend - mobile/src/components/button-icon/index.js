import React from 'react';
import {StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import colors from '../../res/colors';
import metrics from '../../res/metrics';
import global from '../../res/styles/global';
import Icon from 'react-native-vector-icons/FontAwesome';

const size = metrics.heightButtonIcon;

const ButtonIcon = ({style = {}, icon, iconStyle = {}, ...props}) => {
  return (
    <TouchableOpacity style={[styles.button, global.shadow, style]} {...props}>
      <Icon style={[styles.icon, iconStyle]} name={icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderTopLeftRadius: size * 2,
    borderTopRightRadius: size * 2,
    flex: 1,
    backgroundColor: colors.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    height: size,
  },
  icon: {
    color: '#fff',
    fontSize: 30,
  },
});

export default ButtonIcon;
