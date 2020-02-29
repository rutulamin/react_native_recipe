import React from 'react';
import {Image} from 'react-native'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { LoginComponent } from './component/loginComponent';
import { MapComponent } from './component/mapComponent';
import { ProfileComponent } from './component/profileComponent';
import { RecipeAddComponent } from './component/recipeAddComponent';
import { RecipeDeatailComponent } from './component/recipeDetailComponent';
import { RecipeListComponent } from "./component/recipeListComponent";
import { SettingComponent } from "./component/settingComponent";



const tabBarNavigator = createBottomTabNavigator({
    List: {
      screen: RecipeListComponent, navigationOptions:{
        tabBarIcon: ({tintColor}) => (
          <Image style={{ height: 20, width: 20, tintColor:tintColor }} source={require('./assets/cooking.png')}></Image>
        ),
        title: 'Recipe List'
      }
    },
    Setting: {
      screen: SettingComponent, navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Image style={{height: 20, width: 20, tintColor: tintColor}} source={require('./assets/settings.png')}></Image>
        ),
        title: 'Settings'
      }
    }
    }, {
      tabBarOptions: {
        activeTintColor: 'rgba(252,182,1071,1)',
      }
})

const detailNavigation = createStackNavigator({
  tabBarNavigator,
  Detail: {screen: RecipeDeatailComponent, navigationOptions: {...TransitionPresets.SlideFromRightIOD} },
  Add: {scree: RecipeAddComponent, navigationOptions: {...TransitionPresets.ModelPresentationIOS} },
  Map: {screen: MapComponent},
  Profile: { screen: ProfileComponent}
}, {
  headerMode: 'none'
});

const navigate = createSwitchNavigator(
  {
    Login: {
      screen: LoginComponent, navigationOptions: { headerShown: false }
  },
  detailNavigation
  }
)

const AppContainer = createAppContainer(navigate);

const initialState = { token: '' };

const reducer = (state = initialState, action) => {
  switch (action.type){
      case 'Token':
        return { token: action.token }
    default: {token: state.token}
  }
  return {token: state.token}
}

const store = createStore(reducer)

export default function App() {
  return <Provider store={store}>
      <AppContainer></AppContainer>
    </Provider> 
}

// older code

// export default function App() {
//   return (<LoginComponent></LoginComponent>);
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row'
//   },
//   title: {
//     color: '#ff0000',
//     fontSize: 25,
//     borderWidth: 10,
//     borderColor: 'red',
//     borderRadius: 20,
//     fontWeight: 'bold',
//     fontFamily: 'Zapfino'
//   },
//   view1: {
//     flex: 0.5,
//     backgroundColor: 'cyan',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
    
//     flexWrap: 'wrap',
//     alignContent: 'flex-end'
//   },
//   view2: {
//     flex: 0.3,
//     backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%'
//   },
//   view3: {
//     flex: 0.2,
//     backgroundColor: 'yellow',
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     width: '100%'
//   }
// });