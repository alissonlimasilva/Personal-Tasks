import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screens/login';
import Main from '../screens/main';
import Details from '../screens/details';
import {routes} from '../res/global';

const credentialStack = createStackNavigator(
  {
    [routes.LOGIN]: {screen: Login},
    [routes.MAIN]: {screen: Main},
    [routes.DETAILS]: {screen: Details},
  },
  {
    initialRouteName: routes.LOGIN,
    defaultNavigationOptions: {
      header: () => null,
    },
  },
);

export default createAppContainer(credentialStack);
