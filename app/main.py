from flask import jsonify, render_template
from models import *


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/test", methods=['GET'])
def getTest():
    musics = Music.query.all()
    return jsonify(MusicSchema(many=True).dump(musics))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
