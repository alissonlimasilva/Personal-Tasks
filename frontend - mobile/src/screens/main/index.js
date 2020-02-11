import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  View,
} from 'react-native';
import colors from '../../res/colors';
import UserInfo from '../../components/user-info';
import ListTask from '../../components/task/list';
import Button from '../../components/button';
import CreateTask from '../create-task';
import {showMessage} from 'react-native-flash-message';
import api from '../../services/api';
import endpoints from '../../services/endpoints';
import messages from '../../res/messages';
import {logout, getLoggedUser} from '../../utils/userUtils';
import {routes} from '../../res/global';
import {orderListToDoneState} from '../../utils/TaskUtils';

const Main = props => {
  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setUser(await getLoggedUser());
    };
    getUser();
  }, []);

  useEffect(() => {
    getListTasksByUser();
  }, []);

  const logoutUser = async () => {
    await logout();
    props.navigation.dispatch({
      type: 'Navigation/RESET',
      index: 0,
      actions: [{type: 'Navigate', routeName: routes.LOGIN}],
    });
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const getListTasksByUser = async () => {
    try {
      setLoading(true);
      const response = await api.get(endpoints.LISTTASKS);
      setTasks(orderListToDoneState(response.data));
      setLoading(false);
    } catch (error) {
      showMessage({
        message: error.response.data.message || messages[error.status],
        type: 'danger',
      });
      setLoading(false);
    }
  };

  const loadingView = () => {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.lightStatusbar}
        barStyle="dark-content"
      />
      <UserInfo
        onLogout={logoutUser}
        user={user?.name}
        quantNotas={tasks.length}
      />
      {loading && loadingView()}
      {!loading && (
        <ListTask
          onChangeList={getListTasksByUser}
          navigation={props.navigation}
          style={styles.list}
          data={tasks}
        />
      )}
      <Button
        onPress={handleModal}
        style={styles.addButton}
        icon="plus-circle"
        iconStyle={styles.addIcon}
        text="Criar nova nota"
        textStyle={styles.textAddButton}
      />
      <CreateTask
        show={modal}
        onClose={handleModal}
        onCreated={getListTasksByUser}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
    marginTop: 10,
  },
  list: {marginTop: 20, flex: 1},
  addIcon: {
    color: colors.darkBackground,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAddButton: {
    color: 'gray',
  },
  addButton: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
});

export default Main;
