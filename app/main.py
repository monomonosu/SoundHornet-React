import os
from flask import jsonify, render_template, request
from models import *


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
    f.save('static/musics/'+f.filename)
    print(f)
    print(os.getcwd())
    return jsonify({"filename": f.filename})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
