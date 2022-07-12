export type Music = {
    id: number;
    musicName: string;
    group: string;
    album: string;
    genre: string;
    evaluation: number;
    comment: string;
    time: string;
    fileType: string;
    fileSize: string;
    fileName: string;
    music_photo: {
        id: number,
        musicId: number,
        fileName: string,
        fileType: string,
        fileSize: string,
        path: string,
    };
    createdAt: Date;
    updatedAt: Date;
}