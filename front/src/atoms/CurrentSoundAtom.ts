import { atom } from "recoil"
import { Howl } from 'howler';

interface MusicResource {
    howl: Howl | undefined,
    musicName: string | undefined,
    group: string | undefined,
    filePath: string | undefined,
    music_photo: {
        id: number,
        musicId: number,
        fileName: string,
        fileType: string,
        fileSize: string,
        path: string,
    } | undefined
}

export const currentSoundAtom = atom<MusicResource>({
    key: "currentSoundAtom",
    default: { howl: undefined, filePath: undefined, musicName: undefined, group: undefined, music_photo: undefined },
})