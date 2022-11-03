import create from "zustand";
import { persist } from "zustand/middleware";
import { format, addMonths, subMonths } from "date-fns";

const useStore = create(
  persist((set) => ({
    profileImage: null,
    setProfileImage: (input) => set({ profileImage: input }),
  }))
);

const useStore2 = create(
  persist(
    (set) => ({
      logState: false,
      setLogState: (input) => set({ logState: input }),
    }),
    {
      name: "logState",
      getStorage: () => sessionStorage,
    }
  )
);

const useStore3 = create((set) => ({
  async tempFunc(id, password) {
    const response = await fetch("http://localhost:4000/users");

    if (response.ok) {
      const users = await response.json();
      const user = users.find((user) => user.id === id);
      if (!user || user.password !== password) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
      }

      return user;
    }
    throw new Error("서버 통신이 원할하지 않습니다.");
  },
}));

const loginStore = create(
  persist(
    (set) => ({
      id: "",
      setId: (input) => set({ id: input }),
      password: "",
      setPassword: (input) => set({ password: input }),
      nickname: "",
      setNickname: (input) => set({ nickname: input }),
      phoneNumber: "",
      setPhoneNumber: (input) => set({ phoneNumber: input }),
      birthdate: "",
      setBirthdate: (input) => set({ birthdate: input }),
      residence: "",
      setResidence: (input) => set({ residence: input }),
      gender: "female",
      setGender: (input) => set({ gender: input }),
    }),
    {
      name: "login-stuff",
      getStorage: () => sessionStorage,
    }
  )
);

const calenderStore = create((set, get) => ({
  showWrittenDiary: false,
  setShowWrittenDiary: (input) => set({ showWrittenDiary: input }),

  showNewDiary: false,
  setShowNewDiary: (input) => set({ showNewDiary: input }),

  diaryDate: "",
  setDiaryDate: (input) => set({ diaryDate: input }),

  detailDate: "",
  setDetailDate: (input) => set({ detailDate: input }),

  currentMonth: new Date(),
  setcurrentMonth: (input) => set({ currentMonth: input }),

  prevMonth: () => set({ currentMonth: subMonths(get().currentMonth, 1) }),

  nextMonth: () => set({ currentMonth: addMonths(get().currentMonth, 1) }),

  showselectedDate: new Date(),
  setSelectedDate: (input) => set({ selectedDate: input }),

  edit: false,
  setEdit: (input) => set({ edit: input }),

  specificDate: new Date(),
  setSpecificDate: (input) => set({ specificDate: input }),

  showInstanceTable: false,
  setShowInstanceTable: (input) => set({ showInstanceTable: input }),
}));

export { useStore, useStore2, useStore3, loginStore, calenderStore };
