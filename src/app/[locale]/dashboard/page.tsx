import { Locale } from '@/i18n.types'
import { getDictionary } from '../dictionaries'
import { MyClientComponent } from './MyClientComponent'
import { MyComponent } from './MyComponent'

export default async function Page({ params: { locale } }: {params: Locale}) {
	const dict = await getDictionary(locale)
	return (
		<>
			<MyComponent dict={dict} />
			<MyClientComponent dict={dict}/>
		</>
	)
}

