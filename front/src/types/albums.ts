export type Album = {
    id: number,
    albumName: string,
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