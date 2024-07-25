import { Locale } from '@/i18n.types'
import { MyClientComponent } from './MyClientComponent'
import { MyComponent } from './MyComponent'

export default async function Page({ params: { locale } }: {params: Locale}) {
	return (
		<>
			<MyComponent />
			<MyClientComponent />
		</>
	)
}

