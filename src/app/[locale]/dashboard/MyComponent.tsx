import { getDictionary } from "../dictionaries"

const MyComponent = ({ dict }: { dict: object}) => {
    
    return <div> {dict.ServerComponent.title}</div>

}
export { MyComponent }

