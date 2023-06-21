import { FaustProvider } from '@faustjs/next';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { client } from 'client';
import 'faust.config';
import type { AppProps } from 'next/app';
import 'scss/main.scss';
// import Script from "next/script";
// import { TRACKING_ID } from "./../../utils/variables";
import PageWrapper from 'components/Pagewrapper';

export default function MyApp({ Component, pageProps }: AppProps) {


  return (
    <>
      {/* Google tag (gtag.js) */}
      {/* <Script   src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
      ></Script> */}
      {/* 👇 gtag function definition. notice that we don't send page views at this point.  */}
      {/* <Script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', '${TRACKING_ID}');
          `,
        }}
      /> */}
     
      <FaustProvider client={client} pageProps={pageProps}>
      <PageWrapper>
        <Component {...pageProps} />
       </PageWrapper>
      </FaustProvider>
    </>
  );
}



