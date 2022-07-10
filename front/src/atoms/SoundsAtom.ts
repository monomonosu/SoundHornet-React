import { atom } from "recoil"
import { Howl, Howler } from 'howler';

interface MusicResource {
    howl: Howl,
    musicName: string,
    group: string,
    filePath: string,
}

export const soundsAtom = atom<MusicResource[]>({
    key: "soundsAtom",
    default: [],
})