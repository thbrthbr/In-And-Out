import create from "zustand";

const useStore = create((set) => ({
  profileImage: null,
  setprofileImage: (input) => set({ profileImage: input }),
}));

export default useStore;
