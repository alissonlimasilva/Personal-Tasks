import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, View, Text} from 'react-native';
import colors from '../../res/colors';
import metrics from '../../res/metrics';
import Input from '../../components/input';
import HeaderModal from '../../components/header-modal';
import Button from '../../components/button';
import apiNoToken from '../../services/apiNoToken';
import endpoints from '../../services/endpoints';
import {showMessage} from 'react-native-flash-message';
import messages from '../../res/messages';
import ErrorMessage from '../../components/error-message';

const SignUpModal = ({show = true, onClose = () => {}}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const clearFields = () => {
    setEmail('');
    setName('');
    setPassword('');
  };

  const success = () => {
    clearFields();
    onClose();
    showMessage({
      message: messages.userCreated,
      type: 'success',
    });
  };

  const checkFields = () => {
    setError(false);
    if (name && password && email) {
      signUp();
    } else {
      setError(true);
      setMessage(messages.errorValidation);
    }
  };

  const signUp = async () => {
    try {
      setLoading(true);
      const body = {name, password, email};
      const {data} = await apiNoToken.post(endpoints.SIGNUP, body);
      setLoading(false);
      success();
    } catch (err) {
      setLoading(false);
      setError(true);
      setMessage(
        err.response.data.message ||
          messages[err.response.status || messages.default],
      );
    }
  };

  return (
    <View>
      <Modal isVisible={show}>
        <View style={styles.container}>
          <HeaderModal
            onPress={onClose}
            title="Nova conta"
            icon="times-circle"
          />
          <View style={styles.content}>
            <ErrorMessage
              style={{textAlign: 'center'}}
              isError={error}
              message={message}
            />
            <Text style={styles.desc}>Nome</Text>
            <Input value={name} onChangeText={setName} />
            <Text style={styles.desc}>E-mail</Text>
            <Input
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.desc}>Senha</Text>
            <Input
              secureTextEntry
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
            />
            <Button
              isLoading={loading}
              onPress={checkFields}
              text="Cadastrar"
              style={styles.button}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightBackground,
    borderRadius: metrics.borderRadius,
  },
  content: {
    padding: metrics.paddingView,
  },
  desc: {
    marginBottom: 10,
    color: colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
});

export default SignUpModal;
