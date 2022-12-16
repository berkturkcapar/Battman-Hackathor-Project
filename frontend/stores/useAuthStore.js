import React from "react";
import create from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) =>
    set((state) => ({
      user: {
        ...state.user,
        ...user,
      },
    })),
}));
