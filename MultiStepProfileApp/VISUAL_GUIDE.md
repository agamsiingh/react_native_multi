# Visual App Guide

## Screen Flow Diagram

```
                    ┌─────────────────────┐
                    │   HOME SCREEN       │
                    │  (Profile List)     │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
           [+ Add]        [Edit]          [Delete]
                │              │              │
                └──────────────┼──────────────┘
                               │
                    ┌──────────▼──────────┐
                    │  BASIC INFO STEP 1  │
                    │ (Full Name, Email,  │
                    │    Age)             │
                    └──────────┬──────────┘
                               │
                           [Next]
                               │
                    ┌──────────▼──────────┐
         ┌─────────►│ ADDRESS INFO STEP 2 │◄────┐
         │          │ (City, State,       │     │
       [Back]       │    Country)         │  [Back]
         │          └──────────┬──────────┘     │
         │                     │                │
         │                 [Next]               │
         │                     │                │
         └──────────┌──────────▼──────────┬─────┘
                    │  SUMMARY STEP 3     │
                    │  (Review All Data)  │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                 [Edit]              [Submit]
                    │                     │
                    └─────────────┬───────┘
                                  │
                    ┌─────────────▼──────────┐
                    │   BACK TO HOME         │
                    │ (Profile Created/      │
                    │  Updated)             │
                    └────────────────────────┘
```

## Screen Mockups (Text-based)

### HOME SCREEN

```
┌─────────────────────────────────────┐
│ User Profiles                       │
└─────────────────────────────────────┘
│ [+ Add Profile]                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ John Doe                            │
│ john@example.com                    │
│ Age: 30 | New York, NY, USA         │
│                                     │
│    [Edit]          [Delete]         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Jane Smith                          │
│ jane@example.com                    │
│ Age: 28 | Los Angeles, CA, USA      │
│                                     │
│    [Edit]          [Delete]         │
└─────────────────────────────────────┘

"Profiles (2)"
```

### STEP 1: BASIC INFO SCREEN

```
┌─────────────────────────────────────┐
│ Enter Your Basic Information        │
│ This information will be used...    │
└─────────────────────────────────────┘

Full Name *
┌──────────────────────────────────────┐
│ John Doe                             │
└──────────────────────────────────────┘

Email Address *
┌──────────────────────────────────────┐
│ john@example.com                     │
└──────────────────────────────────────┘

Age *
┌──────────────────────────────────────┐
│ 30                                   │
└──────────────────────────────────────┘


                ┌──────────────────┐
                │     [Next]       │
                └──────────────────┘
```

### STEP 2: ADDRESS INFO SCREEN

```
┌─────────────────────────────────────┐
│ Enter Your Address                  │
│ Step 2 of 3: Complete your...       │
└─────────────────────────────────────┘

City *
┌──────────────────────────────────────┐
│ New York                             │
└──────────────────────────────────────┘

State/Province *
┌──────────────────────────────────────┐
│ NY                                   │
└──────────────────────────────────────┘

Country *
┌──────────────────────────────────────┐
│ United States                        │
└──────────────────────────────────────┘


    ┌──────────────┐  ┌──────────────┐
    │    [Back]    │  │    [Next]    │
    └──────────────┘  └──────────────┘
```

### STEP 3: SUMMARY SCREEN

```
┌─────────────────────────────────────┐
│ Review Your Profile                 │
│ Step 3 of 3: Verify all info...     │
└─────────────────────────────────────┘

┌─ Basic Information ─────────────────┐
│ Full Name:      John Doe            │
│ Email:          john@example.com    │
│ Age:            30                  │
└─────────────────────────────────────┘

┌─ Address Information ───────────────┐
│ City:           New York            │
│ State/Province: NY                  │
│ Country:        United States       │
└─────────────────────────────────────┘


    ┌──────────────┐  ┌──────────────┐
    │    [Edit]    │  │   [Submit]   │
    └──────────────┘  └──────────────┘
```

## User Workflows

### Workflow 1: Create New Profile

```
START
  ↓
[Home Screen] - Tap "+ Add Profile"
  ↓
[Step 1] - Enter: John Doe, john@test.com, 30
         - Tap Next
  ↓
[Step 2] - Enter: NYC, NY, USA
         - Tap Next
  ↓
[Step 3] - Review all data
         - Tap Submit
  ↓
[Home Screen] - New profile appears in list
  ↓
END
```

### Workflow 2: Edit Existing Profile

```
START
  ↓
[Home Screen] - Tap "Edit" on John Doe profile
  ↓
[Step 1] - Form pre-filled with: John Doe, john@test.com, 30
         - Change to: John D., john.d@test.com, 31
         - Tap Next
  ↓
[Step 2] - Form pre-filled with: NYC, NY, USA
         - Change to: Boston, MA, USA
         - Tap Next
  ↓
[Step 3] - Review updated data
         - Tap Submit
  ↓
[Home Screen] - John Doe's profile updated
  ↓
END
```

