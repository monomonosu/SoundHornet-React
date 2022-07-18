import { atom } from "recoil"
import { MusicResource } from '../types/musicResource'

export const soundsAtom = atom<MusicResource[]>({
    key: "soundsAtom",
    default: [],
})