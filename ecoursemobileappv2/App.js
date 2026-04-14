import { View } from "react-native"
import Header from "./components/Header";
import Home from "./screens/Home/Home";
import Styles from "./styles/Styles";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Register from "./screens/User/Register";
import Login from "./screens/User/Login";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-paper";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={Home} options={{title: 'Màn hình chính', tabBarIcon: () => <Icon source="home" size={20} />}} />
      <Tab.Screen name="register" component={Register} options={{title: 'Đăng ký', tabBarIcon: () => <Icon source="account-plus" size={20} />}} />
      <Tab.Screen name="login" component={Login} options={{title: 'Đăng nhập', tabBarIcon: () => <Icon source="account" size={20} />}} />
    </Tab.Navigator>
  );
}

const App = () => {
  const [cateId, setCateId] = useState(null);

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
   
  );
  
}

export default App;