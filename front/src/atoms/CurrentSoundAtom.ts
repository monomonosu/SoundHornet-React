import { atom } from "recoil"
import { Howl } from 'howler';

interface MusicResource {
    howl: Howl | null,
    filePath: string | null,
}

export const currentSoundAtom = atom<MusicResource>({
    key: "currentSoundAtom",
    default: { howl: null, filePath: null },
})