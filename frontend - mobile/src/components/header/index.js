import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {} from 'react-navigation';
import colors from '../../res/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import metrics from '../../res/metrics';
import Title from '../title';

const Header = ({onBack = () => {}, title = 'Detalhes da tarefa'}) => {
  return (
    <View style={styles.container}>
      <Icon onPress={onBack} style={styles.back} name={'arrow-circle-o-left'} />
      <Title title={title} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: metrics.headerHeight,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  back: {color: colors.iconBack, fontSize: 40, marginRight: 10},
});

export default Header;
