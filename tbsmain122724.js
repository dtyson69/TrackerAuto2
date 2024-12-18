import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

// API Base URL
const apiBaseUrl = 'http://50.6.170.96:8088';

// Loads Screen Component
const LoadsScreen = ({ route }) => {
  const { drv_Id, carrId } = route.params; // Get drvId and carrId from navigation params
  console.log('Route params:', route.params); 
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(''); // State for selected status

  // Function to fetch loads based on status and driver/carrier IDs
  const fetchLoadsByStatus = async (status) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiBaseUrl}/loads`, {
        params: {status,
          drv_Id,
          carrId
          }  // Send the status, drvId, and carrId in the request body
      });
      console.log('Hello Error fetching loads: ' + status + ' ' + drv_Id);
      setLoads(response.data); // Update the loads data
      setLoading(false); // Stop loading
    } catch (error) {
      console.error('Hello Error fetching loads: ' + drv_Id + ' carrId ' + carrId , error);
      setLoading(false); // Stop loading even on error
    }
  };

  // Use effect to fetch all loads initially
  useEffect(() => {
    fetchLoadsByStatus(''); // Default to fetching all loads
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loads Management</Text>

      {/* Status Filter Buttons */}
      <ScrollView
        horizontal={true}
        style={styles.buttonScrollView}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {['Dispatched', 'Assigned', 'Picked Up', 'Delivered', 'Invoiced', 'Complete'].map((status) => (
          <View style={styles.buttonWrapper} key={status}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedStatus === status ? styles.selectedButton : styles.deselectedButton,
              ]}
              onPress={() => {
                setSelectedStatus(status);  // Update selected status
                fetchLoadsByStatus(status); // Fetch loads by selected status
              }}
            >
              <Text style={styles.buttonText}>{status}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.subtitle}>
            Status: {selectedStatus || 'All'}
          </Text>
          <FlatList
            data={loads}
            keyExtractor={(item) => item.load_id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{`Load ID: ${item.load_id}`}</Text>
                <Text>{`Pickup: ${item.pickup_city}`}</Text>
                <Text>{`Delivery: ${item.delivery_city}`}</Text>
                <Text>{`Status: ${item.status}`}</Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};





// Styles
const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  buttonScrollView: {
    flex: 0, // Prevent it from growing/shrinking
    marginBottom: 10,  // Reduced bottom margin
  },
  scrollContentContainer: {
    paddingHorizontal: 10,  // Padding around the buttons to prevent them from touching edges
  },
  buttonWrapper: {
    marginRight: 15, // Space between buttons
  },
  button: {
    backgroundColor: '#ddd',  // Default button background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'blue', // Highlight selected button
  },
  deselectedButton: {
    backgroundColor: '#ddd', // Regular button color
  },
  buttonText: {
    color: '#fff',  // Text color for buttons
    fontSize: 16,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

export default LoadsScreen;
