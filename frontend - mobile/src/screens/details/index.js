import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, Text, ScrollView} from 'react-native';
import colors from '../../res/colors';
import Header from '../../components/header';
import Input from '../../components/input';
import Button from '../../components/button';
import metrics from '../../res/metrics';
import ButtonIcon from '../../components/button-icon';
import ModalConfirm from '../../components/modal-confirm';
import DateTime from '../../components/datetime';
import api from '../../services/api';
import messages from '../../res/messages';
import endpoints from '../../services/endpoints';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/FontAwesome';

const Details = props => {
  const item = props.navigation.getParam('item', {});
  const onChangeList = props.navigation.getParam('onChangeList', () => {});
  const [title, setTitle] = useState(item.title);
  const [isDone, setIsDone] = useState(item.isDone);
  const [date, setDate] = useState(new Date(item.date));
  const [content, setContent] = useState(item.content);
  const [editable, setEditable] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const onChoise = selected => {
    setDate(selected);
  };

  const deleteTask = async () => {
    try {
      setModalDelete(false);
      const url = `${endpoints.DELETETASK}?taskId=${item._id}`;
      await api.delete(url);
      showMessage({
        message: messages.taskDeleted,
        type: 'success',
      });
      onChangeList();
      props.navigation.goBack();
    } catch (err) {
      showMessage({
        message: err.container.data.message || messages.errorDelete,
        type: 'danger',
      });
    }
  };

  const buttonSalvar = () => (
    <Button onPress={checkFields} text="Atualizar" style={styles.button} />
  );

  const markDoneUpdate = async () => {
    try {
      const body = {
        taskId: item._id,
        isDone: true,
      };
      await api.put(endpoints.UPDATETASK, body);
      showMessage({
        message: messages.taskUpdated,
        type: 'success',
      });
      onChangeList();
      setEditable(false);
      setIsDone(true);
    } catch (err) {
      JSON.stringify(err);
      showMessage({
        message: err.response.data.message || messages.errorUpdate,
        type: 'danger',
      });
    }
  };

  const updateTask = async () => {
    try {
      const body = {
        taskId: item._id,
        date,
        title,
        content,
        isDone,
      };
      const response = await api.put(endpoints.UPDATETASK, body);
      showMessage({
        message: messages.taskUpdated,
        type: 'success',
      });
      onChangeList();
      setEditable(false);
    } catch (err) {
      JSON.stringify(err);
      showMessage({
        message: err.response.data.message || messages.errorUpdate,
        type: 'danger',
      });
    }
  };

  const checkFields = () => {
    if (title && date && content) {
      updateTask();
    } else {
      showMessage({
        message: messages.errorValidation,
        type: 'danger',
      });
    }
  };

  const buttonsOperations = () => {
    return (
      <View style={styles.viewButtons}>
        <ButtonIcon icon="edit" onPress={() => setEditable(true)} />
        <ButtonIcon
          style={{backgroundColor: colors.darkBackground}}
          icon="check-circle-o"
          onPress={markDoneUpdate}
        />
        <ButtonIcon
          onPress={() => {
            setModalDelete(true);
          }}
          icon="trash-o"
        />
      </View>
    );
  };
  const styledEditable = editable
    ? {}
    : {backgroundColor: colors.darkBackground};

  const doneView = () => {
    return (
      <View>
        <Icon
          name="trash-o"
          onPress={() => {
            setModalDelete(true);
          }}
          style={styles.iconDelete}
        />
        <Button
          disabled
          style={styles.done}
          icon="check-square-o"
          iconStyle={styles.doneIcon}
          text="Tarefa concluída"
          textStyle={styles.textDone}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onBack={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView style={styles.content}>
        <Text style={styles.desc}>Título da Tarefa</Text>
        <Input
          editable={editable}
          value={title}
          onChangeText={setTitle}
          contentStyle={styledEditable}
        />
        <Text style={styles.desc}>Data da Tarefa</Text>
        <DateTime disabled={!editable} date={date} onSelected={onChoise} />
        <Text style={styles.desc}>Tarefa</Text>
        <Input
          onChangeText={setContent}
          value={content}
          multiline
          editable={editable}
          contentStyle={[styles.multilineContent, styledEditable]}
          style={styles.multilineInput}
        />
      </ScrollView>
      {!isDone && !editable && buttonsOperations()}
      {!isDone && editable && buttonSalvar()}
      {isDone && doneView()}
      <ModalConfirm
        onCancel={() => {
          setModalDelete(false);
        }}
        show={modalDelete}
        onConfirm={deleteTask}
        title={'Deseja excluir tarefa?'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
  content: {
    padding: metrics.paddingView,
  },
  iconDelete: {
    color: colors.primary,
    fontSize: 30,
    alignSelf: 'center',
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
  viewButtons: {
    padding: metrics.paddingView,
    flexDirection: 'row',
  },
  multilineContent: {
    height: 150,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  textDone: {
    color: 'gray',
  },
  done: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  doneIcon: {
    color: colors.darkBackground,
  },
});

export default Details;
