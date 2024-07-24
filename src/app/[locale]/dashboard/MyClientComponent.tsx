'use client'

import { useTranslations } from "next-intl"


const MyClientComponent = () => {
    const t = useTranslations('ClientComponent')
    return <div> {t('title')}</div>
}

export { MyClientComponent }

