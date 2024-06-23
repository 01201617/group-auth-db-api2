# group-auth-db-api2

起動
docker-compose down -v
docker-compose up --build

データの追加と閲覧※別のターミナル上で (docker-compose でしないと、dbname とか合わない）
docker-compose run app npm run create-data
docker-compose run app npm run view-data
