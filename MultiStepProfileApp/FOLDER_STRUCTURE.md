# Complete Project Structure

## Directory Tree

```
MultiStepProfileApp/
│
├── src/                           # Main application source code
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── Profile.ts            # Profile and PartialProfile interfaces
│   │   └── Navigation.ts         # React Navigation screen props types
│   │
│   ├── redux/                    # Redux state management
│   │   ├── profilesSlice.ts      # Redux Toolkit slice with reducers
│   │   │   ├── initialState
│   │   │   ├── Reducers:
│   │   │   │  ├── setDraftProfile
│   │   │   │  ├── submitProfile
│   │   │   │  ├── editProfile
│   │   │   │  ├── deleteProfile
│   │   │   │  ├── clearDraft
│   │   │   │  └── setLoading
│   │   │   └── Exports: actions & reducer
│   │   │
│   │   └── store.ts              # Redux store configuration
│   │       ├── configureStore()
│   │       └── Type exports: RootState, AppDispatch
│   │
│   ├── screens/                  # Screen components
│   │   │
│   │   ├── HomeScreen.tsx        # Profile list (Home Screen)
│   │   │   ├── Displays all profiles
│   │   │   ├── Edit profile button
│   │   │   ├── Delete profile button
│   │   │   ├── + Add Profile button
│   │   │   └── Empty state message
│   │   │
│   │   ├── BasicInfoScreen.tsx   # Step 1: Basic Information
│   │   │   ├── Form inputs: fullName, email, age
│   │   │   ├── Form validation
│   │   │   ├── Save to Redux draftProfile
│   │   │   └── Next button → AddressInfo
│   │   │
│   │   ├── AddressInfoScreen.tsx # Step 2: Address Information
│   │   │   ├── Form inputs: city, state, country
│   │   │   ├── Form validation
│   │   │   ├── Back button → BasicInfo
│   │   │   └── Next button → Summary
│   │   │
│   │   └── SummaryScreen.tsx     # Step 3: Summary & Submission
│   │       ├── Display all profile data
│   │       ├── Organized into cards
│   │       ├── Edit button → BasicInfo
│   │       └── Submit button → Home
│   │
│   └── navigation/               # Navigation configuration
│       └── RootNavigator.tsx     # Stack Navigator setup
│           ├── NavigationContainer
│           ├── Stack.Navigator
│           └── 4 Screens:
│               ├── Home
│               ├── BasicInfo
│               ├── AddressInfo
│               └── Summary
│
├── App.tsx                       # Root component (Provider + Navigator)
│   ├── Redux Provider wrapping
│   └── SafeAreaProvider wrapping
│
├── android/                      # Android native code
├── ios/                          # iOS native code
│
├── __tests__/                    # Test files
├── node_modules/                 # Dependencies
│
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── jest.config.js                # Jest test configuration
├── metro.config.js               # Metro bundler config
├── babel.config.js               # Babel configuration
│
├── PROJECT_STRUCTURE.md          # Detailed feature documentation
├── QUICK_REFERENCE.md            # Developer quick reference guide
├── IMPLEMENTATION_SUMMARY.md     # Implementation overview
└── README.md                     # Original README
```

## File Descriptions

### Core Application Files

| File | Purpose |
|------|---------|
| `App.tsx` | Root component - wraps app with Redux Provider and Navigation |
| `src/types/Profile.ts` | Profile interface and partial type definitions |
| `src/types/Navigation.ts` | React Navigation screen prop types |
| `src/redux/store.ts` | Redux store setup with configureStore |
| `src/redux/profilesSlice.ts` | Redux Toolkit slice with all reducers and actions |
| `src/navigation/RootNavigator.tsx` | Stack navigation setup with 4 screens |
| `src/screens/HomeScreen.tsx` | Profile list with edit/delete/add functionality |
| `src/screens/BasicInfoScreen.tsx` | Step 1 form - basic information |
| `src/screens/AddressInfoScreen.tsx` | Step 2 form - address information |
| `src/screens/SummaryScreen.tsx` | Step 3 form - review and submit |

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies and scripts |
| `tsconfig.json` | TypeScript compiler options |
| `jest.config.js` | Jest testing configuration |
| `metro.config.js` | React Native Metro bundler config |
| `babel.config.js` | Babel transpiler configuration |

### Documentation Files

| File | Purpose |
|------|---------|
| `PROJECT_STRUCTURE.md` | Comprehensive feature and architecture docs |
| `QUICK_REFERENCE.md` | Developer quick reference with code examples |
| `IMPLEMENTATION_SUMMARY.md` | Summary of what was built |
| `README.md` | Project overview and setup instructions |

