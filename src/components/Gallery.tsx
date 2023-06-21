import Image from 'next/image';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';


export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`query{
      pages(where: {id: 14}) {
        nodes {
          HomeLandingPage {
            gallery {
              hideSection
              galleryImage1 {
                altText
                sourceUrl
              }
              galleryImage2 {
                altText
                sourceUrl
              }
              galleryImage3 {
                altText
                sourceUrl
              }
              galleryImage4 {
                altText
                sourceUrl
              }
              galleryImage5 {
                altText
                sourceUrl
              }
             
            }
          }
        }
      }
    }`,
  });

  return {
    props: {
      images: data?.pages?.nodes,
    },
  };
}

type MyProps = {
  images: any;
};


const Gallery = (props: MyProps) => {
  const { images } = props;

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }
  return (
    <>
      <div className="gallery_section">
        {images?.map((image:any,idx) => {
          return (
            <Container key={idx}>
              {image?.HomeLandingPage?.gallery?.hideSection === true ? "" : (
                <Row className='gx-3'>
                  <Col>
                    {image?.HomeLandingPage?.gallery?.galleryImage1 == null ? "" : (
                      <Image
                        src={image?.HomeLandingPage?.gallery?.galleryImage1?.sourceUrl}
                        alt={image?.HomeLandingPage?.gallery?.galleryImage1?.altText}
                        className="gallery_img"
                        height="252"
                        width="380"
                        style={{width:"100%"}}
                      />
                    )}
                    <div style={{height: "20px"}}></div>
                    {image?.HomeLandingPage?.gallery?.galleryImage2 == null ? "" : (
                      <Image
                        src={image?.HomeLandingPage?.gallery?.galleryImage2?.sourceUrl}
                        alt={image?.HomeLandingPage?.gallery?.galleryImage2?.altText}
                        className="gallery_img"
                        height="252"
                        width="380"
                        style={{width:"100%"}}
                        />
                    )}

                  </Col>
                  <Col style={{display: "flex", alignItems: "center"}}>
                    {image?.HomeLandingPage?.gallery?.galleryImage3 == null ? "" : (
                      <Image
                        src={image?.HomeLandingPage?.gallery?.galleryImage3?.sourceUrl}
                        alt={image?.HomeLandingPage?.gallery?.galleryImage3?.altText}
                        className="gallery_img"
                        height="252"
                        width="380"
                        style={{width:"100%"}}
                      />
                    )}
                  </Col>
                  <Col>
                    {image?.HomeLandingPage?.gallery?.galleryImage4 == null ? "" : (
                      <Image
                        src={image?.HomeLandingPage?.gallery?.galleryImage4?.sourceUrl}
                        alt={image?.HomeLandingPage?.gallery?.galleryImage4?.altText}
                        className="gallery_img"
                        height="252"
                        width="380"
                        style={{width:"100%"}} />
                    )}
                    <div style={{height: "20px"}}></div>
                    {image?.HomeLandingPage?.gallery?.galleryImage5 == null ? "" : (
                      <Image
                        src={image?.HomeLandingPage?.gallery?.galleryImage5?.sourceUrl}
                        alt={image?.HomeLandingPage?.gallery?.galleryImage5?.altText}
                        className="gallery_img"
                        height="252"
                        width="380"
                        style={{width:"100%"}} />
                    )}
                  </Col>
                </Row>
              )}


            </Container>
          )
        })}

      </div>
    </>
  );
};

export default Gallery;