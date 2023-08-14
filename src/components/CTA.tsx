import { gql } from "@apollo/client";
import { client } from "lib/apollo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
type MyProps = {
  ctaImage: any;
};
const CTA = (props: MyProps) => {
  const [catSections, setCatSections] = useState([]);
  const { ctaImage } = props;
  useEffect(() => {
    client
      .query({
        query: gql`
          query {
            pages(where: { title: "home" }) {
              nodes {
                HomeLandingPage {
                  callToActionSection {
                    hideSection
                    actionTitle
                    actionLink {
                      url
                      title
                    }
                    actionBackgroundImage {
                      sourceUrl
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .then((result) => setCatSections(result?.data?.pages?.nodes));
  }, []);

  return (
    <>
      {catSections?.map((cat, index) => {
        return (
          <Container key={index}>
            <Head>
              <link
                rel="preload"
                as="image"
                href={ctaImage}
              />
            </Head>
            {cat?.HomeLandingPage?.callToActionSection?.hideSection == true ? (
              ""
            ) : (
              <div
                //   style={{
                //  backgroundImage: `url(${cat?.HomeLandingPage?.callToActionSection?.actionBackgroundImage?.sourceUrl})`
                //  }}
                className="cta_section"
              >
                <div
                  className="cta_first"
                  style={{
                    position: "relative",
                    height: "70vh",
                    width: "100%",
                    clipPath: "inset(0 0 0 0)",
                  }}
                >
                  <div
                  >
                    <Image
                      src={ctaImage ? ctaImage : cat?.HomeLandingPage?.callToActionSection
                        ?.actionBackgroundImage?.sourceUrl}
                      
                      alt="Logo"          
                      width={390}
                      height={400}
                      priority={true}
                      style={{width:"100%",height:"100%"}}
                    />
                  </div>
                </div>
                <div className="cta_text">
                  <p>
                    {cat?.HomeLandingPage?.callToActionSection?.actionTitle}
                  </p>

                  {cat?.HomeLandingPage?.callToActionSection?.actionLink ==
                  null ? (
                    ""
                  ) : (
                    <Link
                      href={
                        cat?.HomeLandingPage?.callToActionSection?.actionLink
                          ?.url
                      }
                    >
                      <Button className="ctaBtn">
                        <span>{
                          cat?.HomeLandingPage?.callToActionSection?.actionLink
                            ?.title
                        }</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </Container>
        );
      })}
    </>
  );
};

export default CTA;
