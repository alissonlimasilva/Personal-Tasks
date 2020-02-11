import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import ItemTask from './item';
import Title from '../title';
import {routes} from '../../res/global';

const empty = require('../../assets/imgs/empty.png');

const ListTask = ({
  onChangeList = () => {},
  data = [],
  style = {},
  navigation,
}) => {
  const selectedItem = item => {
    navigation.navigate(routes.DETAILS, {
      item,
      onChangeList,
    });
  };

  const renderItem = ({index, item}) => (
    <ItemTask index={index} item={item} onPress={selectedItem} />
  );

  return (
    <View style={[styles.container, style]}>
      <Title title="Sua lista de tarefas" />
      {data.length === 0 && <Image source={empty} style={styles.empty} />}
      {data.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          numColumns={2}
          keyExtractor={item => item._id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '90%', alignSelf: 'center'},
  section: {
    fontSize: 20,
    marginBottom: 10,
  },
  empty: {
    flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default ListTask;
