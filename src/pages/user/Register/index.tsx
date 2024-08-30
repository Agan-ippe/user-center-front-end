import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {Alert, message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history} from 'umi';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  //表单提交
  const handleSubmit = async (values: API.RegisterParams) => {
    const {userPassword,checkPassword} =values;
    //校验，如果两次密码不一致，则直接结束不再做后续请求。
    if (userPassword !== checkPassword){
      message.error('两次密码不一致');
      return;
    }
    try {
      // 注册
      const id = await register(values);
      if (id) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;
        history.push({
          pathname: '/user/login',
          query,
        });
        return;
      } else {
        // 如果失败去设置用户错误信息
        throw new Error(`register error,`+ res.description);
      }

    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(error.message ?? defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig:{
              submitText: '注册'
            }
          }}
          logo={<img alt="logo" src="/logo.svg"/>}
          title="用户管理中心"
          subTitle={'这是基于AntDesignPro开发的一个简易用户管理模块'}
          initialValues={{
            autoLogin: true,
          }}

          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'注册用户账号'}/>
            <Tabs.TabPane key="mobile" tab={'使用手机号注册'}/>
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                  {
                    min: 6,
                    max: 18,
                    type: "string",
                    message: '请输入长度为6-18的账号',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    max: 20,
                    type: "string",
                    message: '密码长度应在8-20之间',
                  },
                  {
                    pattern: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d!@#$%^&*_.]{8,20}$/,
                    message: '用户密码至少包含一个字母和数字',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '再次输入密码是必填项！',
                  },
                  {
                    min: 8,
                    max: 20,
                    type: "string",
                    message: '密码长度应在8-20之间',
                  },
                ]}
              />
            </>
          )}

        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Register;
