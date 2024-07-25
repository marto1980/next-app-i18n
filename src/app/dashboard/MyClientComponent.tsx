'use client'

import { useTranslations } from "next-intl"



const MyClientComponent = () => {
    const t = useTranslations()
    return <div> {t('ClientComponent.title')}</div>
}

export { MyClientComponent }

