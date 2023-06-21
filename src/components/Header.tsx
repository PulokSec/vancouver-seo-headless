import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { gql } from '@apollo/client';
import Head from 'next/head';
import { client } from 'lib/apollo';


export async function getStaticProps() {
 

  const { data } = await client.query({
    query: gql`query{
      settingsOptions {
        AsimOptions {
          headerSettings {
            uploadLogo {
              sourceUrl
              altText
            }
          }
          generalSettings {
            schemaProductRating
          }
        }
      }

      menus(where: {location: PRIMARY}) {
        nodes {
          name
          slug
          menuItems(first: 50){
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
    }`,
  });

  return {
    props: {
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
};


function Header(props: MyProps) {
  const { settings, mainMenus } = props;

  return (
    <>
      <Head>
      </Head>
      <Navbar bg="light" expand="lg">

        <Container>
          <Navbar.Brand>
            {(settings as any)?.headerSettings?.uploadLogo == null ? "" : (
              <Link href="/">

                <Image
                  src={(settings as any)?.headerSettings?.uploadLogo?.sourceUrl}
                  
                  style={{ cursor: 'pointer' }}
                  alt='Logo'
                  width={200}
                  height={33}
                  priority={true}
                />
              </Link>
            )}

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse 
          // id="navbarScroll"
          >

            <Nav
              className="ms-auto"
              // style={{ maxHeight: '100px' }}
              // navbarScroll
            >
              {mainMenus?.map((link:any) => {
                return (
                  <ul key={`${link.label}$-menu`} >
                    {link.menuItems.nodes.map((item:any)=> {

                      return (
                        <li key={`${item.label}$-menu`}>
                          {item.parentId == null ? (
                            <span >

                              <Nav.Link as={Link} href={`${item.url}`} >
                                <span className="link">{item.label}</span>
                              </Nav.Link>
                              <ul className="submenu">
                                {item.childItems.nodes.map((submenu:any) => {
                                  return (
                                    <li
                                      key={submenu.uri}>
                                      <Nav.Link as={Link} href={`${submenu.uri}`} >
                                        <span className="sublink">{submenu.label?.toUpperCase()}</span>
                                      </Nav.Link>
                                    </li>
                                  )
                                })}

                              </ul>
                            </span>
                          ) : ""}

                        </li>
                      )


                    })}
                  </ul>
                )
              })}


            </Nav>


          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;