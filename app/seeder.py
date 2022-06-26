from statistics import mode
from models import *


def seeder():
    models = [Music, Music_Photo, Group, Genre]

    for model in models:
        db.session.query(model).delete()
        db.session.commit()

    # -----Musics-----
    print('---Musics---')
    musics = [
        Music(musicName='魔王魂 シャイニングスター', group='魔王魂', album='シャイニングスター', genre='pop',
              evaluation=3, comment='明るい曲', duration=276.5556, time='4:36', fileType='mp3', fileSize='5.27 MB',
              fileName='魔王魂 シャイニングスター.mp3',),
        Music(musicName='魔王魂 ハルジオン', group='魔王魂', album='ハルジオン', genre='japaneseRock',
              evaluation=4, comment='和風な感じ', duration=300.0456, time='5:00', fileType='mp3', fileSize='5.72 MB',
              fileName='魔王魂 ハルジオン.mp3',),
        Music(musicName='魔王魂 ベガロスト', group='魔王魂', album='ベガロスト', genre='rock',
              evaluation=5, comment='悲し気で癖になる曲', duration=299.880083, time='4:59', fileType='mp3', fileSize='6.86 MB',
              fileName='魔王魂 ベガロスト.mp3',),
    ]
    db.session.add_all(musics)
    db.session.commit()
    musics = Music.query.all()
    for music in musics:
        print(music.musicName)

    # -----Music_Photo-----
    print('---Music_Photo---')
    musicPhotos = [
        Music_Photo(musicId=1, fileName='field.jpg', fileType='jpg', fileSize='432KB',
                    path='static/photos/field.jpg',),
        Music_Photo(musicId=2, fileName='erigeron.jpg', fileType='jpg', fileSize='445KB',
                    path='static/photos/erigeron.jpg',),
        Music_Photo(musicId=3, fileName='forest.jpg', fileType='jpg', fileSize='3.17MB',
                    path='static/photos/forest.jpg',),
    ]
    db.session.add_all(musicPhotos)
    db.session.commit()
    musicPhotos = Music_Photo.query.all()
    for photo in musicPhotos:
        print(photo.fileName)

    # -----Groups-----
    print('---Groups---')
    groups = [
        Group(groupName='魔王魂'),
    ]
    db.session.add_all(groups)
    db.session.commit()
    groups = Group.query.all()
    for group in groups:
        print(group.groupName)

    # -----Genres-----
    print('---Genres---')
    genres = [
        Genre(genreName='pop'),
        Genre(genreName='japaneseRock'),
        Genre(genreName='rock'),
    ]
    db.session.add_all(genres)
    db.session.commit()
    genres = Genre.query.all()
    for genre in genres:
        print(genre.genreName)


if __name__ == '__main__':
    seeder()
