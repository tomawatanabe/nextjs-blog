import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css'
import { FC, ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
    //**getAllPostIds()でparams: {id: fileName.replace(/\.md$/, '')}を受け取る
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    //オプショナルチェーン？
    const postData = await getPostData(params?.id as string);
    return {
        props: {
            postData,
        },
    }
}

const Post: FC<{
    postData: {
        title: string;
        date: string;
        contentHtml: string;
    }
}> = ({ postData }): ReactElement => {
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

export default Post;
