import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getLangFromReq } from '../utils/fromReq'
import { getCsp } from '../utils/csp'

class MyDocument extends Document {
  static async getInitialProps(ctx : any) {
    const initialProps = await Document.getInitialProps(ctx)
    const lang = getLangFromReq(ctx.req)
    return { ...initialProps, lang }
  }

  render() {
  return (
    <Html lang="en-US">
      <Head>
        <noscript>
          {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(fasd) }}
        /> */}
        </noscript>

        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
          <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
        <meta name="theme-color" content="#ffffff" />
        <meta name="referrer" content={'strict-origin'} />
          <meta httpEquiv="Content-Security-Policy" content={getCsp(NextScript.getInlineScriptSource(this.props))} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
      }
}

export default MyDocument;
