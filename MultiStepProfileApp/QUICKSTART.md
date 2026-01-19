# Quick Start Guide (5 Minutes)

## 1. Verify Dependencies ✓
Dependencies are already installed. To double-check:
```bash
cd "C:\Users\agamc\OneDrive\Desktop\New folder\MultiStepProfileApp"
npm list | grep -E "@react|redux"
```

## 2. Start Metro Bundler
```bash
npm start
```
Keep this terminal open - it watches for changes.

## 3. Run on Device (Choose One)

### Option A: Android
```bash
npm run android
```
(In a new terminal window)

### Option B: iOS
```bash
npm run ios
```

### Option C: Web/Expo
```bash
npm start
# Then press 'w' for web
```

## 4. Test the App

Once running, try these flows:

### Quick Test Flow
1. Tap **"+ Add Profile"**
2. Enter in Step 1:
   - Name: John Doe
   - Email: john@test.com
   - Age: 30
3. Tap **"Next"**
4. Enter in Step 2:
   - City: New York
   - State: NY
   - Country: USA
5. Tap **"Next"**
6. Review and tap **"Submit"**
7. ✅ Profile appears on home screen!

## 5. Try More Features

- Tap **"Edit"** on the profile to modify it
- Tap **"Delete"** to remove it
- Try entering **invalid data** to test validation
- Tap **"Back"** mid-form to see data preservation

## File Structure (What You Have)

```
src/
├── types/
│   ├── Profile.ts
│   └── Navigation.ts
├── redux/
│   ├── profilesSlice.ts
│   └── store.ts
├── screens/
│   ├── HomeScreen.tsx
│   ├── BasicInfoScreen.tsx
│   ├── AddressInfoScreen.tsx
│   └── SummaryScreen.tsx
└── navigation/
    └── RootNavigator.tsx

App.tsx (Root component)
```

## Common Tasks

### Edit a Screen
```
1. Edit file in src/screens/
2. Save file
3. App auto-reloads (hot reload)
4. Changes appear immediately
```

### Debug
```
Android: Shake device → Toggle Inspector
iOS: Press Cmd+D → Toggle Inspector
Web: F12 for DevTools
```

### Add a New Feature
1. Create file
2. Import in needed places
3. Add Redux action if needed
4. Implement and test

## Troubleshooting

| Problem | Solution |
|---------|----------|
| App won't start | `npm install` then restart |
| TypeScript errors | `npx tsc --noEmit` to check |
| Form data lost | Use Redux, not component state |
| Navigation fails | Check screen names match RootStackParamList |
| Styles look wrong | Check React Native style names (not CSS) |

## Documentation

Quick access to help:
- **PROJECT_STRUCTURE.md** - Full feature docs
- **QUICK_REFERENCE.md** - Code snippets
- **DEVELOPMENT_GUIDE.md** - Detailed setup
- **VISUAL_GUIDE.md** - Screen diagrams
- **BUILD_SUMMARY.md** - Project overview

## What You Can Do Right Now

✅ Create profiles
✅ Edit profiles  
✅ Delete profiles
✅ Multi-step forms
✅ Form validation
✅ Redux state
✅ Full navigation

## Next Steps

To add more features:
```bash
# Add persistence
npm install @react-native-async-storage/async-storage

# Add form validation library
npm install formik yup

# Add HTTP requests
npm install axios
```

## Hot Keys

- **Android**: Shake → Debug menu
- **iOS**: Cmd+D → Debug menu
- **Web**: F12 → Developer tools
- **All**: Ctrl+M (Android) / Cmd+M (iOS) → Menu

---

**That's it! You're ready to develop. 🚀**

Start with `npm start` and open a device to test!
