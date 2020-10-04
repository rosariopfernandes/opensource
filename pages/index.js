import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

function Home({repos}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>MozDevz Open Source</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          MozDevz Open Source
        </h1>

        <p className={styles.description}>
          List of Open Source projects by Mozambican Developers
        </p>

        <div className={styles.grid}>
          {repos.map((repo) => (
            <a href={path.join('https://github.com/', repo.full_name)} className={styles.card} target='_blank'>
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
          </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
      MozDevz Open Source maintained by&nbsp;
        <a
          href="https://mozdevz.org"
          target="_blank"
        > MozDevz
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  let filePath = path.join(process.cwd(), 'repos.json');
  let reposList = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  let repos = [];

  for (const repoName of reposList) {
    try {
      const res = await fetch('https://api.github.com/repos/' + repoName);
      const repository = await res.json();
      repository.key = repository.id;
      repos.push(repository);
    } catch(e) {
      console.log(e);
    }
  }

  return {
    props: {
      repos
    }
  }


  /*const res = await fetch('https://.../posts')
  const posts = await res.json()*/
}


export default Home
