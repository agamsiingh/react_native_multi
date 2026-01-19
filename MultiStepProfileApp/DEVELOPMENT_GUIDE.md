# Development Guide & Troubleshooting

## Getting Started

### Initial Setup

1. **Install Node.js** (version 20 or higher)
   ```bash
   node --version  # Check version
   ```

2. **Install Dependencies**
   ```bash
   cd "C:\Users\agamc\OneDrive\Desktop\New folder\MultiStepProfileApp"
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Run on Android** (in new terminal)
   ```bash
   npm run android
   ```

5. **Run on iOS** (in new terminal)
   ```bash
   npm run ios
   ```

## Development Workflow

### Making Changes

1. Edit component files in `src/` directory
2. Save file (auto-reload in React Native)
3. Test in emulator/device
4. Check console for errors

### Adding New Features

#### Add a New Screen
```typescript
// 1. Create screen file: src/screens/MyNewScreen.tsx
export const MyNewScreen: React.FC<MyNewScreenProps> = ({ navigation }) => {
  return <View>...</View>;
};

// 2. Add to Navigation types: src/types/Navigation.ts
export type RootStackParamList = {
  ...,
  MyNew: undefined,
};

// 3. Add to Navigator: src/navigation/RootNavigator.tsx
<Stack.Screen
  name="MyNew"
  component={MyNewScreen}
  options={{ title: 'My New Screen' }}
/>

// 4. Navigate from other screens
navigation.navigate('MyNew');
```

#### Add a Redux Action
```typescript
// 1. In src/redux/profilesSlice.ts
const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    // Add new reducer
    myNewAction: (state, action: PayloadAction<string>) => {
      // Update state
      state.someField = action.payload;
    }
  }
});

// 2. Export action
export const { myNewAction } = profilesSlice.actions;

// 3. Use in component
import { myNewAction } from '../redux/profilesSlice';
const dispatch = useDispatch<AppDispatch>();
dispatch(myNewAction('value'));
```

## Common Issues & Solutions

### Issue 1: "Module not found" errors

**Problem:**
```
Error: Cannot find module '@react-navigation/native'
```

**Solution:**
```bash
npm install @react-navigation/native @react-navigation/stack
```

### Issue 2: TypeScript errors after changes

**Problem:**
```
src/screens/HomeScreen.tsx:10:5 - error TS2345: ...
```

**Solution:**
```bash
# Check TypeScript compilation
npx tsc --noEmit

# Fix any type mismatches in the file
```

### Issue 3: Form data not persisting when navigating back

**Problem:**
Data is lost when you go back from Step 2 to Step 1.

**Solution:**
This is expected behavior. The data is in Redux draftProfile. Make sure to:
1. Use the "Back" button (not Android back gesture on first try)
2. Check that setDraftProfile is being called before navigation

```typescript
const handleBack = () => {
  // Save current data first
  dispatch(setDraftProfile({ city, state, country }));
  // Then navigate back
  navigation.goBack();
};
```

### Issue 4: Edit button not pre-filling form

**Problem:**
Form appears empty when editing a profile.

**Solution:**
Verify in HomeScreen that editProfile is dispatched correctly:

```typescript
const handleEditProfile = (profileId: string) => {
  const profile = profiles.find((p) => p.id === profileId);
  if (profile) {
    // Make sure to dispatch the action
    dispatch(editProfile(profile));
    navigation.navigate('BasicInfo');
  }
};
```

### Issue 5: Redux state not updating UI

**Problem:**
UI doesn't update when Redux state changes.

**Solution:**
Ensure you're using the correct Redux hook:

```typescript
// ✅ Correct
const profiles = useSelector((state: RootState) => state.profiles.profiles);

// ❌ Wrong - this creates a new object reference every time
const state = useSelector((state: RootState) => state.profiles);
```

### Issue 6: Navigation not working

**Problem:**
`navigation.navigate()` doesn't work or throws error.

**Solution:**
1. Check screen name is in RootStackParamList:
```typescript
// src/types/Navigation.ts
export type RootStackParamList = {
  Home: undefined;
  BasicInfo: undefined;  // Must be defined
  // ...
};
```

2. Check screen is registered in Navigator:
```typescript
// src/navigation/RootNavigator.tsx
<Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
```

### Issue 7: Validation alerts not showing

**Problem:**
`Alert.alert()` doesn't appear.

**Solution:**
Alert requires proper import:

```typescript
import { Alert } from 'react-native';

// Usage
Alert.alert(
  'Title',
  'Message',
  [
    { text: 'Cancel', style: 'cancel' },
    { text: 'OK', onPress: () => {} }
  ]
);
```

### Issue 8: Styles not applying

**Problem:**
StyleSheet styles not working correctly.

**Solution:**
Check that you're using the correct style property names:

```typescript
// ❌ Wrong
{ paddingBottomWidth: 1 }  // Property doesn't exist

// ✅ Correct
{ 
  paddingBottom: 1,
  borderBottomWidth: 1
}
```

### Issue 9: Form fields not updating

**Problem:**
TextInput onChange doesn't update state.

**Solution:**
Ensure useState is working:

```typescript
// Correct pattern
const [fullName, setFullName] = useState(initialValue);

