import { FC, ReactElement } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  //Pass an array of post data into the page component as props
  return {
    props: {
      allPostsData,
    },
  };
}

//propsのobjectの型をgenericsで書く

// こういう書き方もできる
// export default function Home({
//   allPostsData
// }: {
//   allPostsData: {
//     date: string
//     title: string
//     id: string
//   }[]
// }) {
//   return 

const Home: FC<{
  allPostsData: Array<{
    id: string;
    title: string;
    date: string;
  }>
}> = ({ allPostsData }): ReactElement => {
  return (
    // Layout home === Layout home = {true}
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I’m Toma Watanabe from japan.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export default Home;
