import React, { useEffect } from 'react';
import { Modal, Form, Select, Typography, Space, Row, Col, Badge } from 'antd';
import { UsergroupAddOutlined, ArrowRightOutlined, SettingOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface AccountConfigModalProps {
  open: boolean;
  agentId?: string;
  onCancel: () => void;
  onSave: (agentId: string, config: any) => void;
}

// Giả định danh sách nhóm từ hệ thống
const MOCK_GROUPS = [
  { key: '1', id: 'g12345', name: 'Nhóm Nguồn A' },
  { key: '2', id: 'g67890', name: 'Nhóm Đích B' },
  { key: '3', id: 'g11122', name: 'Nhóm Data Sales' },
  { key: '4', id: 'g44444', name: 'Nhóm Tuyển Dụng' },
  { key: '5', id: 'g55555', name: 'Nhóm Support VIP' },
];

const AccountConfigModal: React.FC<AccountConfigModalProps> = ({ open, agentId, onCancel, onSave }) => {
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (open && agentId) {
      // Load existing config if any
      form.setFieldsValue({
        sources: [],
        targets: []
      });
    }
  }, [open, agentId, form]);

  const handleSave = () => {
    form.validateFields().then((values: any) => {
      onSave(agentId!, values);
    });
  };

  return (
    <Modal
      title={
        <Space>
          <SettingOutlined />
          <span>Cấu hình chuyển tiếp - <Text type="danger">{agentId}</Text></span>
        </Space>
      }
      open={open}
      onCancel={onCancel}
      onOk={handleSave}
      width={700}
      okText="Lưu cấu hình"
      cancelText="Đóng"
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
          <Title level={5} style={{ marginTop: 0 }}>
            <Badge status="processing" text="Nguyên lý hoạt động" />
          </Title>
          <Text type="secondary">
            Tin nhắn từ các <Text strong>Nhóm nguồn</Text> sẽ được hệ thống theo dõi và tự động chuyển về các <Text strong>Nhóm đích</Text> đã chọn cho tài khoản này.
          </Text>
        </div>

        <Row gutter={24}>
          <Col span={11}>
            <Form.Item 
              name="sources" 
              label={<Text strong><UsergroupAddOutlined /> Nhóm NGUỒN</Text>}
              extra="Nơi lấy tin"
            >
              <Select
                mode="multiple"
                showSearch
                style={{ width: '100%', maxHeight: '200px', overflowY: 'auto' }}
                placeholder="Tìm và chọn các nhóm nguồn..."
                optionFilterProp="label"
                options={MOCK_GROUPS.map(g => ({ label: g.name, value: g.id }))}
                size="large"
                allowClear
                listHeight={320}
              />
            </Form.Item>
          </Col>
          
          <Col span={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '32px' }}>
            <ArrowRightOutlined style={{ fontSize: '24px', color: '#bfbfbf' }} />
          </Col>

          <Col span={11}>
            <Form.Item 
              name="targets" 
              label={<Text strong><UsergroupAddOutlined /> Danh sách nhóm ĐÍCH</Text>}
              extra="Nơi nhận tin"
            >
              <Select
                mode="multiple"
                showSearch
                style={{ width: '100%', maxHeight: '200px', overflowY: 'auto' }}
                placeholder="Tìm và chọn các nhóm đích..."
                optionFilterProp="label"
                options={MOCK_GROUPS.map(g => ({ label: g.name, value: g.id }))}
                size="large"
                allowClear
                listHeight={320}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AccountConfigModal;
