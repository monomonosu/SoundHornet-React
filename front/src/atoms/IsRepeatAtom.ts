import { atom } from "recoil"

export const isRepeatAtom = atom<boolean>({
    key: "isRepeatAtom",
    default: false,
})