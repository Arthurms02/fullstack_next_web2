'use client';

import { create } from 'zustand';

interface ScheduleFilter {
  date: string | null;
  barberId: string | null;
  barberiaId: string | null;
}

interface SchedulingState {
  selectedSchedule: any | null;
  schedules: any[];
  filters: ScheduleFilter;
  loading: boolean;
  
  // Actions
  setSelectedSchedule: (schedule: any) => void;
  setSchedules: (schedules: any[]) => void;
  addSchedule: (schedule: any) => void;
  removeSchedule: (scheduleId: string) => void;
  
  updateFilters: (filters: Partial<ScheduleFilter>) => void;
  resetFilters: () => void;
  
  setLoading: (loading: boolean) => void;
  clear: () => void;
}

const initialFilters: ScheduleFilter = {
  date: null,
  barberId: null,
  barberiaId: null,
};

export const useSchedulingStore = create<SchedulingState>((set) => ({
  selectedSchedule: null,
  schedules: [],
  filters: initialFilters,
  loading: false,
  
  setSelectedSchedule: (schedule) => set({ selectedSchedule: schedule }),
  
  setSchedules: (schedules) => set({ schedules }),
  
  addSchedule: (schedule) => 
    set((state) => ({
      schedules: [...state.schedules, schedule],
    })),
  
  removeSchedule: (scheduleId) =>
    set((state) => ({
      schedules: state.schedules.filter((s) => s.id !== scheduleId),
    })),
  
  updateFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  
  resetFilters: () => set({ filters: initialFilters }),
  
  setLoading: (loading) => set({ loading }),
  
  clear: () => set({
    selectedSchedule: null,
    schedules: [],
    filters: initialFilters,
    loading: false,
  }),
}));