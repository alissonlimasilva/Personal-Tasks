import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, View, Text} from 'react-native';
import colors from '../../res/colors';
import metrics from '../../res/metrics';
import Input from '../../components/input';
import HeaderModal from '../../components/header-modal';
import Button from '../../components/button';
import DateTime from '../../components/datetime';
import endpoints from '../../services/endpoints';
import api from '../../services/api';
import {showMessage} from 'react-native-flash-message';
import ErrorMessage from '../../components/error-message';
import messages from '../../res/messages';

const CreateTask = ({
  show = false,
  onClose = () => {},
  onCreated = () => {},
}) => {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [task, setTask] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const onChoise = selectedDate => {
    setDate(selectedDate);
  };

  const clearFields = () => {
    setDate(new Date());
    setTitle('');
    setTask('');
  };

  const createTask = async () => {
    try {
      const body = {date, title, content: task};
      await api.post(endpoints.ADDTASK, body);
      clearFields();
      onClose();
      showMessage({
        message: messages.taskCreated,
        type: 'success',
      });
      onCreated();
    } catch (err) {
      setError(true);
      setMessage(
        err.response.data.message ||
          messages[err.response.status] ||
          messages.default,
      );
    }
  };

  const checkFields = () => {
    setError(false);
    if (title && date && task) {
      createTask();
    } else {
      setError(true);
      setMessage(messages.errorValidation);
    }
  };

  return (
    <View>
      <Modal isVisible={show}>
        <View style={styles.container}>
          <HeaderModal
            title="Nova tarefa"
            icon="times-circle"
            onPress={onClose}
          />
          <View style={styles.content}>
            <ErrorMessage
              style={{textAlign: 'center'}}
              isError={error}
              message={message}
            />
            <Text style={styles.desc}>Título da Tarefa*</Text>
            <Input value={title} onChangeText={setTitle} />
            <Text style={styles.desc}>Data da Tarefa*</Text>
            <DateTime date={date} onSelected={onChoise} />
            <Text style={styles.desc}>Tarefa*</Text>
            <Input
              onChangeText={setTask}
              value={task}
              multiline
              contentStyle={styles.multiline}
              style={styles.multilineInput}
            />
            <Button
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
  multiline: {
    height: 150,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
});

export default CreateTask;
