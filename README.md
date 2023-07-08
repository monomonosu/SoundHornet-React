# SoundHornet
Multifunctional sound player

## セットアップ

### ビルド
docker
- `docker build -t <image-name>:<version> .`
   - dbが無いことによるエラーが出る場合はdatabaseディレクトリで`database.sqlite`を作成
- `docker run -d -it --name <container-name> -p <port>:80 <image-name>:<version>`

### デベロップ
front
- `cd front`
- `npm install`
- `npm run dev`

## 初期データ・音楽で使用している楽曲に関して
当アプリでは初期データ・初期楽曲として著作権フリーの魔王魂様の楽曲を使用しております。<br>
URL:https://maou.audio
- 当アプリで使用している楽曲
   - 魔王魂：ベガストロ.mp3
   - 魔王魂：シャイニングスター.mp3
   - 魔王魂：ハルジオン.mp3
   
こちらの楽曲を魔王魂様に許可なく再配布を行わないようお願い致します。

## 注意書き
当アプリで管理・視聴する楽曲は著作権フリーの音源のみご使用お願い致します。  
著作権を有する音源のご使用は絶対にしないよう、お願いします。  
また、念のためVPN等をご利用をお願いいたします。
