import React from 'react'
import {Button, Input} from 'antd-mobile'
import styles from './index.module.less'

const DEMO = () => {
    return (
        <div className={styles.box}>
            <Button color="primary">123</Button>
            <Input placeholder='请输入内容'/>

        </div>
    )
}

export default DEMO