import Home from "./screens/Home/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Register from "./screens/User/Register";
import Login from "./screens/User/Login";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Lessons from "./screens/Home/Lessons";
import LessonDetails from "./screens/Home/LessonDetails";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="index" component={Home} options={{title: 'Khóa học', headerShown: false }} />
      <Stack.Screen name="lessons" component={Lessons} options={{title: "Bài học"}} />
      <Stack.Screen name="lesson-details" component={LessonDetails} options={{title: "Chi tiết bài học"}} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={StackNavigator} options={{title: 'Màn hình chính', tabBarIcon: () => <Icon source="home" size={20} />}} />
      <Tab.Screen name="register" component={Register} options={{title: 'Đăng ký', tabBarIcon: () => <Icon source="account-plus" size={20} />}} />
      <Tab.Screen name="login" component={Login} options={{title: 'Đăng nhập', tabBarIcon: () => <Icon source="account" size={20} />}} />
    </Tab.Navigator>
  );
}

const App = () => {
  

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
   
  );
  
}

export default App;