import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Typography, Divider, Card, Space, message, Popconfirm, Avatar, Dropdown, Input, Form, Modal } from 'antd';
import { 
  UserOutlined, 
  SettingOutlined, 
  PlusOutlined,
  DeleteOutlined,
  LoginOutlined,
  UsergroupAddOutlined,
  MessageOutlined,
  LogoutOutlined,
  PlayCircleOutlined,
  StopOutlined,
  SearchOutlined
} from '@ant-design/icons';

// Subcomponents
import StatsOverview from '../components/StatsOverview';
import AccountTable from '../components/AccountTable';
import ForwardConfig from '../components/ForwardConfig';
import ZaloLoginModal from '../components/ZaloLoginModal';
import GroupList from '../components/GroupList';
import MessageList from '../components/MessageList';
import AccountConfigModal from '../components/AccountConfigModal';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const MOCK_ACCOUNTS = [
  { key: '1', id: 'agent-01', name: 'Nguyễn Văn Nam', phone: '0987123456', status: 'running', target: 'Group Tuyển Dụng', sources: 120, messages: 1245 },
  { key: '2', id: 'agent-02', name: 'Trần Thị Hương', phone: '0912345678', status: 'stopped', target: 'Group Support', sources: 45, messages: 890 },
  { key: '3', id: 'agent-03', name: 'Lê Minh Tuấn', phone: '0905556677', status: 'error', target: 'Group MKT', sources: 210, messages: 3412 },
  { key: '4', id: 'agent-04', name: 'Phạm Hồng Thái', phone: '0977888999', status: 'unconfigured', target: 'Chưa cài đặt', sources: 0, messages: 0 },
  { key: '5', id: 'agent-05', name: 'Hoàng Văn Bách', phone: '0933222111', status: 'login_failed', target: '- ', sources: 0, messages: 0 },
];

