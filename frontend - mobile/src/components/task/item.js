import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../../res/colors';
import metrics from '../../res/metrics';
import getDateHour from '../../utils/dateFormatter';

const {height} = Dimensions.get('window');

const ItemTask = ({index, item, onPress}) => {
  const style = index % 2 === 0 ? styles.itemLeft : styles.itemRight;
  const {_id, date, isDone, title} = item;
  const {date: data, hour} = getDateHour(new Date(date));
  return (
    <TouchableOpacity
      key={_id}
      onPress={() => onPress(item)}
      style={[styles.container, style, isDone ? styles.isDone : {}]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.data}>{`${data} - ${hour}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 10,
    height: height * 0.2,
    padding: 10,
    backgroundColor: colors.primary,
  },
  isDone: {
    backgroundColor: colors.taskDone,
  },
  title: {fontSize: 20, color: '#FFF', fontWeight: 'bold', flex: 1},
  data: {fontSize: 12, color: '#fff'},
  itemLeft: {
    marginRight: '2%',
    borderTopLeftRadius: metrics.borderRadius,
    borderBottomLeftRadius: metrics.borderRadius,
  },
  itemRight: {
    marginLeft: '2%',
    borderTopRightRadius: metrics.borderRadius,
    borderBottomRightRadius: metrics.borderRadius,
  },
});

export default ItemTask;
