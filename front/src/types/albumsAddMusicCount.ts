// アルバムに紐づいた音源数を扱う場合はこちらを使用する。
export type AlbumAddMusicCount = {
    id: number,
    albumName: string,
    musicsCount: number,
    album_photo: {
        id: number,
        albumId: number,
        fileName: string,
        fileType: string,
        fileSize: string,
        path: string,
    };
    createdAt: Date;
    updatedAt: Date;
}
