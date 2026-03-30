import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface LoginProps {
  onLogin: (values: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any) => {
    setLoading(true);
    // Authenticate with specific credentials
    setTimeout(() => {
      setLoading(false);
      if (values.username === 'admin' && values.password === 'admin123') {
        onLogin(values);
        message.success('Đăng nhập thành công!');
      } else {
        message.error('Tên đăng nhập hoặc mật khẩu không đúng!');
      }
    }, 1000);
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at top left, #1e3c72, #2a5298, #000428)',
      backgroundSize: 'cover',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      <Card 
        bordered={false} 
        style={{ 
          width: 420, 
          borderRadius: 24, 
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden',
          padding: '24px 12px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ 
            width: 80, 
            height: 80, 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: 12,
          }}>
            <img src="/logo.png" alt="Logo" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
          </div>
          <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontWeight: 800 }}>ZaloForwarder</Title>
          <Text type="secondary" style={{ fontSize: 14 }}>Hệ thống quản lý chuyển tiếp tin nhắn</Text>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} 
              placeholder="Tên đăng nhập" 
              style={{ borderRadius: 12 }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            style={{ marginBottom: 12 }}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Mật khẩu"
              style={{ borderRadius: 12 }}
            />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, alignItems: 'center' }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ fontSize: 13 }}>Ghi nhớ tôi</Checkbox>
            </Form.Item>
            <a href="#" style={{ fontSize: 13, color: '#1890ff' }}>Quên mật khẩu?</a>
          </div>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block 
              icon={<LoginOutlined />}
              style={{ 
                height: 52, 
                borderRadius: 12, 
                fontSize: 16, 
                fontWeight: 600,
                boxShadow: '0 6px 12px rgba(24, 144, 255, 0.2)'
              }}
            >
              Đăng nhập hệ thống
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            © 2026 Admin Zalo. Bản quyền được bảo lưu.
          </Text>
        </div>
      </Card>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}} />
    </div>
  );
};

export default Login;
