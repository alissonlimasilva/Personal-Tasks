import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Input from '../../components/input';
import colors from '../../res/colors';
import Button from '../../components/button';
import ButtonNewUser from '../../components/button-new-user';
import SignUpModal from '../signup';
import endpoints from '../../services/endpoints';
import {showMessage} from 'react-native-flash-message';
import messages from '../../res/messages';
import {storageKeys, routes} from '../../res/global';
import {getLoggedUser} from '../../utils/userUtils';
import apiNoToken from '../../services/apiNoToken';

const logo = require('../../assets/imgs/logo.png');

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callMainScreen = () => {
    props.navigation.dispatch({
      type: 'Navigation/RESET',
      index: 0,
      actions: [{type: 'Navigate', routeName: routes.MAIN}],
    });
  };

  useEffect(() => {
    const getUser = async () => {
      let logged = await getLoggedUser();
      const emailLastUser = logged.email || '';
      setEmail(emailLastUser);
      if (logged.token) {
        callMainScreen();
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeLogin = async () => {
    setLoading(true);
    try {
      const body = {email, password};
      console.log(body);
      const {data} = await apiNoToken.post(endpoints.LOGIN, body);
      saveInInternal(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showMessage({
        message: error.response.data.message || messages[error.status],
        type: 'danger',
      });
    }
  };

  const saveInInternal = async loggedUser => {
    await AsyncStorage.setItem(
      storageKeys.LOGGEDUSER,
      JSON.stringify(loggedUser),
    );
    callMainScreen();
  };

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.darkBackground}
        barStyle="light-content"
      />
      <View style={styles.viewCentered}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.desc}>E-mail</Text>
        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          contentStyle={styles.input}
          onChangeText={setEmail}
          value={email}
        />
        <Text style={styles.desc}>Senha</Text>
        <Input
          secureTextEntry
          autoCorrect={false}
          contentStyle={styles.input}
          onChangeText={setPassword}
          value={password}
        />
        <Button
          isLoading={loading}
          onPress={makeLogin}
          style={styles.button}
          text="Entrar"
        />
        <ButtonNewUser onPress={handleModal} />
      </View>
      <SignUpModal onClose={handleModal} show={modal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCentered: {width: '85%'},
  logo: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  desc: {
    marginBottom: 10,
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 30,
    alignSelf: 'center',
    width: '50%',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
});

export default Login;
