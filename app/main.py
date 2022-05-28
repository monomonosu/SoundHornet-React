import os
from flask import jsonify, render_template, request
from models import *
import math


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/test", methods=['GET'])
def getTest():
    musics = Music.query.all()
    return jsonify(MusicSchema(many=True).dump(musics))


@app.route("/upload-test", methods=['POST'])
def upload():
    f = request.files["file"]
    fileName = f.filename
    filePath = 'static/musics/'+fileName
    f.save(filePath)
    fileSize = convert_size(os.path.getsize(filePath))
    newMusic = Music(
        musicName=fileName,
        fileType='mp3',
        fileSize=fileSize,
        fileName=fileName,
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
