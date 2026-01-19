# Multi-Step Profile App

A modern React Native application built with TypeScript, Redux Toolkit, and React Navigation. This app allows users to create, edit, and manage user profiles through a multi-step form process.

## Features

### 1. Home Screen
- Display a list of all user profiles with complete information:
  - Name, Email, Age
  - City, State, Country
- **Edit Button**: Navigate back to the form to edit an existing profile
- **Delete Button**: Remove a profile with confirmation
- **+ Add Profile Button**: Start creating a new profile

### 2. Multi-Step Profile Form (Redux-based)

#### Step 1 – Basic Information
- Inputs: Full Name, Email Address, Age
- Field validation:
  - All fields are required
  - Email must contain "@"
  - Age must be between 0-150
- Data is saved to Redux `draftProfile`
- Navigation: Next → Step 2

#### Step 2 – Address Information
- Inputs: City, State/Province, Country
- Field validation: All fields are required
- Navigation:
  - Back → Step 1
  - Next → Summary

#### Step 3 – Summary
- Display all profile data from Redux
- Review information before submission
- Actions:
  - **Edit**: Return to Step 1 to modify data
  - **Submit**: Save profile to Redux and return to Home

### 3. Redux State Management

#### State Structure
```typescript
{
  profiles: Profile[],
  draftProfile: Partial<Profile> | null,
  loading: boolean
}
```

#### Actions
- `setDraftProfile`: Update draft profile with partial data
- `submitProfile`: Save draft profile to profiles list
- `editProfile`: Load a profile into draft for editing
- `deleteProfile`: Remove a profile by ID
- `clearDraft`: Reset draft profile to null
- `setLoading`: Set loading state

### 4. Navigation Structure

Stack Navigation with 4 screens:
```
Home
  ↓
BasicInfo ↔ AddressInfo → Summary
  ↑                         ↓
  └─────────────────────────┘
```

### 5. TypeScript Types

#### Profile Interface
```typescript
interface Profile {
  id: string;
  fullName: string;
  email: string;
  age: number;
  city: string;
  state: string;
  country: string;
}
```

## Project Structure

```
src/
├── types/
│   ├── Profile.ts          # Profile and PartialProfile interfaces
│   └── Navigation.ts       # React Navigation type definitions
├── redux/
│   ├── profilesSlice.ts    # Redux Toolkit slice with reducers
│   └── store.ts            # Redux store configuration
├── screens/
│   ├── HomeScreen.tsx      # Home screen component
│   ├── BasicInfoScreen.tsx # Step 1: Basic info form
│   ├── AddressInfoScreen.tsx # Step 2: Address info form
│   └── SummaryScreen.tsx   # Step 3: Summary & submission
└── navigation/
    └── RootNavigator.tsx   # React Navigation stack setup
```

## Getting Started

### Prerequisites
- Node.js >= 20
- React Native CLI or Expo CLI

### Installation

1. Install dependencies:
```bash
npm install
```

Dependencies include:
- `@react-navigation/native` - Navigation framework
- `@react-navigation/stack` - Stack navigation
- `@reduxjs/toolkit` - Redux state management
- `react-redux` - React Redux bindings
- `react-native-screens` - Native stack navigator

2. Run the app:

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

**Web (React Native Web):**
```bash
npm start
```

## Key Implementation Details

### Form Validation
All form fields include comprehensive validation:
- Required field checks
- Email format validation (contains "@")
- Age range validation (0-150)
- User-friendly error alerts

### State Persistence
- All profile data is stored in Redux memory
- Draft profiles are maintained during form navigation
- Submitting creates a new profile with unique ID (timestamp-based)

### Navigation Flow
- Multi-step forms maintain draft state across navigation
- Back button on Step 2 preserves data
- Summary page allows returning to Step 1 for editing
- Submission resets navigation stack to Home screen

### Styling
- Consistent design system using iOS-style colors
- Clear visual hierarchy with typography
- Responsive layout that works on various screen sizes
- Touch-friendly button sizes (minimum 44pt height)

## Usage Example

### Creating a Profile
1. Tap "+ Add Profile" on Home screen
2. Fill in basic information (Step 1)
3. Enter address details (Step 2)
4. Review all information (Step 3)
5. Tap Submit to save

### Editing a Profile
1. Tap "Edit" on any profile card
2. Modify basic information as needed
3. Update address if required
4. Review changes on Summary screen
5. Submit to save updates (replaces old profile)

### Deleting a Profile
1. Tap "Delete" on any profile card
2. Confirm deletion in the alert dialog
3. Profile is removed immediately

## Technical Stack

- **React Native 0.83.1** - UI Framework
- **TypeScript 5.9.3** - Type safety
- **Redux Toolkit** - State management
- **React Navigation 6** - Navigation framework
- **React Hooks** - Functional component patterns

## Development

### Code Standards
- Functional components only
- Proper TypeScript interfaces
- Redux Toolkit with slices
- React Hooks for state management
- No local component state for profile data (Redux only)

### Testing
Run tests with:
```bash
npm test
```

## Future Enhancements

- AsyncStorage for data persistence
- Image upload for profile pictures
- Search and filter functionality
- Export/Import profiles
- Dark mode support
- Profile categories or groups
- Validation using external libraries (e.g., Yup)
- API integration for backend storage

## License

This project is private.
