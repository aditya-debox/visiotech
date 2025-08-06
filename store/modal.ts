import { create } from "zustand";

type ModalState = {
  triggerModal: boolean;
  setTriggerModal: (data: boolean) => void;
};

const ModalStore = create<ModalState>((set) => ({
  triggerModal: false,
  setTriggerModal: (data: boolean) => set({ triggerModal: data }),
}));

export default ModalStore;
