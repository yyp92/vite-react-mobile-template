/**
 * * 用户信息
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

type UserInfoStoreState = {
    userInfo: {
        userId: string,
        userName: string
    }
}

type UserInfoStoreActions = {
    setUserInfo: (
        nextUserInfo: UserInfoStoreState['userInfo']
    ) => void
}

type UserInfoStore = UserInfoStoreState & UserInfoStoreActions

export const userInfoStore = create<UserInfoStore>()(
    persist(
        (set) => ({
            userInfo: {
                userName: '小明',
                userId: '111'
            },
            setUserInfo: (userInfo) => set({userInfo})
        }),
        {
            name: 'userInfo-local'
        }
    )
)
