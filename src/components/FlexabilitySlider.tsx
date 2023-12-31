import React from "react";
import { Carousel, Col, Row, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import styles from 'scss/components/Banner.module.scss';

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        pages(where: { id: 14 }) {
          nodes {
            HomeLandingPage {
              flexabilitySlider {
                sliderTitle
                sliderSubtitle
                sliderDescription
                sliderImage {
                  altText
                  sourceUrl
                }
                sliderButtonUrl {
                  url
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
      flexsliders: data?.pages?.nodes,
    },
  };
}

type MyProps = {
  flexsliders: any;
};

const FlexabilitySlider = (props: MyProps) => {
  const { flexsliders } = props;

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <div className="flexability-slider">
        <Carousel fade>
          {flexsliders?.map(function (slider) {
            return slider?.HomeLandingPage?.flexabilitySlider == null
              ? ""
              : slider?.HomeLandingPage?.flexabilitySlider.map((slide:any) => {
                  return (
                    <Carousel.Item key={slide.sliderTitle}>
                      <div className="slider-images" style={{
                            position: "relative",
                            height: "80vh",
                            width: "100vw",
                          }}>
                        <Image
                          src={slide?.sliderImage?.sourceUrl}
                          width={390}
                          height={500}
                          style={{width:"100%",height:"100%"}}
                          alt={slide?.sliderImage?.altText}
                        />
                      </div>
                      <div className={styles.overlay}>
                      <Carousel.Caption className="carouselcaption">
                        <Row className="align-items-center home-slide">
                          <Col className="text-start" xs={12} lg="6">
                            <div className="bannerCaption">
                              <p className="sliderTitle">
                                {slide?.sliderTitle}
                              </p>
                              <p className="sliderSubtitle">
                                {slide?.sliderSubtitle}
                              </p>
                              {/* <p className="sliderDescription">{slide?.sliderDescription}</p> */}
                            </div>
                          </Col>
                        </Row>
                      </Carousel.Caption>
                      </div>
                    </Carousel.Item>
                  );
                });
          })}
        </Carousel>
      </div>
    </>
  );
};

export default FlexabilitySlider;
