'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProfileSchemaType } from '@/app/perfil/_schemas/profileSchema';

interface ProfileState {
  profile: ProfileSchemaType | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  setProfile: (profile: ProfileSchemaType) => void;
  updateProfile: (partial: Partial<ProfileSchemaType>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      loading: false,
      error: null,
      
      setProfile: (profile) => set({ profile, error: null }),
      
      updateProfile: (partial) => 
        set((state) => ({
          profile: state.profile 
            ? { ...state.profile, ...partial }
            : null,
        })),
      
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearProfile: () => set({ profile: null, loading: false, error: null }),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);