import { gql } from "@apollo/client";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { client } from "lib/apollo";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Nav, Row } from "react-bootstrap";
import styles from "scss/components/Footer.module.scss";

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        settingsOptions {
          AsimOptions {
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
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
};

const Footer = (props: MyProps) => {
  const { settings, mainMenus } = props;

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const prefixSettings = (settings as any).footerSettings;

  const socialNull =
    prefixSettings?.socialUrl?.facebook == null &&
    prefixSettings?.socialUrl?.tiktok == null &&
    prefixSettings?.socialUrl?.linkedin == null &&
    prefixSettings?.socialUrl?.instagram == null;

  return (
    <footer className={styles.main}>
      <div className="wrap">
        <Container>
          <Row>
            <Col lg={4}>
              <div className="footer-widget">
                <p
                  className="widget_title"
                  dangerouslySetInnerHTML={{
                    __html: prefixSettings?.footerLeftWidget.title,
                  }}
                ></p>
                <a
                  href={`mailto:${prefixSettings?.footerLeftWidget?.emailAddress}`}
                >
                  {prefixSettings?.footerLeftWidget?.emailAddress}
                </a>

                <a
                  href={`tel:${prefixSettings?.footerLeftWidget?.phoneNumber}`}
                >
                  {prefixSettings?.footerLeftWidget?.phoneNumber}
                </a>
              </div>
            </Col>
            <Col lg={4}>
              <div className="footer-logo">
                <Link href="/">
                  <Image
                    src={
                      prefixSettings?.footerLogoSection?.logoUpload?.sourceUrl
                    }
                    
                    alt={prefixSettings?.footerLogoSection?.logoUpload?.altText}
                    width="200"
                    height="33"
                  />
                </Link>
                <p className="copyright">
                  {prefixSettings?.footerLogoSection?.logoText}
                </p>
              </div>
            </Col>
            <Col lg={4}>
              <div className="footer-widget">
                <p
                  className="widget_title"
                  dangerouslySetInnerHTML={{
                    __html: prefixSettings?.footerRightWidget?.title,
                  }}
                ></p>
                <p>{prefixSettings?.footerRightWidget?.address}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Container>
              <div className="ms-auto py-5 my-5 my-lg-0 footer-menu">
                {mainMenus.map((link) => {
                  return (
                    <ul key={`${link.label}$-menu`}>
                      {link.menuItems.nodes.map((item) => {
                        return (
                          <li key={`${item.label}$-menu`}>
                            {item.parentId == null ? (
                              <span>
                                <Nav.Link href={`${item.url}`}>
                                  <span className="link">{item.label}</span>
                                </Nav.Link>
                                <ul className="submenu">
                                  {item.childItems.nodes.map((submenu) => {
                                    return (
                                      <li key={submenu.uri}>
                                        <Nav.Link
                                          as={Link}
                                          href={`${submenu.uri}`}
                                        >
                                          <span className="link">
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
              </div>
            </Container>
          </Row>
          <Row>
            <Col>
              {socialNull ? (
                ""
              ) : (
                <div className="social-url">
                  <ul>
                    {prefixSettings?.socialUrl?.facebook == null ? (
                      ""
                    ) : (
                      <li>
                        <a
                          title="Facebook"
                          target="__blank"
                          href={prefixSettings?.socialUrl?.facebook}
                        >
                          <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                      </li>
                    )}

                    {prefixSettings?.socialUrl?.instagram == null ? (
                      ""
                    ) : (
                      <li>
                        <a
                          title="Instagram"
                          target="__blank"
                          href={prefixSettings?.socialUrl?.instagram}
                        >
                          <FontAwesomeIcon icon={faInstagram} />
                        </a>
                      </li>
                    )}

                    {prefixSettings?.socialUrl?.linkedin == null ? (
                      ""
                    ) : (
                      <li>
                        <a
                          title="Linkedin"
                          target="__blank"
                          href={prefixSettings?.socialUrl?.linkedin}
                        >
                          <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              <div
                className="copyright-text"
                dangerouslySetInnerHTML={{
                  __html: prefixSettings?.copyrightText,
                }}
              ></div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
