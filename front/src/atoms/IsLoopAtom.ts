import { atom } from "recoil"

export const isLoopAtom = atom<boolean>({
    key: "isLoopAtom",
    default: false,
})