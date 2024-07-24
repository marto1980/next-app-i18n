import { useTranslations } from "next-intl"

const MyComponent = () => {
    const t = useTranslations('ServerComponent')
    return <div> {t('title')}</div>

}
export { MyComponent }

