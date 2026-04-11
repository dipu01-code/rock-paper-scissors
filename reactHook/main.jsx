import { useEffect } from "react"
import { StrictMode } from "react"
const App = () => {
    useEffect(() => {
        alert('Component mounted')
    }, [])
    const laude = () => {
        return(
            <div>
                <h1 style={{}}>Hello</h1>
            </div>

        )
    }
    return (
        <div>
            <h1>Hello</h1>
            <StrictMode/>
            <button onClick={() => alert('Button clicked')}>Click me</button>
        </div>
    )
}
export default App;