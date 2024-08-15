import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Beranda from './Component/homeScreen'
import Tambahkan from './Component/tambahData';
import API from './Component/animeAPI'
import Detail from './Component/detailApi'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()




function MainStack() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Beranda" component={Beranda} />
    <Stack.Screen name="TampilanTambahan" component={Tambahkan} />
   
    </Stack.Navigator>
  );
}

function MainStack2() {
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen name="Wiki Anime" component={API}  />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Halaman Utama' component={MainStack} options={{headerShown: false,tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-group" color={color} size={size} />
            ), 
        
        }} />
        <Tab.Screen name='Anime' component={MainStack2} options={{headerShown: false,tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="film" color={color} size={size} />
            ), 
        
        }}  />
         
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});