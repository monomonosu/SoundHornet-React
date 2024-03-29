FROM tiangolo/uwsgi-nginx-flask:python3.8
COPY /app /app
COPY /front /front

WORKDIR ../front
RUN apt update
# 安定しない場合コメントアウトOFF
# RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt install -y nodejs
# 必要がないようなら消す
# RUN apt autoclean
# RUN apt clean all
# RUN apt update
# ----------
RUN apt install -y npm
RUN apt install -y vim
RUN npm install -g n
RUN n 16.14.2
RUN apt purge -y nodejs npm
RUN apt -y autoremove
RUN npm install
RUN npm run build

WORKDIR ../app
RUN pip install sqlalchemy
RUN pip install flask-sqlalchemy
RUN pip install flask-marshmallow 
RUN pip install marshmallow-sqlalchemy
RUN pip install Flask-Migrate
RUN pip install flask-cors
RUN pip install yt-dlp

ENV FLASK_APP models.py
RUN flask db init
RUN flask db migrate
RUN flask db upgrade
RUN python ./seeder.py

# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# RUN npm install
# RUN npm run build
