import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setDraftProfile } from '../redux/profilesSlice';
import { AddressInfoScreenProps } from '../types/Navigation';

const AddressInfoScreen: React.FC<AddressInfoScreenProps> = ({
  navigation,
}) => {
  const draftProfile = useSelector(
    (state: RootState) => state.profiles.draftProfile,
  );
  const dispatch = useDispatch<AppDispatch>();

  const [city, setCity] = useState(draftProfile?.city || '');
  const [state, setState] = useState(draftProfile?.state || '');
  const [country, setCountry] = useState(draftProfile?.country || '');

  const validateFields = (): boolean => {
    if (!city.trim()) {
      Alert.alert('Validation Error', 'Please enter your city.');
      return false;
    }
    if (!state.trim()) {
      Alert.alert('Validation Error', 'Please enter your state/province.');
      return false;
    }
    if (!country.trim()) {
      Alert.alert('Validation Error', 'Please enter your country.');
      return false;
    }
    return true;
  };

  const handleBack = () => {
    dispatch(
      setDraftProfile({
        city: city.trim(),
        state: state.trim(),
        country: country.trim(),
      }),
    );
    navigation.goBack();
  };

  const handleNext = () => {
    if (validateFields()) {
      dispatch(
        setDraftProfile({
          city: city.trim(),
          state: state.trim(),
          country: country.trim(),
        }),
      );
      navigation.navigate('Summary');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Enter Your Address</Text>
          <Text style={styles.sectionSubtitle}>
            Step 2 of 3: Complete your address information
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>City *</Text>
            <TextInput
              style={styles.input}
              placeholder="New York"
              placeholderTextColor="#999"
              value={city}
              onChangeText={setCity}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>State/Province *</Text>
            <TextInput
              style={styles.input}
              placeholder="NY"
              placeholderTextColor="#999"
              value={state}
              onChangeText={setState}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Country *</Text>
            <TextInput
              style={styles.input}
              placeholder="United States"
              placeholderTextColor="#999"
              value={country}
              onChangeText={setCountry}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.backButton]}
              onPress={handleBack}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.nextButton]}
              onPress={handleNext}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 32,
    gap: 12,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: '#888',
  },
  nextButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddressInfoScreen;
