# Vercel 部署说明

这个项目已经准备好部署到 Vercel。

## 已准备好的结构

- `index.html`、`styles.css`、`app.js` 作为静态网页直接部署。
- `api/deepseek-interpret.js` 是 Vercel 云函数，线上会变成 `/api/deepseek-interpret`。
- `deepseek-proxy.js` 仍保留给本地 `file://` 预览使用。
- `.gitignore` 已避免上传 `.env`、`.vercel`、`node_modules` 等本地文件。

## 上传 GitHub 前确认

不要把 DeepSeek Key 写进任何文件，也不要上传 `.env`。

## Vercel 设置环境变量

在 Vercel 项目后台进入：

`Settings` -> `Environment Variables`

新增：

`DEEPSEEK_API_KEY`

值填你的 DeepSeek API Key。

如果你想换模型，可以额外新增：

`DEEPSEEK_MODEL`

默认模型是 `deepseek-chat`。

## 线上逻辑

本地用 `file://` 打开时，前端请求：

`http://127.0.0.1:8787/api/deepseek-interpret`

部署到 Vercel 后，前端自动请求：

`/api/deepseek-interpret`
