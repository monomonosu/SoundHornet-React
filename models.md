## Musics

| 項目       | 和名              | タイプ   | 備考                       | 
| ---------- | ----------------- | -------- | -------------------------- | 
| id         | id                | integer  |                            | 
| musicName  | 音楽名            | string   |                            | 
| group      | グループ          | string   | フリーor多対１？後日検討     | 
| album      | アルバム          | string   | フリーor多対１？後日検討     | 
| genre      | ジャンル          | string   | フリーor多対１？後日検討     | 
| evaluation | 評価              | integer  |                            | 
| comment    | コメント          | string   |                            | 
| duration   | 長さ(秒・マイクロ) | integer  | 計算等に必要               | 
| time       | 長さ(分・秒)      | string   | 参考程度なので暫定的にTEXT  | 
| fileType   | ファイル形式      | string   | mp3,wav等                  | 
| fileSize   | ファイルサイズ    | string   |                            | 
| fileName   | ファイル名        | string   |                            |
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

## Groups

| 項目       | 和名           | タイプ  | 備考 | 
| ---------- | -------------- | ------- | ---- | 
| id         | id             | integer |      | 
| groupName  | グループ名     | string   |      | 
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

<br>

## Setting
| 項目       | 和名           | タイプ  | 備考 | 
| ---------- | -------------- | ------- | ---- | 
| id         | id             | integer |      | 
| volume     | 音量           | integer  |      | 
| createdAt  | 作成日時       | datetime |      | 
| updatedAt  | 更新日時       | datetime |      | 