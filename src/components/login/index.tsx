import React from 'react'

import styles from './index.module.scss'

interface LoginProps {
    [key: string]: any
}

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const Login: React.FC<LoginProps> = ({}) => {
    // ********操作 ********　
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
      
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    // ********　渲染 ********　
    return (
        <div className={styles.login}>
            <div className={styles.loginInner}>
                <div  className={styles.title}>登录</div>
            </div>
        </div>
    )
}

export default Login