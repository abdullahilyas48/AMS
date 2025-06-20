import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  Dimensions, Platform, ScrollView, ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const backgroundImage = require('../assets/AdminBg.png');

export default function DutyAssignment({ navigation }) {
  const [taskName, setTaskName] = useState('');
  const [staffName, setStaffName] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');
  const [frequency, setFrequency] = useState('');
  const [location, setLocation] = useState('');

  const handleAssign = async () => {
    if (!taskName || !staffName || !taskDescription || !frequency || !location) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    const validFrequencies = ['daily', 'weekly', 'monthly'];
    if (!validFrequencies.includes(frequency)) {
      Alert.alert("Invalid Frequency", "Frequency must be one of: daily, weekly, monthly.");
      return;
    }

    const formattedDate = new Date(date).toISOString();
    const formattedTime = time.toTimeString().split(' ')[0];

    try {
      const response = await axios.post('http://192.168.1.113:7798/assign-duty', {
        taskName,
        staffName,
        date: formattedDate,
        time: formattedTime,
        taskDescription,
        frequency,
        location,
      });

      Alert.alert("Success", "Duty assigned successfully!");
      clearForm();
    } catch (error) {
      const message = error.response?.data?.error || "Failed to assign duty.";
      Alert.alert("Error", message);
    }
  };

  const clearForm = () => {
    setTaskName('');
    setStaffName('');
    setDate(new Date());
    setTime(new Date());
    setTaskDescription('');
    setFrequency('');
    setLocation('');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('StaffDashboard')}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Duty Assignment</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Task Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter task name"
                  value={taskName}
                  onChangeText={setTaskName}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Staff Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter staff name"
                  value={staffName}
                  onChangeText={setStaffName}
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Date</Text>
                <TouchableOpacity 
                  style={styles.dateInput} 
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text>{date.toISOString().split('T')[0]}</Text>
                  <Ionicons name="calendar" size={18} color="#8d56aa" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Time</Text>
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Text>{time.toTimeString().split(' ')[0]}</Text>
                  <Ionicons name="time" size={18} color="#8d56aa" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.fullWidthInputContainer}>
              <Text style={styles.label}>Task Description</Text>
              <TextInput
                style={styles.fullWidthTextArea}
                placeholder="Task Description"
                multiline
                numberOfLines={4}
                value={taskDescription}
                onChangeText={setTaskDescription}
              />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Frequency</Text>
                <TextInput
                  style={styles.input}
                  placeholder="daily/weekly/monthly"
                  value={frequency}
                  onChangeText={(text) => setFrequency(text.toLowerCase())}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Location</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter location"
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleAssign}>
              <Text style={styles.submitButtonText}>Assign Duty</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.clearButton} onPress={clearForm}>
              <Text style={styles.clearButtonText}>Clear Form</Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) setTime(selectedTime);
              }}
            />
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#8d56aa',
    paddingVertical: 20,
    paddingTop: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  formContainer: {
    padding: 20,
    gap: 15,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f4f0fa',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dateInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  fullWidthInputContainer: {
    width: '100%',
  },
  fullWidthTextArea: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: '#8d56aa',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  clearButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: '#fff',
  },
  clearButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
});
