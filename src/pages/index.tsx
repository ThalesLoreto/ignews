import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ig.news</title>
      </Head>
      <h1>
        Hello, <span>world!</span>
      </h1>
    </>
  );
};

export default Home;
