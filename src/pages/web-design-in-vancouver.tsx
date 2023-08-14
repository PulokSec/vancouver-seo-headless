import { gql } from "@apollo/client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CTA, Footer, Header, Hero } from "components";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { client } from "lib/apollo";
import Link from "next/link";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        pages(where: { id: 778 }) {
          nodes {
            seo {
              title
              description
              canonicalUrl
              focusKeywords
              openGraph {
                image {
                  url
                }
              }
            }
            Webdesign {
              thirdApplyStepTitle
              secondApplyStepTitle
              secondApplyStepDescription
              productsTitle
              productsRightText
              productsLeftText
              firstApplyStepTitle
              brokerTitle
              brokerDescription
              topBrokerTitle
              topBrokerDescription
              bannerTitle
              bannerHeading
              bannerDescription
              aboutText
              ctaImage {
                altText
                sourceUrl
              }
              aboutImage {
                altText
                sourceUrl
              }
              bannerImage {
                altText
                sourceUrl
              }
              brokerLink {
                url
                title
              }
              productsImage {
                altText
                sourceUrl
              }
              renovation {
                title
                description
              }
              slider {
                title
                content
              }
            }
          }
        }

        settingsOptions {
          AsimOptions {
            headerSettings {
              uploadLogo {
                sourceUrl
                altText
              }
            }
            footerSettings {
              socialUrl {
                facebook
                tiktok
                linkedin
                instagram
              }
              copyrightText
              footerLeftWidget {
                title
                phoneNumber
                emailAddress
              }
              footerLogoSection {
                logoText
                logoUpload {
                  altText
                  sourceUrl
                }
              }
              footerRightWidget {
                title
                address
              }
            }
          }
        }

        menus(where: { location: PRIMARY }) {
          nodes {
            name
            slug
            menuItems(first: 50) {
              nodes {
                url
                target
                parentId
                label
                cssClasses
                description
                id
                childItems {
                  nodes {
                    uri
                    label
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      webdesignData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
  };
}

type MyProps = {
  webdesignData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const Webdesign = (props: MyProps) => {
  const { settings, mainMenus, webdesignData, metaData } = props;

  const [key, setKey] = useState(null);
  return (
    <>
      {webdesignData.map((data:any, index:any) => {
        return (
          <div key={index} className="Bc-Coquitlam">
            <Head>
              {metaData.map((meta:any) => {
                return (
                  <>
                    <title>{meta?.seo?.title}</title>
                    <meta name="description" content={meta?.seo?.description} />
                    <link rel="canonical" href={meta?.seo?.canonicalUrl} />
                    <meta property="og:title" content={meta?.seo?.title} />
                    <meta
                      property="og:description"
                      content={meta?.seo?.description}
                    />
                    <meta
                      property="og:image"
                      content={meta?.seo?.openGraph?.image?.url}
                    />
                  </>
                );
              })}
            </Head>
            <Header settings={settings} mainMenus={mainMenus} />

            <main className="content">
              {data?.Webdesign?.bannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.Webdesign?.bannerTitle}
                  heading={data?.Webdesign?.bannerHeading}
                  description={data?.Webdesign?.bannerDescription}
                  bgImage={data?.Webdesign?.bannerImage?.sourceUrl}
                />
              )}

              <Container className="my-5">
                <Row className="refinance-text my-5">
                  {/* <Col md={5}>
                    <p>
                      {data?.Webdesign?.bannerTitle?.split(" ")[0]}{" "}
                      <span>{data?.Webdesign?.bannerTitle?.split(" ")[1]}</span>
                    </p>
                  </Col> */}
                  <Col md={7}>
                    <span>{data?.Webdesign?.bannerDescription}</span>
                  </Col>
                </Row>
                <Row className="coquitlam-grid my-5">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Webdesign?.aboutText,
                      }}
                    ></div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={data?.Webdesign?.aboutImage?.sourceUrl}
                      
                      alt={data?.Webdesign?.aboutImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{width:"100%"}}
                    />
                  </Col>
                </Row>
                <Row className="top-broker">
                  <Col>
                    <h2>{data?.Webdesign?.topBrokerTitle}</h2>
                    <div
                              dangerouslySetInnerHTML={{
                                __html: data?.Webdesign?.topBrokerDescription,
                              }}
                            ></div>
                  </Col>
                </Row>
                {data?.Webdesign?.slider == null ? (
                  ""
                ) : (
                  <Row className="application-slider">
                    <Carousel
                      autoPlay={true}
                      infinite={true}
                      responsive={responsive}
                    >
                      {data?.Webdesign?.slider.map((slide:any, a:any) => {
                        return (
                          <div
                            key={a}
                            className="application-slide text-center"
                          >
                            <span>{slide?.title}</span>
                            <p>{slide?.content}</p>
                          </div>
                        );
                      })}
                    </Carousel>
                  </Row>
                )}

                <Row className="product-service">
                  <Col className="mb-5" md={12}>
                    <h2 className="text-center">
                      {data?.Webdesign?.productsTitle}
                    </h2>
                  </Col>
                  <Col md={3}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: data?.Webdesign?.productsLeftText,
                      }}
                    ></span>
                  </Col>
                  <Col md={6}>
                    <Image
                      src={data?.Webdesign?.productsImage?.sourceUrl}
                      
                      alt={data?.Webdesign?.productsImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{width:"100%"}}
                    />
                  </Col>
                  <Col md={3}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: data?.Webdesign?.productsRightText,
                      }}
                    ></span>
                  </Col>
                </Row>
                <Row className="apply-step">
                  <Col md={4}>
                    {data?.Webdesign?.firstApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>01</span>
                        <Link href="/contact-us"><p>{data?.Webdesign?.firstApplyStepTitle}</p></Link>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Webdesign?.secondApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="approved">
                        <span>02</span>
                        <Link href="/contact-us"><p>
                          <span>{data?.Webdesign?.secondApplyStepTitle}</span>
                        </p></Link>
                        <p>{data?.Webdesign?.secondApplyStepDescription}</p>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Webdesign?.thirdApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>03</span>
                        <Link href="/contact-us"><p>{data?.Webdesign?.thirdApplyStepTitle}</p></Link>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className="mortgage-broker">
                  <Col>
                    <p className="headering-title">
                      {data?.Webdesign?.brokerTitle}
                    </p>
                    <p>{data?.Webdesign?.brokerDescription}</p>
                  </Col>
                </Row>
                {data.Webdesign.renovation == null ? (
                  ""
                ) : (
                  <Row className="renovation-row">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key == null ? 0 : key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3 renovation"
                    >
                      {data.Webdesign.renovation.map((tab:any, item:any) => {
                        return (
                          <Tab
                            key={item}
                            eventKey={item.toString()}
                            title={tab.title}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: tab.description,
                              }}
                              className="renovation-content-list"
                            ></div>
                          </Tab>
                        );
                      })}
                    </Tabs>
                  </Row>
                )}
                <Row className="broker-coquitlam">
                  <Col>
                    <h2>{data?.Webdesign?.brokerTitle}</h2>
                    <p>{data?.Webdesign?.brokerDescription}</p>
                    {data?.Webdesign?.brokerLink == null ? (
                      ""
                    ) : (
                      <Link href={data?.Webdesign?.brokerLink?.url}>
                        <span>
                          Contact Us <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                      </Link>
                    )}
                  </Col>
                </Row>
              </Container>
              <CTA ctaImage={data?.Webdesign?.ctaImage?.sourceUrl}/>
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>
        );
      })}
    </>
  );
};

export default Webdesign;
