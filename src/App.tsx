import ReactDOM from 'react-dom/client'
import {Layout} from '@/components/layout'
import '@/assets/iconfont/iconfont.css' 
import './app.scss'

const App = () => {
    return (
        <Layout />
    )
}


ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)