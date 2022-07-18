import { atom } from "recoil"
import { Howl, Howler } from 'howler';

interface MusicResource {
    howl: Howl,
    id: number,
    musicName: string,
    group: string,
    filePath: string,
    music_photo: {
        id: number,
        musicId: number,
        fileName: string,
        fileType: string,
        fileSize: string,
        path: string,
    } | undefined,
}

export const soundsAtom = atom<MusicResource[]>({
    key: "soundsAtom",
    default: [],
})