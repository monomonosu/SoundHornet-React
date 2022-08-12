import os
from flask import jsonify, render_template, request
from models import *
import math


# ---------- Page ----------
@app.route('/')
@app.route('/group-page')
@app.route('/album-page')
@app.route('/genre-page')
@app.route('/favorite-page')
@app.route('/download-page')
@app.route('/import-page')
@app.route('/setting-page')
def index():
    return render_template('index.html')


@app.route('/table-sample')
def componentSample():
    return render_template('index.html')


# ---------- API ----------
# ---------- Musics ----------
@app.route("/musics", methods=['GET'])
def getMusics():
    musics = Music.query.all()
    return jsonify(MusicSchema(many=True).dump(musics))


@app.route("/musics/<albumName>", methods=['GET'])
def getAlbum_Music(albumName):
    musics = Music.query.filter(Music.album == albumName).all()
    return jsonify(MusicSchema(many=True).dump(musics))


@app.route("/music/<id>", methods=['GET'])
def getMusic(id):
    music = Music.query.filter(Music.id == id).one()
    return jsonify(MusicSchema().dump(music))


@app.route('/music/<id>', methods=['PUT'])
def music_update(id):
    data = request.json
    print(data)
    music = Music.query.filter(Music.id == id).one()
    music.musicName = data.get('musicName') if data.get('musicName') else None
    music.group = data.get('group') if data.get('group') else None
    music.album = data.get('album') if data.get('album') else None
    music.genre = data.get('genre') if data.get('genre') else None
    music.evaluation = data.get(
        'evaluation') if data.get('evaluation') else None
    music.comment = data.get('comment') if data.get('comment') else None
    db.session.commit()
    return jsonify({"result": "OK", "id": id, "data": data})


@app.route("/musics/<ids>", methods=['DELETE'])
def deleteMusics(ids):
    for id in ids:
        musicCount = Music.query.filter(Music.id == id).count()
        if musicCount:
            music = Music.query.filter(Music.id == id).one()
            print(music.fileName)
            os.remove('static/musics/'+music.fileName)
            Music.query.filter(Music.id == id).delete()
            Music_Photo.query.filter(Music_Photo.musicId == id).delete()

    db.session.commit()
    musics = Music.query.all()
    return jsonify(MusicSchema(many=True).dump(musics))


# ---------- Groups ----------
@app.route("/groups", methods=['GET'])
def getGroups():
    groups = Group.query.all()
    return jsonify(GroupSchema(many=True).dump(groups))


# ---------- Albums ----------
@app.route("/albums", methods=['GET'])
def getAlbums():
    albums = Album.query.all()
    return jsonify(AlbumSchema(many=True).dump(albums))


@app.route("/albums-attached-music-count", methods=['GET'])
def getAlbumsAttachedMusicCount():
    ''' アルバムに紐づいた音源数を追加して返す '''
    albums = Album.query.all()
    unknown = Album(
        id=None,
        albumName=None,
        album_photo=Album_Photo(
            id=None,
            albumId=None,
            fileName=None,
            fileType=None,
            fileSize=None,
            path=None,
        )
    )
    albums.append(unknown)
    for album in albums:
        musicsCount = Music.query.filter(
            Music.album == album.albumName).count()
        album.musicsCount = musicsCount
    return jsonify(AlbumAttachedMusicCountSchema(many=True).dump(albums))


@app.route("/album/<id>", methods=['GET'])
def getAlbum(id):
    album = Album.query.filter(Album.id == id).one()
    return jsonify(AlbumSchema().dump(album))


@app.route("/album", methods=['POST'])
def createAlbum():
    data = request.json
    newAlbum = Album(
        albumName=data.get('albumName'),
        # TODO:フォト登録・選択機能完成後に繋ぎ込み
        album_photo=Album_Photo(
            fileName=None,
            fileType=None,
            fileSize=None,
            path=None,
        )
    )
    db.session.add(newAlbum)
    db.session.commit()
    return jsonify({"result": "OK", "data": data})


# ---------- Genres ----------
@app.route("/genres", methods=['GET'])
def getGenres():
    genres = Genre.query.all()
    return jsonify(GenreSchema(many=True).dump(genres))


# ---------- Settings ----------
@app.route("/settings", methods=['GET'])
def getSetting():
    setting = Setting.query.filter(Setting.id == 1).first()
    return jsonify(SettingSchema().dump(setting))


@app.route("/volume", methods=['PUT'])
def updateVolume():
    data = request.json
    setting = Setting.query.filter(Setting.id == 1).one()
    setting.volume = data.get('volume')
    db.session.commit()
    return jsonify({'result': 'SuccessUpdate', 'data': data})


# ---------- upload ----------
@app.route("/upload-music", methods=['POST'])
def uploadMusic():
    f = request.files["file"]
    duration = request.form["duration"]
    time = request.form["time"]
    fileType = request.form["type"]
    fileName = f.filename
    filePath = 'static/musics/'+fileName
    if os.path.exists(filePath):
        return jsonify({"message": "Uploaded file already exists"}), 500
    else:
        f.save(filePath)
        fileSize = convert_size(os.path.getsize(filePath))
        newMusic = Music(
            musicName=fileName,
            group=None,
            album=None,
            genre=None,
            comment=None,
            duration=duration,
            time=time,
            fileType=fileType,
            fileSize=fileSize,
            fileName=fileName,
            music_photo=Music_Photo(
                fileName=None,
                fileType=None,
                fileSize=None,
                path=None,
            )
        )
        db.session.add(newMusic)
        db.session.commit()
        print(f)
        print(os.getcwd())
        return jsonify({"filename": f.filename})


def convert_size(size):
    units = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB")
    i = math.floor(math.log(size, 1024)) if size > 0 else 0
    size = round(size / 1024 ** i, 2)

    return f"{size} {units[i]}"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
