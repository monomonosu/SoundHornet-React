import { atom } from "recoil"
import { MusicResource } from '../types/musicResource'

export const currentSoundAtom = atom<MusicResource>({
    key: "currentSoundAtom",
    default: { howl: undefined, id: undefined, filePath: undefined, musicName: undefined, group: undefined, music_photo: undefined },
})
