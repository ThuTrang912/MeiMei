# MeiMei
#server

・env.example ファイルを.env にコピーして、データベースの認証情報を更新する

・MySQL は autocommit (自動コミットモード)を無効化する方は　 autocommit を設定してください。

cd server

composer install 

php artisan key:generate

php artisan migrate (tạo database meimei trước khi nhập câu lệnh này create database meimei; )

php artisan storage:link (tao link lien ket den anh)

php artisan serve --port=8000 --host=0.0.0.0  (mở port truy cập bằng điện thoại)

#client

cd client

npm i

npm start

** ADMIN

email: admin@meimei.com

password: admin


