const http = require('http')

const PORT = Number(process.env.DEEPSEEK_PROXY_PORT || 8787)
const API_KEY = process.env.DEEPSEEK_API_KEY
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat'

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(JSON.stringify(payload))
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', chunk => {
      body += chunk
      if (body.length > 1024 * 1024) {
        reject(new Error('Request body is too large'))
        req.destroy()
      }
    })
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

function buildPrompt(dream) {
  return [
    '你是一个为艺术院校毕业设计服务的梦境情绪解读系统。',
    '请根据用户选择的梦中情绪、情绪强度、积极或消极倾向、记忆清晰度、发生地点和最终颜色，写一段有艺术感但不玄学化的梦境解读。',
    '要求：',
    '1. 使用中文，语气温柔、克制、富有画面感。',
    '2. 不要诊断疾病，不要给医疗建议。',
    '3. 输出必须分成两点回答，且只允许出现这两个编号标题：',
    '1. 情绪、压力与思维分析',
    '2. 情绪调整建议',
    '4. 第一部分需要结合用户选项，分析情绪状态、压力来源、思维模式、记忆清晰度与地点象征之间的关系。',
    '5. 第二部分给出温和、可执行的情绪调整建议，适合普通用户阅读。',
    '6. 禁止输出星号、井号、短横线这三类字符，也不要使用 Markdown 格式。',
    '7. 每一点控制在一小段内，总字数控制在 260 字以内。',
    '',
    `用户选择数据：${JSON.stringify(dream, null, 2)}`,
  ].join('\n')
}

function sanitizeInterpretation(text) {
  return String(text || '').replace(/[*#-]/g, '').trim()
}

async function handleInterpret(req, res) {
  if (!API_KEY) {
    sendJson(res, 500, {
      error: 'Missing DEEPSEEK_API_KEY. Please set it before starting deepseek-proxy.js.',
    })
    return
  }

  const rawBody = await readBody(req)
  const payload = rawBody ? JSON.parse(rawBody) : {}
  const dream = Array.isArray(payload.dream) ? payload.dream : []
  if (!dream.length) {
    sendJson(res, 400, { error: 'Missing dream selection data.' })
    return
  }

  const deepseekResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.82,
      messages: [
        {
          role: 'system',
          content:
            '你擅长把结构化情绪数据转化为诗性但清晰的梦境解读文本。严格遵守格式，不使用星号、井号、短横线，不使用 Markdown。',
        },
        { role: 'user', content: buildPrompt(dream) },
      ],
    }),
  })

  const data = await deepseekResponse.json().catch(() => ({}))
  if (!deepseekResponse.ok) {
    sendJson(res, deepseekResponse.status, {
      error: data.error?.message || 'DeepSeek API request failed.',
    })
    return
  }

  sendJson(res, 200, {
    interpretation: sanitizeInterpretation(data.choices?.[0]?.message?.content || ''),
    raw: data,
  })
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {})
    return
  }

  if (req.method === 'POST' && req.url === '/api/deepseek-interpret') {
    try {
      await handleInterpret(req, res)
    } catch (error) {
      sendJson(res, 500, { error: error.message })
    }
    return
  }

  sendJson(res, 404, { error: 'Not found' })
})

server.listen(PORT, () => {
  console.log(`DeepSeek proxy is running at http://127.0.0.1:${PORT}`)
})
