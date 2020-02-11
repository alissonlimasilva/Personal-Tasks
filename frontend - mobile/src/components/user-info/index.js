import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../button';
import colors from '../../res/colors';
import global from '../../res/styles/global';
import metrics from '../../res/metrics';
import AsyncStorage from '@react-native-community/async-storage';
import {storageKeys} from '../../res/global';

const UserInfo = ({user = 'Usuário', quantNotas = 0, onLogout}) => {
  const message =
    quantNotas === 0
      ? 'Você não possui notas'
      : `Você possui ${quantNotas} ${quantNotas > 1 ? 'notas' : 'nota'}`;
  return (
    <View style={[styles.container, global.shadow]}>
      <View style={styles.viewAvatarUser}>
        <Icon style={styles.avatar} name="user-circle-o" />
        <View style={styles.viewTexts}>
          <Text>
            Olá, <Text style={styles.textUserName}>{user}!</Text>
          </Text>
          <Text>{message}</Text>
        </View>
      </View>
      <Button
        onPress={onLogout}
        style={styles.button}
        text="Desconectar"
        icon="sign-out"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: metrics.borderRadius,
  },
  viewTexts: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  viewAvatarUser: {
    flexDirection: 'row',
  },
  avatar: {
    fontSize: 50,
    color: colors.darkBackground,
  },
  textUser: {
    fontSize: 15,
  },
  textUserName: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  textMessage: {},
  button: {
    width: '60%',
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default UserInfo;
