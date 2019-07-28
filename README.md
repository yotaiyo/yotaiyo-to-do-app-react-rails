# to-do-app

## 以下のレポジトリに移植（2019/7/28）
- https://github.com/yotaiyo/to-do-app-frontend
- https://github.com/yotaiyo/to-do-app-backend

## OverView
タスクの追加、完了、フィルタリング、期限の設定や認証といった機能が実装されているタスク管理アプリケーション。  

## 使用した技術
- TypeScript
- Next.js
- Ruby on Rails

## Setup
```
git clone git@github.com:yotaiyo/to-do-app.git
cd to-do-app
```

### frontend
```
cd frontend
yarn
yarn test
yarn run dev
```
- open http://localhost:3000

### backend
```
cd backend
bin/rails test
bin/rails s -p 3001
```
- open http://localhost:3001 
