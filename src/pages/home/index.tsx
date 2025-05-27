import React from 'react'
import {Button, Input} from 'antd-mobile'
import { useStore } from 'zustand'
import {useNavigate, useLocation} from 'react-router-dom'
import { userInfoStore } from '@/store/login'
import styles from './index.module.scss'

const Home = () => {
    const navigate = useNavigate()
     const {
        userInfo,
        setUserInfo
    } = useStore(userInfoStore)

    return (
        <div className={styles.box}>
            首页

            <Button
                color='primary'
                onClick={() => navigate('/403')}
            >403</Button>

            <Button
                color='primary'
                onClick={() => navigate('/login')}
            >login</Button>

            <div style={{ marginTop: 20 }}>
                <div>姓名：{userInfo.userName}</div>

                <Button
                    color="primary"
                    onClick={() => {
                        setUserInfo({
                            userName: '小红',
                            userId: '222'
                        })
                    }}
                >设置姓名</Button>

                <Button
                    color="primary"
                    disabled
                >设置姓名</Button>
            </div>
        </div>
    )
}

export default Home