### Workflow 3: Delete Profile

```
START
  ↓
[Home Screen] - Tap "Delete" on Jane Smith
  ↓
[Alert Dialog] - "Are you sure?"
  ↓
- Tap "Delete" (in alert)
  ↓
[Home Screen] - Jane Smith removed from list
  ↓
END
```

### Workflow 4: Cancel Form (Back Navigation)

```
START
  ↓
[Home Screen] - Tap "+ Add Profile"
  ↓
[Step 1] - Enter some data
         - Tap Next
  ↓
[Step 2] - Realize missing info
         - Tap "Back"
  ↓
[Step 1] - Data still there! (preserved in Redux)
         - Update info
         - Tap Next
  ↓
[Step 2] - Continue normally
  ↓
END
```

## Redux State Changes

### When Creating a Profile

```
Initial State:
{
  profiles: [],
  draftProfile: null,
  loading: false
}
        ↓
User enters Step 1 data
        ↓
dispatch(setDraftProfile({fullName, email, age}))
        ↓
State After Step 1:
{
  profiles: [],
  draftProfile: {
    fullName: "John Doe",
    email: "john@test.com",
    age: 30
  },
  loading: false
}
        ↓
User enters Step 2 data
        ↓
dispatch(setDraftProfile({city, state, country}))
        ↓
State After Step 2:
{
  profiles: [],
  draftProfile: {
    fullName: "John Doe",
    email: "john@test.com",
    age: 30,
    city: "New York",
    state: "NY",
    country: "USA"
  },
  loading: false
}
        ↓
User submits form
        ↓
dispatch(submitProfile())
        ↓
Final State:
{
  profiles: [
    {
      id: "1705700000000",
      fullName: "John Doe",
      email: "john@test.com",
      age: 30,
      city: "New York",
      state: "NY",
      country: "USA"
    }
  ],
  draftProfile: null,
  loading: false
}
```

## Form Validation Visual Guide

### Step 1: Basic Info Validation

```
Field: Full Name
Input: "   " (empty/whitespace)
Result: ❌ Alert: "Please enter your full name."

Field: Email
Input: "notanemail"
Result: ❌ Alert: "Please enter a valid email address."

Field: Email
Input: "john@test.com"
Result: ✅ Valid

Field: Age
Input: "abc"
Result: ❌ Alert: "Please enter a valid age (0-150)."

Field: Age
Input: "200"
Result: ❌ Alert: "Please enter a valid age (0-150)."

Field: Age
Input: "30"
Result: ✅ Valid
```

### Step 2: Address Info Validation

```
Field: City
Input: "   " (empty/whitespace)
Result: ❌ Alert: "Please enter your city."

Field: City
Input: "New York"
Result: ✅ Valid

Field: State
Input: "" (empty)
Result: ❌ Alert: "Please enter your state/province."

Field: State
Input: "NY"
Result: ✅ Valid

Field: Country
Input: "" (empty)
Result: ❌ Alert: "Please enter your country."

Field: Country
Input: "United States"
Result: ✅ Valid
```

## Button Actions Reference

| Button | Screen | Action |
|--------|--------|--------|
| + Add Profile | Home | Clear draft, Navigate to Step 1 |
| Edit | Home | Load profile to draft, Navigate to Step 1 |
| Delete | Home | Show alert, Delete if confirmed |
| Next | Step 1 | Validate, Save to draft, Go to Step 2 |
| Back | Step 2 | Save current data, Return to Step 1 |
| Next | Step 2 | Validate, Save to draft, Go to Step 3 |
| Edit | Step 3 | Return to Step 1 |
| Submit | Step 3 | Create/update profile, Return to Home |

## Data Flow During Edit

```
Home Screen
    ↓
User taps Edit on "John Doe"
    ↓
dispatch(editProfile(johnDoeProfile))
    ↓
Redux updates draftProfile:
{
  id: "1705700000000",
  fullName: "John Doe",
  email: "john@test.com",
  age: 30,
  city: "New York",
  state: "NY",
  country: "USA"
}
    ↓
navigation.navigate('BasicInfo')
    ↓
BasicInfoScreen loads
    ↓
useSelector reads draftProfile from Redux
    ↓
Form inputs pre-fill with existing values:
  - fullName: "John Doe"
  - email: "john@test.com"
  - age: "30"
    ↓
User can modify values
    ↓
Tap Next
    ↓
dispatch(setDraftProfile({...updated values}))
    ↓
Redux state merges updates
    ↓
Continue through Steps 2 & 3
    ↓
Submit
    ↓
New profile created with same ID (replaces old)
```

## Error Handling Flow

```
User submits form with invalid data
        ↓
validateFields() returns false
        ↓
Alert.alert() shows error message
        ↓
User can edit and retry
        ↓
OR
        ↓
User navigates away (data saved in Redux)
        ↓
Later returns to form
        ↓
Data is still there! (Redux persists it)
```

---

This visual guide helps understand the complete user experience and data flow through the application.
