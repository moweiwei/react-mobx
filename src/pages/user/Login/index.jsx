import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Form, Input } from 'antd'

import img from 'assets/images/login-bg.png'

import styles from './index.less'

@inject('rootStore')
@observer
export default class Login extends Component {
  state = {
    isSubmmiting: false,
  }

  onFinish = data => {
    // eslint-disable-next-line no-console
    console.log('data', data)
    this.props.rootStore.login(data).then(resp => {
      this.setState({ isSubmmiting: false })
      this.props.rootStore.routing.push('/demo')
      if (resp.status !== 200) {
        this.setState({
          errorMessage: resp.message,
        })
      }
    })
  }

  render() {
    const { isSubmmiting } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.text}>
            <p>Welcome</p>
          </div>
          <img src={img} alt="" />
        </div>
        <div className={styles.right}>
          <div className={styles.login}>
            <div className={styles.header}>{t('Log In')}</div>
            <Form onFinish={this.onFinish} onFinishFailed={() => {}}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: t('Please input username or email'),
                  },
                ]}
              >
                <Input name="username" placeholder={t('Username')} />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: t('Please input password') },
                ]}
              >
                <Input.Password name="password" placeholder={t('Password')} />
              </Form.Item>
              <div className={styles.footer}>
                <Button type="control" htmlType="submit" loading={isSubmmiting}>
                  {t('Log In')}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
