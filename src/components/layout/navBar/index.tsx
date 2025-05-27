import React, {FC} from 'react'
import {useNavigate} from 'react-router-dom'
import {NavBar as AntNavBar} from 'antd-mobile'
import styles from './index.module.scss'

interface NavBarProps {
    title?: string
    backUrl?: string
}

const NavBar: FC<NavBarProps> = ({
    title = '首页',
    backUrl
}) => {
    const navigate = useNavigate()

    const goBack = () => {
        const newBackUrl: any = backUrl ?? -1

        navigate(newBackUrl)
    }

    return (
        <div className={styles.navWraper}>
            <AntNavBar
                onBack={goBack}
            >{title}</AntNavBar>
        </div>
    )
}

export default NavBar
