import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import zhCN from 'antd-mobile/es/locales/zh-CN'
import { ConfigProvider } from 'antd-mobile'
import {Content} from './content'
import routerConfig, {RouterConfigItemProps} from '../router'

import styles from './index.module.scss'

interface LayoutProps {
    [key: string]: any
}

export const Layout: React.FC<LayoutProps> = ({}) => {
    useEffect(() => {
        getDarkTheme(0)
    }, [])

    // ********** 操作 **********
    // 主题切换
    const getDarkTheme = (theme: number) => {
        // 获取根元素
        const root = document.documentElement;

        if (theme != 1) {
            // 修改 data-theme 属性的值为 "light"
            root.setAttribute('data-theme', 'light');
            return
        }

        // 修改 data-theme 属性的值为 "dark"
        root.setAttribute('data-theme', 'dark');
    }


    // ********** 渲染 **********
    const renderRouterItem = () => {
        return routerConfig
            .filter((item: RouterConfigItemProps) => !item?.showFullScreen)
            .map((item: RouterConfigItemProps, index: number) => {
                if (item.key === '*') {
                    return <Route
                        path='*'
                        key={item.key}
                        element={item.template}
                    ></Route>
                }

                if (index === 0) {
                    return (
                        <Route
                            index
                            path={item.key}
                            key={item.key}
                            element={item?.template}
                        />
                    )
                }

                return (
                    <Route
                        key={item.key}
                        path={item.key}
                        element={item?.template}
                    />
                )
            })
    }

    const renderContent = () => {
        const list = routerConfig.filter((item: RouterConfigItemProps) => item?.showFullScreen)

        return (
            <Routes>
                <Route path="/" element={<Content />}>
                    {renderRouterItem()}
                </Route> 

                {
                    list.map((item: any) => {
                        return (
                            <Route
                                key={item.key}
                                path={item.key}
                                element={item.template}
                            />
                        )
                    })
                }
            </Routes>
        )
    }

    return (
        <div className={styles.layout}>
            <ConfigProvider
                locale={zhCN}
            >
                <BrowserRouter>
                    {renderContent()}
                </BrowserRouter>
            </ConfigProvider>
        </div>
    )
}