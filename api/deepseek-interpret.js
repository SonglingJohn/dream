const API_KEY = process.env.DEEPSEEK_API_KEY
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat'

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

function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload)
}

module.exports = async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (request.method === 'OPTIONS') {
    response.status(204).end()
    return
  }

  if (request.method !== 'POST') {
    sendJson(response, 405, { error: 'Method not allowed.' })
    return
  }

  if (!API_KEY) {
    sendJson(response, 500, {
      error: 'Missing DEEPSEEK_API_KEY. Add it in Vercel Project Settings > Environment Variables.',
    })
    return
  }

  const dream = Array.isArray(request.body?.dream) ? request.body.dream : []
  if (!dream.length) {
    sendJson(response, 400, { error: 'Missing dream selection data.' })
    return
  }

  try {
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
      sendJson(response, deepseekResponse.status, {
        error: data.error?.message || 'DeepSeek API request failed.',
      })
      return
    }

    sendJson(response, 200, {
      interpretation: sanitizeInterpretation(data.choices?.[0]?.message?.content || ''),
    })
  } catch (error) {
    sendJson(response, 500, { error: error.message })
  }
}
