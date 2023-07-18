import dynamic from "next/dynamic";
import Head from "next/head";
import { gql } from "@apollo/client";
// import { CTA, Footer, Header } from 'components';
import Banner from "../components/Banner";
import Header from "../components/Header";
import { client } from "../lib/apollo";
const CTA = dynamic(() => import("../components/CTA"));
const WeHelp = dynamic(() => import("../components/WeHelp"));
const Team = dynamic(() => import("components/Team"));
const Meeting = dynamic(() => import("components/Meeting"));
const PartnerLogo = dynamic(() => import("components/PartnerLogo"));
const SplitImageLeft = dynamic(() => import("../components/SplitImageLeft"));
const FAQ = dynamic(() => import("components/FAQ"));
const Gallery = dynamic(() => import("components/Gallery"));
const FlexabilitySlider = dynamic(() => import("components/FlexabilitySlider"));
const SplitImageRight = dynamic(() => import("../components/SplitImageRight"));
const Footer = dynamic(() => import("../components/Footer"));


const MobileBanner = dynamic(() => import("components/MobileBanner"));
const ClientReviews = dynamic(() => import("components/ClientReviews"));
export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        pages(where: { id: 14 }) {
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
              jsonLd {
                raw
              }
            }
            HomeLandingPage {
              homeSliderSection {
                homeSlider {
                  sliderTitle
                  sliderSubtitle
                  sliderDescription
                  sliderImage {
                    sourceUrl
                  }
                  mobileImage {
                    sourceUrl
                  }
                  sliderButtonUrl {
                    url
                  }
                }
              }
              weHelpSection {
                helpTitle
                helpDescription
                hideSection
                helpImage {
                  mediaItemUrl
                }
              }
              partnerLogoSection {
                hideSection
                partnerLogo {
                  sourceUrl
                  altText
                }
              }
              teamSection {
                teamTitle
                hideSection
                teamImage {
                  sourceUrl
                  altText
                }
              }
              meetingSection {
                meetingTitle
                meetingDescription
                hideSection
                meetingImage {
                  sourceUrl
                  altText
                }
              }
              splitImageLeftSection {
                splitTitle
                splitDescription
                splitImage {
                  altText
                  sourceUrl
                }
                hideSection
                splitButton {
                  url
                  title
                }
              }
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
              splitImageRightSection {
                splitTitle
                splitDescription
                splitImage {
                  altText
                  sourceUrl
                }
                hideSection
                splitButton {
                  url
                  title
                }
              }
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
              faqSection {
                hideSection
                faqTitle
                faqSubitle
                faqImage {
                  altText
                  sourceUrl
                }
                faqAccordion {
                  question
                  answer
                }
              }
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
  const reviews = await client.query({
    query: gql`
      query {
        pages(where: { id: 1370 }) {
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

            Testimonials {
              bannerTitle
              bannerHeading
              bannerDescription
              bannerImage {
                altText
                sourceUrl
              }
              sectionTitle
              testimonials {
                testimonial
                clientName
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
      metaData: data?.pages?.nodes,
      sliders: data?.pages?.nodes,
      msliders: data?.pages?.nodes,
      helps: data?.pages?.nodes,
      logos: data?.pages?.nodes,
      teams: data?.pages?.nodes,
      meetings: data?.pages?.nodes,
      splitImagesLeft: data?.pages?.nodes,
      flexsliders: data?.pages?.nodes,
      splitImagesRight: data?.pages?.nodes,
      images: data?.pages?.nodes,
      faqsections: data?.pages?.nodes,
      reviewsData: reviews?.data?.pages?.nodes[0]?.Testimonials,
    },
    revalidate: 10,
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  sliders: any;
  msliders: any;
  helps: any;
  logos: any;
  teams: any;
  meetings: any;
  splitImagesLeft: any;
  flexsliders: any;
  splitImagesRight: any;
  images: any;
  faqsections: any;
  reviewsData: any;
  cta_image:any;
};

export default function Page(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    sliders,
    msliders,
    helps,
    logos,
    teams,
    meetings,
    splitImagesLeft,
    flexsliders,
    splitImagesRight,
    images,
    faqsections,
    reviewsData,
    cta_image
  } = props;
  console.log(reviewsData);
  return (
    <>
      <Head>
        {metaData.map((meta:any) => {
          return (
            <>
              <noscript
                dangerouslySetInnerHTML={{
                  __html: meta?.seo?.jsonLd?.raw,
                }}
              ></noscript>
              {meta?.seo?.jsonLd?.raw}

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
      <main className="content">
        <Header settings={settings} mainMenus={mainMenus} />
        <div className="desktop-banner">
          <Banner sliders={sliders} />
        </div>
        <div className="mobile-banner">
          <MobileBanner msliders={msliders} />
        </div>
        <WeHelp helps={helps} />
        <PartnerLogo logos={logos} />
        <Team teams={teams} />
        <Meeting meetings={meetings} />
        <SplitImageLeft splitImagesLeft={splitImagesLeft} />
        <FlexabilitySlider flexsliders={flexsliders} />
        <SplitImageRight splitImagesRight={splitImagesRight} />
        <Gallery images={images} />
        <ClientReviews reviews={reviewsData} />
        <FAQ faqsections={faqsections} />
        <CTA ctaImage={cta_image}/>
      </main>

      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
