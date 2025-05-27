import React from 'react';
import { Result } from 'antd-mobile';

export const Page403: React.FC = () => {
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
                status="error"
                title="403"
                description="你没有此页面的访问权限。"
            />
        </div>
    )
}