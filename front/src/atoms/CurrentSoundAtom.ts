import { atom } from "recoil"
import { Howl } from 'howler';

interface MusicResource {
    howl: Howl | undefined,
    filePath: string | undefined,
    music_photo: object | undefined;
}

export const currentSoundAtom = atom<MusicResource>({
    key: "currentSoundAtom",
    default: { howl: undefined, filePath: undefined, music_photo: undefined },
})