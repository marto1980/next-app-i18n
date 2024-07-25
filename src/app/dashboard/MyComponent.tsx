import { useTranslations } from "next-intl"

const MyComponent = () => {
    const t = useTranslations() 
    return <div> {t('ServerComponent.title')}</div>

}
export { MyComponent }

