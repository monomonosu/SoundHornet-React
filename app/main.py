import os
from flask import jsonify, render_template, request
from models import *
import math


# ---------- Page ----------
@app.route('/')
@app.route('/group')
@app.route('/album')
@app.route('/genre')
@app.route('/favorite')
@app.route('/download')
@app.route('/import')
@app.route('/setting')
def index():
    return render_template('index.html')


@app.route('/table-sample')
def componentSample():
    return render_template('index.html')


# ---------- API ----------
@app.route("/musics", methods=['GET'])
def getMusics():
    musics = Music.query.all()
    return jsonify(MusicSchema(many=True).dump(musics))


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


@app.route("/groups", methods=['GET'])
def getGroups():
    groups = Group.query.all()
    return jsonify(GroupSchema(many=True).dump(groups))


@app.route("/albums", methods=['GET'])
def getAlbums():
    albums = Album.query.all()
    return jsonify(AlbumSchema(many=True).dump(albums))


@app.route("/genres", methods=['GET'])
def getGenres():
    genres = Genre.query.all()
    return jsonify(GenreSchema(many=True).dump(genres))


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
