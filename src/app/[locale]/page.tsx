import { Locale } from "@/i18n.types";
import { getDictionary } from "./dictionaries";
import styles from "./page.module.css";


export default async function Home({ params: { locale } }: {params: Locale}) {
  const dict = await getDictionary(locale)
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p> {dict.HomePage.title}</p>
      </div>
    </main>
  );
}
