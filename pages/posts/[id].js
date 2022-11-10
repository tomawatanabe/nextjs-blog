import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingX1}>
                    {postData.title}
                </h1>
                <br />
                <small className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </small>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}

//getAllPostIdsを用いてここでparamsを受け取る
export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    // なぜawaitが必要か？
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    }
}
