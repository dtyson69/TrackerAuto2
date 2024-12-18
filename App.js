import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import TBSIcon from './assets/TBSIcon.jpg';
import Main from './tbsmain'; // Import Main.js
import PickupScreen from './PickupScreen';
import DeliveryScreen from './DeliveryScreen';
import AssignedScreen from './AssignedScreen';
import CompleteScreen from './CompleteScreen';
import InvoicedScreen from './InvoicedScreen';
import DispatchedScreen from './DispatchedScreen';
import PhotoScreen from './PhotoScreen';

const apiBaseUrl = 'http://50.6.170.96:8088';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [drv_Id, setDrv_Id] = useState(null);  // State for storing drvId
  const [carrId, setCarrId] = useState(null);  // State for storing carrId

  const handleLogin = async () => {
    try {
      // Send POST request to login API
      const response = await axios.post(`${apiBaseUrl}/login`, { username, password });
      
      if (response.data.message === 'Login successful') {
        // On successful login, save drvId and carrId to the state
        setDrv_Id(response.data.drv_Id);
        setCarrId(response.data.carrId);
        //console.log('Heres my driver id ' + response.data.drv_Id + ' carrId ' + response.data.carrId);
        // Navigate to Main screen and pass drvId and carrId as parameters
        navigation.replace('Main', { drv_Id: response.data.drv_Id, carrId: response.data.carrId , status: 'CarrierChosen'});
      } else {
        // Display error if login failed
        setErrorMessage('Incorrect username or password, please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Company Logo */}
      
      <Image
        source={require('./assets/TBSIcon.jpg')} // Ensure this path is correct
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Stack Navigator

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="PickupScreen" component={PickupScreen} />
        <Stack.Screen name="AssignedScreen" component={AssignedScreen} />
        <Stack.Screen name="DispatchedScreen" component={DispatchedScreen} />
        <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} />
        <Stack.Screen name="InvoicedScreen" component={InvoicedScreen} />
        <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
        <Stack.Screen name="PhotoScreen" component={PhotoScreen} />  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default App;
