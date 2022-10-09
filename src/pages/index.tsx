import Head from 'next/head';
import { MakeHome } from '@/main/factories/pages/home/home-factory';
import { App } from '@/presentation/app';

function MyApp() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Clean Playando</title>
      </Head>
      <App makeHome={MakeHome} />
    </>
  );
}

export default MyApp;
