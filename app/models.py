from email.policy import default
from fileinput import filename
from xml.etree.ElementInclude import include
from app import db, app, migrate, ma
from datetime import datetime


class Music(db.Model):
    __tablename__ = 'musics'

    id = db.Column(db.Integer, primary_key=True)
    musicName = db.Column(db.String, nullable=False)
    artist = db.Column(db.String,)
    album = db.Column(db.String,)
    genre = db.Column(db.String,)
    evaluation = db.Column(db.Integer,)
    comment = db.Column(db.String,)
    time = db.Column(db.String,)
    fileType = db.Column(db.String, nullable=False)
    fileSize = db.Column(db.String, nullable=False)
    fileName = db.Column(db.String, nullable=False, default='filename')
    createdAt = db.Column(db.String, nullable=False, default=datetime.now)
    updatedAt = db.Column(db.String, nullable=False,
                          default=datetime.now, onupdate=datetime.now)
    music_photos = db.relationship(
        'Music_Photo', backref='music', uselist=True, cascade='all, delete',)


class Music_Photo(db.Model):
    __tablename__ = 'music_photos'

    id = db.Column(db.Integer, primary_key=True)
    musicId = db.Column(db.Integer, db.ForeignKey('musics.id'))
    fileName = db.Column(db.String)
    fileType = db.Column(db.String, nullable=False)
    fileSize = db.Column(db.String, nullable=False)
    path = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.String, nullable=False, default=datetime.now)
    updatedAt = db.Column(db.String, nullable=False,
                          default=datetime.now, onupdate=datetime.now)


class Group(db.Model):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    groupName = db.Column(db.String)
    createdAt = db.Column(db.String, nullable=False, default=datetime.now)
    updatedAt = db.Column(db.String, nullable=False,
                          default=datetime.now, onupdate=datetime.now)


class Genre(db.Model):
    __tablename__ = 'genres'

    id = db.Column(db.Integer, primary_key=True)
    genreName = db.Column(db.String)
    createdAt = db.Column(db.String, nullable=False, default=datetime.now)
    updatedAt = db.Column(db.String, nullable=False,
                          default=datetime.now, onupdate=datetime.now)


class Music_PhotoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Music_Photo
        include_fk = True


class MusicSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Music
        include_fk = True
    music_photos = ma.Nested(Music_PhotoSchema, many=True)


class GroupSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Group


class GenreSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Genre
