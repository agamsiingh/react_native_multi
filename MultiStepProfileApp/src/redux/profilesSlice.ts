import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, PartialProfile } from '../types/Profile';

interface ProfilesState {
  profiles: Profile[];
  draftProfile: PartialProfile | null;
  loading: boolean;
}

const initialState: ProfilesState = {
  profiles: [],
  draftProfile: null,
  loading: false,
};

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setDraftProfile: (state, action: PayloadAction<PartialProfile>) => {
      state.draftProfile = {
        ...state.draftProfile,
        ...action.payload,
      };
    },
    submitProfile: (state) => {
      if (state.draftProfile) {
        const newProfile: Profile = {
          id: Date.now().toString(),
          fullName: state.draftProfile.fullName || '',
          email: state.draftProfile.email || '',
          age: state.draftProfile.age || 0,
          city: state.draftProfile.city || '',
          state: state.draftProfile.state || '',
          country: state.draftProfile.country || '',
        };
        state.profiles.push(newProfile);
        state.draftProfile = null;
      }
    },
    editProfile: (state, action: PayloadAction<Profile>) => {
      state.draftProfile = { ...action.payload };
    },
    deleteProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter(
        (profile) => profile.id !== action.payload,
      );
    },
    clearDraft: (state) => {
      state.draftProfile = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setDraftProfile,
  submitProfile,
  editProfile,
  deleteProfile,
  clearDraft,
  setLoading,
} = profilesSlice.actions;

export default profilesSlice.reducer;
