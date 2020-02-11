import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import colors from '../../res/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import metrics from '../../res/metrics';
import Modal from 'react-native-modal';
import HeaderModal from '../header-modal';

const ModalConfirm = ({
  show = false,
  onConfirm = () => {},
  onCancel = () => {},
  title = 'Gostaria de excluir a tarefa selecionada?',
}) => {
  const confirm = () => (
    <TouchableOpacity
      onPress={onConfirm}
      style={[styles.button, styles.confirm]}>
      <Icon style={styles.icon} name="check-circle-o" />
    </TouchableOpacity>
  );
  const cancel = () => (
    <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancel]}>
      <Icon style={styles.icon} name="times-circle" />
    </TouchableOpacity>
  );
  return (
    <Modal isVisible={show}>
      <View style={styles.container}>
        <HeaderModal title="Tem certeza?" icon="times-circle" />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.viewButtons}>
            {confirm()}
            {cancel()}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightBackground,
    borderRadius: metrics.borderRadius,
  },
  content: {
    padding: metrics.paddingView + 20,
  },
  viewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: metrics.buttonModalConfirm,
    height: metrics.buttonModalConfirm,
    borderRadius: metrics.buttonModalConfirm / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirm: {
    backgroundColor: 'green',
  },
  cancel: {
    backgroundColor: 'red',
  },
  title: {
    color: colors.primary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  icon: {
    color: '#fff',
    fontSize: 35,
  },
});

export default ModalConfirm;
