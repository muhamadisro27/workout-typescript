# Setup Project

Create .env file

```json
DATABASE_URL="mysql://root:@localhost:3306/belajar_typescript_restful_api?schema=public"
```
Run on terminal
```shell
npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm start
```
