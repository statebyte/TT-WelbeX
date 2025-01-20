# TT-WelbeX Blog
WelbeX Technical Task Junior Node.js Developer 

> Demo: [welbex.statebyte.dev](https://welbex.statebyte.dev)

### Server Backend:
- Express.js + TypeORM + jose + Swagger with TypeScript
- PostgreSQL

### Client Frontend:
- Vite + React TSX + TailwindCSS

+Bonus - CI Tests

## Prepare before startup
```
cd ./backend
cp .env.example .env
cd ..
```

## Startup locally
```
docker compose up
or
docker compose up --build
```

Click: [localhost](http://localhost)  
API: [localhost/docs](http://localhost/api)  
Docs: [localhost/docs](http://localhost/docs)

```
.
├─ docker-compose.yml
├─ .github
│  └─ workflows
│     └─ ci.yml
├─ backend
│  ├─ Dockerfile
│  ├─ package.json
│  ├─ pnpm-lock.yaml
│  ├─ tsconfig.json
│  └─ src
│     ├─ server.ts
│     ├─ app.ts
│     ├─ data-source.ts
│     ├─ swagger.ts
│     ├─ entity
│     │  ├─ User.ts
│     │  └─ Post.ts
│     ├─ controllers
│     │  ├─ authController.ts
│     │  └─ postController.ts
│     ├─ routes
│     │  ├─ auth.ts
│     │  └─ posts.ts
│     ├─ middleware
│     │  └─ authMiddleware.ts
├─ frontend
│  ├─ Dockerfile
│  ├─ package.json
│  ├─ pnpm-lock.yaml
│  ├─ tsconfig.json
│  ├─ postcss.config.js
│  ├─ tailwind.config.js
│  ├─ vite.config.ts
│  └─ src
│     ├─ main.tsx
│     ├─ App.tsx
│     ├─ store
│     │  └─ index.ts
│     ├─ features
│     │  ├─ authSlice.ts
│     │  └─ postSlice.ts
│     ├─ pages
│     │  ├─ HomePage.tsx
│     │  ├─ LoginPage.tsx
│     │  └─ RegisterPage.tsx
│     └─ components
│        ├─ NavBar.tsx
│        ├─ PostList.tsx
│        └─ PostForm.tsx
├─ nginx
│  ├─ Dockerfile
│  └─ default.conf
```