<TextInput
  value={fullName}
  onChangeText={setFullName}  // Not onChange!
/>
```

### Issue 10: App crashes on submit

**Problem:**
App crashes when submitting profile.

**Solution:**
Check that draftProfile has all required fields:

```typescript
const handleSubmit = () => {
  // Validate data exists
  if (!draftProfile || !draftProfile.fullName) {
    Alert.alert('Error', 'Please fill all fields');
    return;
  }
  
  dispatch(submitProfile());
  navigation.reset({
    index: 0,
    routes: [{ name: 'Home' }],
  });
};
```

## Performance Tips

### 1. Memoize Selectors
```typescript
// ✅ Good - selector is created once
const selectProfiles = (state: RootState) => state.profiles.profiles;
const profiles = useSelector(selectProfiles);

// ❌ Not good - new function every render
const profiles = useSelector(state => state.profiles.profiles);
```

### 2. Use Multiple Selectors
```typescript
// ✅ Better - separate selectors
const profiles = useSelector((state: RootState) => state.profiles.profiles);
const draft = useSelector((state: RootState) => state.profiles.draftProfile);

// ❌ Less efficient - more re-renders
const allState = useSelector((state: RootState) => state.profiles);
const { profiles, draftProfile } = allState;
```

### 3. Avoid Creating Objects in Render
```typescript
// ✅ Define outside component
const myStyle = StyleSheet.create({ ... });

// ❌ Avoid creating in render
const myObj = { city: '', state: '' };  // New object every render
```

## Debugging Tips

### 1. Console Logging
```typescript
// Log Redux state
console.log('Profile State:', draftProfile);

// Log navigation params
console.log('Navigation params:', navigation.getState());

// Log form values before submit
console.log('Form values:', { fullName, email, age });
```

### 2. Redux DevTools (Advanced)
```typescript
// Can integrate Redux DevTools browser extension
import { composeWithDevTools } from 'redux-devtools-extension';

// Use in store configuration
configureStore({
  reducer: {...},
  enhancers: [composeWithDevTools()]
});
```

### 3. React Navigation Logging
```typescript
// In RootNavigator
const linking = {
  prefixes: ['http://localhost:3000', ''],
};

// Check current route
console.log('Current route:', navigation.getState().routes);
```

### 4. Check Component Re-renders
```typescript
// Add at top of component to see when it renders
useEffect(() => {
  console.log('HomeScreen rendered');
}, []);
```

## Testing Checklist

- [ ] Create profile with valid data
- [ ] Try to create with invalid data (test validation)
- [ ] Edit existing profile
- [ ] Delete profile with confirmation
- [ ] Navigate through all screens
- [ ] Check back button preserves data
- [ ] Verify Redux state with multiple profiles
- [ ] Test empty state (no profiles)
- [ ] Try email validation
- [ ] Try age range validation
- [ ] Test form submission reset

## Code Quality Checklist

- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] All imports are correct
- [ ] No unused variables
- [ ] Consistent naming conventions
- [ ] Comments on complex logic
- [ ] Error handling in all cases
- [ ] Validation on all forms
- [ ] Proper TypeScript types
- [ ] No console.log left in production code
- [ ] Styling is consistent

## Git Workflow (If Using Version Control)

```bash
# Check status
git status

# Add changes
git add .

# Commit with message
git commit -m "Add feature description"

# Push to remote
git push origin main
```

## Useful Commands

```bash
# Install specific package
npm install package-name

# Remove package
npm uninstall package-name

# Update packages
npm update

# Run tests
npm test

# Build for production
npm run build

# Lint code (if configured)
npm run lint

# Format code with Prettier
npx prettier --write src/
```

## Useful Extensions (VS Code)

- **ES7+ React/Redux/React-Native snippets** - Code snippets
- **TypeScript Vue Plugin** - Type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Thunder Client** or **REST Client** - API testing
- **React Native Tools** - React Native debugging

## File Size Tips

Monitor app size:
```bash
# Check bundle size
npm run build
ls -lh build/

# Check installed packages
npm ls
```

## Useful Links

- [React Native Docs](https://reactnative.dev)
- [React Navigation Docs](https://reactnavigation.org)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hooks Docs](https://react.dev/reference/react)

## Getting Help

1. **Check console for errors**
   - Look at red/yellow messages in React Native terminal

2. **Search GitHub issues**
   - React Native repo
   - React Navigation repo
   - Redux Toolkit repo

3. **Ask on Stack Overflow**
   - Tag: `react-native` `redux` `typescript`

4. **Check existing documentation**
   - PROJECT_STRUCTURE.md
   - QUICK_REFERENCE.md
   - IMPLEMENTATION_SUMMARY.md

## Future Enhancements

When ready to expand the app:

1. **Persistence**
   ```bash
   npm install @react-native-async-storage/async-storage
   ```

2. **Forms Library**
   ```bash
   npm install formik yup
   ```

3. **Image Handling**
   ```bash
   npm install react-native-image-picker
   ```

4. **API Calls**
   ```bash
   npm install axios
   ```

5. **State Persistence**
   ```bash
   npm install redux-persist
   ```

---

This guide covers the most common development issues and how to resolve them. Keep it handy while developing!
