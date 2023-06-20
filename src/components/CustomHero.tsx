import React from 'react';
import Moment from 'react-moment';
import styles from 'scss/components/Hero.module.scss';

interface Props {
  title: string;
  date?: string;
  heading?: string;
  description?: string;
  id?: string;
  bgImage?: string;
  buttonText?: string;
  buttonURL?: string;
  button2Text?: string;
  button2URL?: string;
  children?: React.ReactNode;
}

function CustomHero({
  title = 'Hero Title',
  date,
  heading,
  description,
  id,
  bgImage,
  buttonText,
  buttonURL,
  button2Text,
  button2URL,
  children,
}: Props): JSX.Element {
  return (
    <section
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(id && { id })}
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none' }}
      className={styles.hero}>
      <div className={styles.wrap}>
        <div className="hero-title-post">
          <p className="hero-title text-center">
            {title}
          </p>
          <p className="hero-title text-center">
          <span className='asim-post-meta' >By Vancouver SEO Services | <Moment format="MMM D, YYYY" >{date}</Moment></span>
          </p>

        <div className={styles.intro}>
          <div className={styles.children}>{children}</div>
          {buttonText && buttonURL && (
            <p>
              <a href={buttonURL} className="button">
                {buttonText}
              </a>
            </p>
          )}
          {button2Text && button2URL && (
            <p>
              <a href={button2URL} className="button button-secondary">
                {button2Text}
              </a>
            </p>
          )}
        </div>
        </div>
        <div className="banner-bottom col-md-11 offset-md-1 mt-5"> 
            <p className='heading'>{heading}</p>
            <p className='description'>{description}</p>
        </div>
      </div>
    </section>
  );
}

export default CustomHero;
