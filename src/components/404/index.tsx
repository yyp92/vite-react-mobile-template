import React from 'react';
import { Button, Result } from 'antd-mobile';

export const Page404: React.FC = () => {
    return (
        <div
            style={{
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Result
                status='error'
                title='404'
                description='没有找到页面'
            />
        </div>
    )
}

 