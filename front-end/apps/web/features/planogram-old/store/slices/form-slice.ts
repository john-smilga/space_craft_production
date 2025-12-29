import type { StateCreator } from 'zustand';

export type FormSlice = {
  // Display dimensions (set by display selection)
  widthIn: number;
  heightIn: number;

  // Actions
  setWidthIn: (width: number) => void;
  setHeightIn: (height: number) => void;
  initializeDisplayDimensions: (data: {
    width_in?: number;
    height_in?: number;
  }) => void;
}

export const createFormSlice: StateCreator<FormSlice> = (set) => ({
  // Initial state
  widthIn: 0,
  heightIn: 0,

  // Actions
  setWidthIn: (width) => set({ widthIn: width }),
  setHeightIn: (height) => set({ heightIn: height }),
  initializeDisplayDimensions: (data) =>
    set((state) => ({
      widthIn: data.width_in || state.widthIn,
      heightIn: data.height_in || state.heightIn,
    })),
});

