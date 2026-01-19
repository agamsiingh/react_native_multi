# Quick Reference Guide

## Redux Actions

### setDraftProfile
Updates the draft profile with partial data (merges with existing draft).
```typescript
dispatch(setDraftProfile({
  fullName: 'John Doe',
  email: 'john@example.com',
  age: 30
}));
```

### submitProfile
Saves the current draft profile to the profiles list and clears the draft.
```typescript
dispatch(submitProfile());
```

### editProfile
Loads an existing profile into the draft for editing.
```typescript
dispatch(editProfile(profileObject));
```

### deleteProfile
Removes a profile by ID.
```typescript
dispatch(deleteProfile(profileId));
```

### clearDraft
Clears the draft profile (useful when starting a new profile).
```typescript
dispatch(clearDraft());
```

## Screen Navigation Props

All screens receive navigation props with these methods:
- `navigation.navigate(screenName)` - Navigate to a screen
- `navigation.goBack()` - Go back to previous screen
- `navigation.reset()` - Reset navigation stack

## Redux Selectors

Access Redux state:
```typescript
const profiles = useSelector((state: RootState) => state.profiles.profiles);
const draftProfile = useSelector((state: RootState) => state.profiles.draftProfile);
const loading = useSelector((state: RootState) => state.profiles.loading);
```

## Useful Patterns

### Accessing Draft Data in Forms
```typescript
const draftProfile = useSelector((state: RootState) => state.profiles.draftProfile);
const [fullName, setFullName] = useState(draftProfile?.fullName || '');
```

### Saving Form Data
```typescript
dispatch(setDraftProfile({
  fullName: fullName.trim(),
  email: email.trim(),
  age: Number(age)
}));
navigation.navigate('NextScreen');
```

### Form Validation
```typescript
const validateFields = (): boolean => {
  if (!fullName.trim()) {
    Alert.alert('Validation Error', 'Please enter your full name.');
    return false;
  }
  return true;
};
```

## Import Statements

### In Screen Components
```typescript
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setDraftProfile } from '../redux/profilesSlice';
import { BasicInfoScreenProps } from '../types/Navigation';
```

### In App.tsx
```typescript
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { RootNavigator } from './src/navigation/RootNavigator';
```

## Common Tasks

### Add a New Screen
1. Create component in `src/screens/MyScreen.tsx`
2. Add type definition in `src/types/Navigation.ts`
3. Add to `RootStackParamList` type
4. Import in `src/navigation/RootNavigator.tsx`
5. Add `<Stack.Screen>` component

### Add a New Redux Action
1. Add reducer function to `profilesSlice.ts`
2. Export action from the slice
3. Dispatch from component: `dispatch(actionName(payload))`

### Validate a Form Field
```typescript
if (!value.trim()) {
  Alert.alert('Error', 'Field is required');
  return false;
}
```

## Styling Tips

- Use consistent spacing (8px, 12px, 16px increments)
- Standard button height: 44pt (iOS Human Interface Guidelines)
- Color palette:
  - Primary: `#007AFF` (Apple Blue)
  - Success: `#34C759` (Apple Green)
  - Danger: `#FF3B30` (Apple Red)
  - Secondary: `#888` (Gray)
  - Text: `#333`, `#666`, `#999`
  - Background: `#f5f5f5`, `#fff`

## Debugging Tips

### Check Redux State
```typescript
import { useSelector } from 'react-redux';
const state = useSelector((state: RootState) => state.profiles);
console.log('Profile State:', state);
```

### Debug Navigation
Add to RootNavigator for debugging:
```typescript
const navigationRef = useNavigationContainerRef();
// Check current route: navigationRef.getCurrentRoute()
```

### Alert Box
```typescript
Alert.alert(
  'Title',
  'Message',
  [
    { text: 'Cancel', style: 'cancel' },
    { text: 'OK', onPress: () => {} }
  ]
);
```