## Import Path Examples

### From a Screen Component
```typescript
// Import Redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setDraftProfile } from '../redux/profilesSlice';

// Import Types
import { Profile } from '../types/Profile';
import { BasicInfoScreenProps } from '../types/Navigation';

// Import Navigation
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
```

### From App.tsx
```typescript
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { RootNavigator } from './src/navigation/RootNavigator';
```

## Dependencies Installed

### Core Dependencies
```
react: 19.2.0
react-native: 0.83.1
```

### Navigation
```
@react-navigation/native
@react-navigation/stack
@react-navigation/native-stack
react-native-screens: ^5.5.2
react-native-safe-area-context: ^5.5.2
```

### State Management
```
@reduxjs/toolkit
react-redux
```

### Development Dependencies
```
typescript: ^5.9.3
@types/react: ^19.2.8
@types/react-native: ^0.72.8
jest: ^29.6.3
babel and related packages
```

## Data Flow Diagram

```
User Interaction (tap button)
           ↓
Component Event Handler
           ↓
dispatch(Redux Action)
           ↓
Redux Reducer Updates State
    - profiles array
    - draftProfile object
    - loading flag
           ↓
useSelector Hooks Update
           ↓
Component Re-renders with New Data
           ↓
UI Reflects Changes
```

## State Structure

```typescript
{
  profiles: [
    {
      id: "1705700000000",
      fullName: "John Doe",
      email: "john@example.com",
      age: 30,
      city: "New York",
      state: "NY",
      country: "USA"
    },
    // ... more profiles
  ],
  draftProfile: {
    fullName: "Jane Smith",
    email: "jane@example.com",
    age: 28,
    city: "Los Angeles",
    state: "CA",
    country: "USA"
  } | null,
  loading: false
}
```

## Navigation Stack Structure

```
RootNavigator (Stack.Navigator)
  │
  ├── Home Screen
  │    ├── [List of profiles]
  │    └── [+Add Profile] → navigates to BasicInfo
  │
  ├── BasicInfo Screen
  │    ├── [Form - Name, Email, Age]
  │    └── [Next] → AddressInfo
  │
  ├── AddressInfo Screen
  │    ├── [Form - City, State, Country]
  │    ├── [Back] → BasicInfo
  │    └── [Next] → Summary
  │
  └── Summary Screen
       ├── [Display profile data]
       ├── [Edit] → BasicInfo
       └── [Submit] → Home (reset navigation)
```

## Component Hierarchy

```
<App>
  <Provider store={store}>
    <SafeAreaProvider>
      <RootNavigator>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
            <Stack.Screen name="AddressInfo" component={AddressInfoScreen} />
            <Stack.Screen name="Summary" component={SummaryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </RootNavigator>
    </SafeAreaProvider>
  </Provider>
</App>
```

## Key Features by File

### HomeScreen.tsx
- ✅ FlatList of profiles
- ✅ Edit button with profile pre-fill
- ✅ Delete button with confirmation
- ✅ Add button (clears draft)
- ✅ Empty state messaging
- ✅ Redux selector usage

### BasicInfoScreen.tsx
- ✅ Three form inputs (controlled)
- ✅ Field validation (required, email format, age range)
- ✅ Error alerts
- ✅ Redux dispatch to draftProfile
- ✅ Next navigation

### AddressInfoScreen.tsx
- ✅ Three form inputs (controlled)
- ✅ Field validation (required)
- ✅ Data preservation on back
- ✅ Back navigation (goBack)
- ✅ Next navigation

### SummaryScreen.tsx
- ✅ Display profile data from Redux
- ✅ Two card sections (Basic + Address)
- ✅ Edit button (go back to Step 1)
- ✅ Submit button (create profile + reset nav)
- ✅ Error handling for missing data

### Redux Slice (profilesSlice.ts)
- ✅ 6 action creators
- ✅ Initial state
- ✅ Profile merge logic
- ✅ ID generation (timestamp)
- ✅ Proper TypeScript typing

### Navigation (RootNavigator.tsx)
- ✅ NavigationContainer
- ✅ Stack Navigator with 4 screens
- ✅ Screen options (titles)
- ✅ TypeScript param typing
- ✅ Proper prop drilling

## Testing Coverage Areas

When testing, verify:
1. Profile CRUD operations (Create, Read, Update, Delete)
2. Form validation on all 3 steps
3. Data preservation during navigation
4. Redux state updates
5. Navigation flow
6. Empty state display
7. Multiple profile management

---

This complete structure provides a robust foundation for a production React Native app with Redux state management and multi-step forms.
