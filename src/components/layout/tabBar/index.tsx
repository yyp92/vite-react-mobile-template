import React, {FC, useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {TabBar as AntTabBar} from 'antd-mobile'
import routerConfig from '@/components/router'
import styles from './index.module.scss'

interface TabBarProps {}

const TabBar: FC<TabBarProps> = () => {
    const navigate = useNavigate()
    const newLocation = useLocation()

    const [tabs, setTabs] = useState<any[]>([])
    const [active, setActive] = useState<string>('home')

    useEffect(() => {
        setTabs(routerConfig.slice(0, 4))
    }, [])

    useEffect(() => {
        setActive(newLocation?.pathname?.slice(1))
    }, [newLocation])


    const handleAntTabBarChange = (key: string) => {
        setActive(key)
        navigate(key)
    }


    return (
        <div className={styles.tabBarWraper}>
            <AntTabBar
                onChange={handleAntTabBarChange}
                activeKey={active}
                style={{width: '100%'}}
            >
                {
                    tabs.map(item => (
                        <AntTabBar.Item
                            key={item.key}
                            icon={item.icon}
                            title={item.label}
                        />
                    ))
                }
            </AntTabBar>
        </div>
    )
}

export default TabBar
