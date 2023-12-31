import crypto from 'crypto'

const isProd = process.env.NODE_ENV === 'production'

export const getCsp = inlineScriptSource => {
  const csp = []
  const hash = crypto.createHash('sha256').update(inlineScriptSource)

  csp.push(`base-uri 'self'`)
  csp.push(`form-action 'self'`)
  csp.push(`default-src 'self'`)
  csp.push(`script-src 'self'${isProd ? '' : ` 'unsafe-eval'`} 'sha256-${hash.digest('base64')}'`)
  csp.push(`style-src 'self'${isProd ? '': ` 'unsafe-inline'`}`)
  csp.push(`connect-src 'self' https://devcans.wpengine.com/graphql`)
  csp.push(`img-src 'self' data: blob: https://devcans.wpengine.com`)
  csp.push(`font-src 'self' data:`)
  csp.push(`frame-src *`)
  csp.push(`media-src *`)

  return csp.join('; ')
}

module.exports = {
  getCsp
}