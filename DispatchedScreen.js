import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const DeliveryScreen = ({ route }) => {
  const { loadId, status } = route.params;
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      try {
        const response = await axios.get(`http://50.6.170.96:8088/delivery`, {
          params: { loadId },
        });
        setDeliveryDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching delivery details:', error);
        setLoading(false);
      }
    };

    fetchDeliveryDetails();
  }, [loadId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!deliveryDetails) {
    return <Text style={styles.errorText}>Failed to load delivery details.</Text>;
  }

  const { driverName, driverPhone, pickupName, pickupAddress, deliveryAddress, rate, carMake, carModel, carYear } = deliveryDetails;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Delivery Details</Text>
      <Text>Driver Name: {drvName}</Text>
      <Text>Driver Phone: {drvPhone}</Text>
      <Text>Pickup Name: {cus_name}</Text>
      <Text>Pickup Address: {cus_address}</Text>
      <Text>Delivery Address: {cus_add1}</Text>
      <Text>Rate: ${tot_carr_cost}</Text>
      <Text>Car Make: {year}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default DeliveryScreen;
