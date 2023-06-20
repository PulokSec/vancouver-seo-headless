import { gql } from "@apollo/client";
import { client } from "lib/apollo";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

function CustomHeader(): JSX.Element {
  const [settings, setSettings] = useState({});
  const [mainMenus, setMainMenus] = useState([]);

  useEffect(() => {
    client
      .query({
        query: gql`
          query {
            settingsOptions {
              AsimOptions {
                headerSettings {
                  uploadLogo {
                    sourceUrl
                    altText
                  }
                }
              }
            }
          }
        `,
      })
      .then((result) => {
        setSettings(result?.data?.settingsOptions?.AsimOptions);
      });

    client
      .query({
        query: gql`
          {
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
      })
      .then((result) => {
        setMainMenus(result?.data?.menus?.nodes);
      });
  }, []);
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            {(settings as any)?.headerSettings?.uploadLogo == null ? (
              ""
            ) : (
              <Link href="/">
                <Image
                  src={(settings as any)?.headerSettings?.uploadLogo?.sourceUrl}
                  loader={myLoader}
                  style={{ cursor: "pointer" }}
                  alt="Logo"
                  width={200}
                  height={33}
                  priority={true}
                />
              </Link>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              // style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {mainMenus?.map((link) => {
                return (
                  <ul key={`${link.label}$-menu`}>
                    {link.menuItems.nodes.map((item) => {
                      return (
                        <li key={`${item.label}$-menu`}>
                          {item.parentId == null ? (
                            <span>
                              <Nav.Link as={Link} href={`${item.url}`}>
                                <span className="link" onClick={() => item.url}>
                                  {item.label}
                                </span>
                              </Nav.Link>
                              <ul className="submenu">
                                {item.childItems.nodes.map((submenu) => {
                                  return (
                                    <li key={submenu.uri}>
                                      <Nav.Link
                                        as={Link}
                                        href={`${submenu.uri}`}
                                      >
                                        <span
                                          className="sublink"
                                          onClick={() => submenu.uri}
                                        >
                                          {submenu.label}
                                        </span>
                                      </Nav.Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </span>
                          ) : (
                            ""
                          )}
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomHeader;
