import { atom } from "recoil"
import type { Music } from "../types/musics"

export const musicsAtom = atom<Music[]>({
    key: "musicsAtom",
    default: [],
})