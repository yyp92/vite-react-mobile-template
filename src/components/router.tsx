import React from 'react'
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
import Home from '@/pages/home'
import Todo from '@/pages/todo'
import Message from '@/pages/message'
import Mine from '@/pages/mine'
import { Page403 } from '@/components/403'
import { Page404 } from '@/components/404'
import Login from '@/components/login'

export interface RouterConfigItemProps {
    label: React.ReactNode,
    key: string,
    icon?: React.ReactNode,
    template?: React.ReactNode | null,

    // 是否在菜单里显示
    hideInMenu?: boolean,

    // 是否全屏显示
    showFullScreen?: boolean,
    children?: RouterConfigItemProps[],
}

const routerConfig: RouterConfigItemProps[] = [
    {
        label: '首页',
        key: 'home',
        icon: <AppOutline />,
        hideInMenu: false,
        template: <Home />,
    },

    {
        label: '待办',
        key: 'todo',
        icon: <UnorderedListOutline />,
        hideInMenu: false,
        template: <Todo />,
    },

    {
        label: '消息',
        key: 'message',
        icon: <MessageOutline />,
        hideInMenu: false,
        template: <Message />,
    },

    {
        label: '我的',
        key: 'personalCenter',
        icon: <UserOutline />,
        hideInMenu: false,
        template: <Mine />,
    },

    // 需要全屏显示的页面
    {
        label: '分组24',
        key: 'group24',
        icon: null,
        hideInMenu: true,
        showFullScreen: true,
        template: <>group22</>,
    },

    
    // login
    {
        key: 'login',
        label: 'login',
        template: <Login />,
        icon: null,
        hideInMenu: true,
        showFullScreen: true,
    },

    // 403
    {
        key: '403',
        label: '403',
        template: <Page403 />,
        icon: null,
        hideInMenu: true,
        showFullScreen: true,
    },

    // 404
    {
        key: '*',
        label: '404',
        template: <Page404 />,
        icon: null,
        hideInMenu: true,
    },
]

export default routerConfig