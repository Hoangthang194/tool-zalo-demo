import React from 'react';
import { Card, Form, Input, Space, Switch, Button, Row, Col, Divider, Typography } from 'antd';
import { SettingOutlined, SecurityScanOutlined, MessageOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ForwardConfig: React.FC = () => {
  return (
    <Card 
      title={<Space><SettingOutlined /><span>Cấu hình hệ thống chuyển tiếp</span></Space>} 
      bordered={false}
    >
      <Form layout="vertical">
        <Row gutter={48}>
          <Col xs={24} md={12}>
            <Title level={5}><MessageOutlined /> Tham số chuyển tiếp</Title>
            <Divider style={{ margin: '12px 0' }} />
            
            <Form.Item label="Độ trễ khi chuyển tin nhắn (ms)" initialValue={2000}>
              <Input type="number" placeholder="Ví dụ: 2000" size="large" />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                * Khoảng nghỉ giữa mỗi tin nhắn để tránh bị Zalo đánh dấu spam (khuyên dùng &gt; 1000ms).
              </Text>
            </Form.Item>

            <Form.Item label="Số lần thử lại tối đa khi lỗi" initialValue={3}>
              <Input type="number" placeholder="Ví dụ: 3" size="large" />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                * Hệ thống sẽ tự động gửi lại nếu gặp lỗi mạng hoặc lỗi API tạm thời.
              </Text>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Title level={5}><SecurityScanOutlined /> Loại nội dung & Bảo mật</Title>
            <Divider style={{ margin: '12px 0' }} />

            <Form.Item label="Các nội dung được phép chuyển tiếp">
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f9f9f9', borderRadius: '8px' }}>
                  <span>Chuyển tiếp Hình ảnh</span>
                  <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f9f9f9', borderRadius: '8px' }}>
                  <span>Chuyển tiếp Video</span>
                  <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f9f9f9', borderRadius: '8px' }}>
                  <span>Chuyển tiếp Tệp tin (PDF, Doc, Zip...)</span>
                  <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f9f9f9', borderRadius: '8px' }}>
                  <span>Chuyển tiếp Nhãn dán (Stickers)</span>
                  <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                </div>
              </Space>
            </Form.Item>

            <Form.Item label="Tự động dọn dẹp bộ nhớ đệm" initialValue={true} valuePropName="checked">
              <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
              <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>
                * Tự động xóa file tạm sau khi đã chuyển tiếp thành công.
              </div>
            </Form.Item>
          </Col>
        </Row>

        <Divider />
        
        <div style={{ textAlign: 'right' }}>
          <Space>
            <Button size="large">Hủy thay đổi</Button>
            <Button type="primary" size="large" icon={<SettingOutlined />}>
              Lưu cấu hình hệ thống
            </Button>
          </Space>
        </div>
      </Form>
    </Card>
  );
};

export default ForwardConfig;
