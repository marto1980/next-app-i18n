import { useTranslations } from "next-intl";
import styles from "./page.module.css";


export default function Home() {
  const t = useTranslations('HomePage')
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p> {t('title')}</p>
      </div>
    </main>
  );
}
