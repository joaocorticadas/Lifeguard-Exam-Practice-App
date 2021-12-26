import 'react-native-gesture-handler'
import React from 'react';
import { StyleSheet, StatusBar, ImageBackground, Text, View } from 'react-native';
import practice from './screens/practice';
import exams from './screens/exams';
import exam_question from './screens/exam_question';
import results from './screens/results';
import results_new from './screens/results_new';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import { useFonts, Quicksand_700Bold, Quicksand_500Medium, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import rightOrWrong from './screens/rightOrWrong';
import practice_question from './screens/practice_question';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyStack() {
	return (
		StatusBar.setHidden(true),
			<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
				  let iconName;
	  
				  if (route.name === 'Praticar') {
					iconName = focused
					  ? 'edit-2'
					  : 'edit-2';
				  } else if (route.name === 'Exames') {
					iconName = focused ? 'book' : 'book';
				//} else if (route.name === 'Perfil') {
					//iconName = focused ? 'user' : 'user';
				  }
	  
				  // You can return any component that you like here!
				  return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: '#EC5C5F',
          		tabBarInactiveTintColor: 'gray',
       				})} 

      			> 
				<Tab.Screen name="Praticar"  component={practice} options={{headerShown: false}}/>
				<Tab.Screen name="Exames" component={exams} options={{headerShown: false}}/>
			</Tab.Navigator>
		
	)
}

export default function App() {
	let [fontsLoaded] = useFonts({
		Quicksand_700Bold, Quicksand_500Medium, Quicksand_400Regular
	  });
	
	  if (!fontsLoaded) {
		return <AppLoading />;
	  } else {
	return (
		<NavigationContainer>
			<Stack.Navigator>
					<Stack.Group>
						<Stack.Screen name="Praticare"  component={MyStack} options={{headerShown: false}}/>
						<Stack.Screen name="Examess" component={MyStack} options={{headerShown: false}}/>
						<Stack.Screen name="Questao" component={exam_question} options={{headerShown: false, gestureEnabled: false}} />
						<Stack.Screen name="Resultados New" component={results_new} options={{headerShown: false, gestureEnabled:false}} />
						<Stack.Screen name="Praticar Questao" component={practice_question} options={{headerShown: false, gestureEnabled:false}} />
					</Stack.Group>
					<Stack.Group screenOptions={{ presentation: 'modal' }}>
						<Stack.Screen name="rightOrWrong" component={rightOrWrong} options={{headerShown: false}} />
					</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
  );
}
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center',
  },
});
