import { atom } from "recoil"
import { Howl, Howler } from 'howler';

interface MusicResource {
    howl: Howl,
    filePath: string,
}

export const soundsAtom = atom<MusicResource[]>({
    key: "soundsAtom",
    default: [],
})