import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import colors from '../../res/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import metrics from '../../res/metrics';

const HeaderModal = ({onPress = () => {}, icon = '', title = ''}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Icon onPress={onPress} style={styles.icon} name={icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: colors.primary,
    borderTopLeftRadius: metrics.borderRadius,
    borderTopRightRadius: metrics.borderRadius,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  icon: {
    color: '#fff',
    fontSize: 30,
  },
});

export default HeaderModal;
