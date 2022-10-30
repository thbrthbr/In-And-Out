import create from "zustand";
import { persist } from "zustand/middleware";

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
      gender: "",
      setGender: (input) => set({ gender: input }),
    }),
    {
      name: "login-stuff",
      getStorage: () => sessionStorage,
    }
  )
);

const backUpStore = create(
  persist(
    (set) => ({
      BU_id: "",
      setBU_Id: (input) => set({ BU_id: input }),
      BU_password: "",
      setBU_Password: (input) => set({ BU_password: input }),
      BU_nickname: "",
      setBU_Nickname: (input) => set({ BU_nickname: input }),
      BU_phoneNumber: "",
      setBU_PhoneNumber: (input) => set({ BU_phoneNumber: input }),
      BU_birthdate: "",
      setBU_Birthdate: (input) => set({ BU_birthdate: input }),
      BU_residence: "",
      setBU_Residence: (input) => set({ BU_residence: input }),
      BU_gender: "",
      setBU_Gender: (input) => set({ BU_gender: input }),
    }),
    {
      name: "BU-login-stuff",
      getStorage: () => sessionStorage,
    }
  )
);

export { useStore, useStore2, useStore3, loginStore, backUpStore };
