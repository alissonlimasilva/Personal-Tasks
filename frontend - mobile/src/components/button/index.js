import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import colors from '../../res/colors';
import metrics from '../../res/metrics';
import global from '../../res/styles/global';
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = ({
  isLoading = false,
  style = {},
  text = '',
  textStyle = {},
  icon,
  iconStyle = {},
  onPress = () => {},
  ...props
}) => {
  const renderIcon = () => (
    <Icon style={[styles.icon, iconStyle]} name={icon} />
  );

  const viewLoading = () => <ActivityIndicator size="large" color="white" />;

  const buttonContent = () => (
    <>
      <Text style={[styles.text, textStyle]}>{text}</Text>
      {!!icon && renderIcon()}
    </>
  );

  return (
    <TouchableOpacity
      style={[styles.button, global.shadow, style]}
      onPress={onPress}
      {...props}>
      {isLoading && viewLoading()}
      {!isLoading && buttonContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: metrics.borderRadius,
    padding: 5,
    backgroundColor: colors.buttonColor,
    elevation: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: metrics.heightButton,
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 20,
  },
});

export default Button;
