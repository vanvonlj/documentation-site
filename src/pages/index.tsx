import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <a
            className="button button--primary button--lg margin-right--md"
            href="/text-rpg/intro">
            Text RPG
          </a>
          <a
            className="button button--primary button--lg margin-right--md"
            href="/distiller/intro">
            Distiller
          </a>
          <a
            className="button button--primary button--lg"
            href="/homelab/intro">
            HomeLab
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="API documentation and guides">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>🎮 Text RPG</h3>
                  <p>Developer APIs and admin guides for the Text RPG system</p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>🔧 Distiller</h3>
                  <p>
                    Hardware setup guides including Raspberry Pi and UART
                    configuration
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>🏠 HomeLab</h3>
                  <p>
                    Complete infrastructure documentation for Proxmox, K3s, and
                    RKE2
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
