# yotaiyo-to-do-app-react-rails

## OverView
フロントエンドからバックエンドまでを通して、個人でウェブアプリケーションを作成できるようになることを目的に作成しました。  
フロントエンドはNext.js、バックエンドはRuby on Railsで構成されています。  
ToDoの追加、完了、フィルタリング、期限の設定、ソートといった機能やセキュリティの学習用にトークンベースの認証機能が実装されています。

## 使用した技術
- TypeScript
- Next.js
- Ruby on Rails

## Setup
```
git clone git@github.com:yotaiyo/yotaiyo-to-do-app-react-rails.git
cd yotaiyo-to-do-app-react-rails

- frontend
cd frontend
yarn
yarn test
yarn run dev
http://localhost:3000/ToDoScreen

- backend
cd backend
bin/rails test
bin/rails s -p 3001
http://localhost:3001/todo
``` 
