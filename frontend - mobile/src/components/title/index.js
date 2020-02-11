import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import metrics from '../../res/metrics';

const mini = require('../../assets/imgs/bubble.png');

const Title = ({title = 'Detalhes da tarefa'}) => {
  return (
    <View style={styles.container}>
      <Image source={mini} style={styles.bubble} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: metrics.headerHeight,
    alignItems: 'center',
  },
  bubble: {
    width: 50,
    height: 50,
  },
  title: {
    position: 'absolute',
    left: 10,
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default Title;
