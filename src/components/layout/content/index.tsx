import React from 'react'
import {Outlet} from 'react-router-dom'

import NavBar from '../navBar'
import TabBar from '../tabBar'

import styles from './index.module.scss'

interface ContentProps {
    [key: string]: any
}


export const Content: React.FC<ContentProps> = ({}) => {
    // ********** 渲染 **********
    return (
        <div className={styles.layoutContent}>
            <NavBar />

            <div className={styles.wraper}>
                <Outlet />
            </div>

            <TabBar />
        </div>
    )
}