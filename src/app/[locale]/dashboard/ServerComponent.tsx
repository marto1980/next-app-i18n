import { useTranslations } from "next-intl"

const MyServerComponent = () => {
    const t = useTranslations('ServerComponent')
    return <div> {t('title')}</div>

}
export { MyServerComponent }