export default function Dashboard({ onLogout }: { onLogout?: () => void }) {
  const [form] = Form.useForm();
  const [activeMenu, setActiveMenu] = useState('accounts');
  const [accounts, setAccounts] = useState(MOCK_ACCOUNTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentAgentId, setCurrentAgentId] = useState<string | undefined>(undefined);
  const [collapsed, setCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [activeConfigAgentId, setActiveConfigAgentId] = useState<string | undefined>(undefined);

  const handleLoginSuccess = (agentId: string) => {
    const existing = accounts.find(a => a.id === agentId);
    if (!existing) {
      setAccounts([...accounts, { 
        key: Date.now().toString(), 
        id: agentId, 
        name: `User ${agentId}`,
        phone: 'Chưa cập nhật',
        status: 'running', 
        target: 'Chưa cài đặt', 
        sources: 0, 
        messages: 0 
      }]);
    } else {
      setAccounts(accounts.map(a => a.id === agentId ? { ...a, status: 'running' } : a));
    }
    setCurrentAgentId(undefined);
    message.success(`Đăng nhập thành công tài khoản ${agentId}`);
  };

  const deleteAccount = (idOrIds: string | React.Key[]) => {
    const idsToDelete = Array.isArray(idOrIds) ? idOrIds : [idOrIds];
    setAccounts(accounts.filter(a => !idsToDelete.includes(a.id) && !idsToDelete.includes(a.key)));
    if (Array.isArray(idOrIds)) {
      setSelectedRowKeys([]);
      message.success(`Đã xóa ${idsToDelete.length} tài khoản`);
    } else {
      message.success('Đã xóa tài khoản');
    }
  };

  const toggleAccountsStatus = (status: 'running' | 'stopped') => {
    if (selectedRowKeys.length === 0) return;
    setAccounts(accounts.map(a => 
      selectedRowKeys.includes(a.key) || selectedRowKeys.includes(a.id) 
      ? { ...a, status } 
      : a
    ));
    message.success(`Đã ${status === 'running' ? 'chạy' : 'dừng'} ${selectedRowKeys.length} tài khoản`);
  };

  const onSelectionChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleManualLogin = (agentId?: string) => {
    setCurrentAgentId(agentId);
  };

  useEffect(() => {
    if (isModalOpen) {
      const nextId = `agent-${(accounts.length + 1).toString().padStart(2, '0')}`;
      form.setFieldsValue({ id: nextId });
    }
  }, [isModalOpen, accounts, form]);

  const handleAddAccount = () => {
    form.validateFields().then(values => {
      setCurrentAgentId(values.id);
      setIsModalOpen(false);
    });
  };

  const actionButtons = (
    <Space>
      <Button 
        icon={<LoginOutlined />} 
        onClick={() => {
          const firstKey = selectedRowKeys[0];
          const account = accounts.find(a => a.key === firstKey);
          handleManualLogin(account?.id);
        }}
        disabled={selectedRowKeys.length === 0}
      >
        Đăng nhập {selectedRowKeys.length > 0 && `(${selectedRowKeys.length})`}
      </Button>
      
      <Button 
        icon={<SettingOutlined />}
        disabled={selectedRowKeys.length === 0}
        onClick={() => {
          const firstKey = selectedRowKeys[0];
          const account = accounts.find(a => a.key === firstKey);
          setActiveConfigAgentId(account?.id);
          setIsConfigModalOpen(true);
        }}
      >
        Cấu hình
      </Button>

      <Button 
        icon={<PlayCircleOutlined />}
        type="primary"
        onClick={() => toggleAccountsStatus('running')}
        disabled={selectedRowKeys.length === 0}
        style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
      >
        Chạy
      </Button>

      <Button 
        icon={<StopOutlined />}
        onClick={() => toggleAccountsStatus('stopped')}
        disabled={selectedRowKeys.length === 0}
      >
        Dừng
      </Button>

      <Popconfirm
        title="Xóa nhiều tài khoản"
        disabled={selectedRowKeys.length === 0}
        description={`Bạn có chắc muốn xóa ${selectedRowKeys.length} tài khoản đã chọn?`}
        onConfirm={() => deleteAccount(selectedRowKeys)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <Button 
          danger 
          icon={<DeleteOutlined />}
          disabled={selectedRowKeys.length === 0}
        >
          Xóa
        </Button>
      </Popconfirm>
      
      <Divider type="vertical" style={{ height: '24px' }} />

      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
        Thêm tài khoản
      </Button>
    </Space>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="dark">
        <div style={{ height: 64, padding: '16px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: '12px' }}>
          <img src="/logo.png" alt="Logo" style={{ height: 32, objectFit: 'contain' }} />
          {!collapsed && <Text strong style={{ color: '#fff', fontSize: '18px', letterSpacing: '1px' }}>ZALO TOOL</Text>}
        </div>
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['accounts']} 
          mode="inline"
          onSelect={({ key }) => setActiveMenu(key)}
          items={[
            { key: 'accounts', icon: <UserOutlined />, label: 'Tài khoản' },
            { key: 'groups', icon: <UsergroupAddOutlined />, label: 'Danh sách nhóm' },
            { key: 'messages', icon: <MessageOutlined />, label: 'Tin nhắn' },
            { key: 'config', icon: <SettingOutlined />, label: 'Cấu hình' },
          ]}
        />
      </Sider>
      
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0, flex: 1 }}>
            {activeMenu === 'accounts' ? 'Quản lý tài khoản Zalo' : 
             activeMenu === 'groups' ? 'Quản lý nhóm' :
             activeMenu === 'messages' ? 'Lịch sử tin nhắn' : 'Cấu hình hệ thống'}
          </Title>
          <Space size="large">
            <Input
              placeholder="Tìm kiếm nhanh..."
              prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
              allowClear
              style={{ width: 300, borderRadius: 12 }}
              value={globalSearch}
              onChange={e => setGlobalSearch(e.target.value)}
            />
            <Dropdown menu={{ 
              items: [{ 
                key: 'logout', 
                label: 'Đăng xuất', 
                icon: <LogoutOutlined />, 
                danger: true, 
                onClick: onLogout 
              }] 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff', marginRight: 8 }} />
                <Text strong>Admin System</Text>
              </div>
            </Dropdown>
          </Space>
        </Header>
        
        <Content style={{ margin: '24px' }}>
          {activeMenu === 'accounts' && (
            <>
              <StatsOverview 
                totalAccounts={accounts.length} 
                activeWorkers={accounts.filter(a => a.status === 'running').length} 
              />
              <Divider />
              <Card 
                title="Danh sách tài khoản Zalo" 
                bordered={false}
                extra={actionButtons}
              >
                <AccountTable 
                  accounts={accounts.filter(a => 
                    !globalSearch || 
                    a.name.toLowerCase().includes(globalSearch.toLowerCase()) || 
                    a.id.toLowerCase().includes(globalSearch.toLowerCase()) ||
                    a.target.toLowerCase().includes(globalSearch.toLowerCase())
                  )} 
                  selectedRowKeys={selectedRowKeys}
                  onSelectionChange={onSelectionChange}
                />
              </Card>
            </>
          )}

          {activeMenu === 'groups' && <GroupList searchTerm={globalSearch} />}
          {activeMenu === 'messages' && <MessageList searchTerm={globalSearch} />}
          {activeMenu === 'config' && <ForwardConfig />}
        </Content>
      </Layout>

      <Modal 
        title="Thêm tài khoản mới" 
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddAccount}
        okText="Tiếp tục đăng nhập"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" label="Mã định danh (Agent ID)" rules={[{ required: true }]}>
            <Input placeholder="Ví dụ: agent-01" />
          </Form.Item>
        </Form>
      </Modal>

      <ZaloLoginModal 
        open={!!currentAgentId} 
        initialAgentId={currentAgentId}
        onCancel={() => {
          setCurrentAgentId(undefined);
        }} 
        onSuccess={handleLoginSuccess}
      />

      <AccountConfigModal 
        open={isConfigModalOpen}
        agentId={activeConfigAgentId}
        onCancel={() => {
          setIsConfigModalOpen(false);
          setActiveConfigAgentId(undefined);
        }}
        onSave={(agentId, config) => {
          console.log(`Saved config for ${agentId}:`, config);
          setIsConfigModalOpen(false);
          message.success('Cấu hình đã được lưu thành công');
        }}
      />
    </Layout>
  );
}
