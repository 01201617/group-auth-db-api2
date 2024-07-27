# group-auth-db-api2

###起動
docker-compose down -v
docker-compose up --build

###データの追加と閲覧※別のターミナル上で (docker-compose でしないと、dbname とか合わない）
docker-compose run app npm run create-data
docker-compose run app npm run view-data

###マイグレーション(ファイル生成、適用。)
docker-compose run app npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d src/data-source.ts src/migration/AddConditionToData
docker-compose run app npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/data-source.ts
そして、サーバー再起動
control + C
docker-compose up --build
