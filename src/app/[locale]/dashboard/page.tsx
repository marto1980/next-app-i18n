import { Locale } from '@/i18n.types'
import React from 'react'
import { MyClientComponent } from './ClientComponent'
import { MyServerComponent } from './ServerComponent'

export default async function Page({ params: { locale } }: {params: Locale}) {
	return (
		<>
			<MyServerComponent />
			<MyClientComponent />
		</>
	)
}