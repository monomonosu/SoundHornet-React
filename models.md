## Musics

| 項目       | 和名              | タイプ   | 備考                       | 
| ---------- | ----------------- | -------- | -------------------------- | 
| id         | id                | integer  |                            | 
| musicName  | 音楽名            | string   |                            | 
| artist     | アーティスト      | string   | フリーor多対１？後日検討     | 
| album      | アルバム          | string   | フリーor多対１？後日検討     | 
| genre      | ジャンル          | string   | フリーor多対１？後日検討     | 
| evaluation | 評価              | integer  |                            | 
| comment    | コメント          | string   |                            | 
| time       | 長さ              | string   | 参考程度なので暫定的にTEXT | 
| bitRate    | ビットレート      | string   |                            | 
| fileType   | ファイル形式      | string   | mp3,wav等                  | 
| fileSize   | ファイルサイズ    | string   |                            | 
| path       | ファイルPATH      | string   |                            |
| url        | ダウンロード元URL | string   | youtubeからのDL用          | 
| createdAt  | 作成日時          | datetime |                            | 
| updatedAt  | 更新日時          | datetime |                            | 

<br>

## Music_Photos

| 項目      | 和名           | タイプ   | 備考 | 
| --------- | -------------- | -------- | ---- | 
| id        | id             | integer  |      | 
| music_id  | 音楽_id        | integer  | FK   | 
| fileName  | ファイル名     | string   |      | 
| fileType  | ファイル形式   | string   |      | 
| fileSize  | ファイルサイズ | string   |      | 
| path      | ファイルPATH   | string   |      | 
| createdAt | 作成日時       | datetime |      | 
| updatedAt | 更新日時       | datetime |      | 

## Artists

| 項目       | 和名           | タイプ  | 備考 | 
| ---------- | -------------- | ------- | ---- | 
| id         | id             | integer |      | 
| artistName | アーティスト名 | string   |      | 
| createdAt  | 作成日時       | datetime |      | 
| updatedAt  | 更新日時       | datetime |      | 

<br>

## Genres

| 項目       | 和名           | タイプ  | 備考 | 
| ---------- | -------------- | ------- | ---- | 
| id         | id             | integer |      | 
| genreName  | ジャンル名     | string   |      | 
| createdAt  | 作成日時       | datetime |      | 
| updatedAt  | 更新日時       | datetime |      | 