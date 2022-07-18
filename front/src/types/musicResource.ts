import { Howl } from "howler"

export type MusicResource = {
    howl: Howl | undefined,
    id: number | undefined,
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
