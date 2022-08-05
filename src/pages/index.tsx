import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';

import { stripe } from '../services/stripe';

import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss';

interface IHomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

const Home: NextPage<IHomeProps> = ({ product }) => {
  return (
    <>
      <Head>
        <title>ig.news – Home</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <Image
          src="/images/avatar.svg"
          alt="Girl coding"
          width={334}
          height={520}
        />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LTEzQAbh2DoQjI7hvPs00PJ');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format((price.unit_amount as number) / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Home;
