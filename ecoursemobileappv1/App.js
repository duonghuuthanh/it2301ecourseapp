import { View } from "react-native";
import Styles from "./styles/Styles";
import Header from "./components/Header";
import Home from "./screens/Home/Home";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./screens/User/Login";
import Register from "./screens/User/Register";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Lessons from "./screens/Home/Lessons";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" component={Home} />
      <Stack.Screen name="lessons" component={Lessons} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={StackNavigator} options={{title: 'Khóa học', tabBarIcon: () => <Icon source="home" size={30} />}} />
      <Tab.Screen name="login" component={Login} options={{title: 'Đăng nhập', tabBarIcon: () => <Icon source="account" size={30} />}} />
      <Tab.Screen name="register" component={Register} options={{title: 'Đăng ký', tabBarIcon: () => <Icon source="account-plus" size={30} />}} />
    </Tab.Navigator>
  );
}

const App = () => {
  const [cateId, setCateId] = useState();

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
    // <View style={[Styles.container, Styles.padding]}>
    //   <Header cateId={cateId} setCateId={setCateId} />
    //   <Home cateId={cateId} />
    // </View>
  );
}

export default App;