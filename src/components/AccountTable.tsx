import React, { useState } from 'react';
import { Table, Tag, Typography, Input, Select } from 'antd';
import { CheckCircleOutlined, StopOutlined, SyncOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface AccountTableProps {
  accounts: any[];
  selectedRowKeys: React.Key[];
  onSelectionChange: (selectedRowKeys: React.Key[]) => void;
}

const AccountTable: React.FC<AccountTableProps> = ({ 
  accounts, 
  selectedRowKeys, 
  onSelectionChange
}) => {
  const [filters, setFilters] = useState<Record<string, string>>({
    name: '',
    phone: '',
    status: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredAccounts = accounts.filter(a => {
    return (!filters.name || a.name.toLowerCase().includes(filters.name.toLowerCase())) &&
           (!filters.phone || (a.phone && a.phone.toLowerCase().includes(filters.phone.toLowerCase()))) &&
           (!filters.status || a.status === filters.status);
  });

  const columns = [
    { 
      title: 'Mã tài khoản', 
      dataIndex: 'id', 
      key: 'id',
      render: (id: string) => <Text type="secondary" style={{ fontSize: '12px' }}>{id}</Text>
    },
    { 
      title: (
        <div>
          <div>Tài Khoản</div>
          <Input 
            size="small" 
            placeholder="Lọc tên..." 
            prefix={<SearchOutlined />}
            value={filters.name}
            onChange={e => handleFilterChange('name', e.target.value)}
            style={{ marginTop: 8, fontWeight: 'normal' }}
          />
        </div>
      ), 
      dataIndex: 'name', 
      key: 'name', 
      render: (text: string) => <Text strong style={{ fontSize: '13px' }}>{text}</Text>
    },
    { 
      title: (
        <div>
          <div>Số điện thoại</div>
          <Input 
            size="small" 
            placeholder="Lọc SĐT..." 
            prefix={<SearchOutlined />}
            value={filters.phone}
            onChange={e => handleFilterChange('phone', e.target.value)}
            style={{ marginTop: 8, fontWeight: 'normal' }}
          />
        </div>
      ), 
      dataIndex: 'phone', 
      key: 'phone' 
    },
    { 
      title: 'Nhóm đích',
      dataIndex: 'target', 
      key: 'target' 
    },
    { title: 'Nhóm nguồn', dataIndex: 'sources', key: 'sources', render: (val: number) => `${val} nhóm` },
    { 
      title: (
        <div>
          <div>Trạng thái</div>
          <div onClick={e => e.stopPropagation()} style={{ marginTop: 8 }}>
            <Select 
              placeholder="Lọc trạng thái" 
              size="small" 
              style={{ width: '100%', fontWeight: 'normal' }}
              allowClear
              value={filters.status || undefined}
              onChange={(val) => handleFilterChange('status', val || '')}
              options={[
                { label: 'Đang chạy', value: 'running' },
                { label: 'Đã dừng', value: 'stopped' },
                { label: 'Lỗi', value: 'error' },
                { label: 'Chưa cấu hình', value: 'unconfigured' },
                { label: 'Đăng nhập lỗi', value: 'login_failed' },
              ]}
            />
          </div>
        </div>
      ),
      dataIndex: 'status', 
      key: 'status', 
      render: (status: string) => {
        let color = 'blue';
        let icon = <CheckCircleOutlined />;
        if (status === 'stopped') { color = 'default'; icon = <StopOutlined />; }
        if (status === 'error') { color = 'red'; icon = <SyncOutlined spin />; }
        if (status === 'unconfigured') { color = 'warning'; icon = <SettingOutlined />; }
        if (status === 'login_failed') { color = 'orange'; icon = <StopOutlined />; }
        
        const statusMap: any = { 
          'running': 'ĐANG CHẠY', 
          'stopped': 'ĐÃ DỪNG', 
          'error': 'LỖI HỆ THỐNG',
          'unconfigured': 'CHƯA CẤU HÌNH',
          'login_failed': 'ĐĂNG NHẬP THẤT BẠI'
        };
        return <Tag icon={icon} color={color}>{statusMap[status] || status.toUpperCase()}</Tag>;
      }
    },
    { title: 'Đã chuyển', dataIndex: 'messages', key: 'messages' },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectionChange,
  };

  return (
    <Table 
      size="small"
      rowSelection={rowSelection}
      dataSource={filteredAccounts} 
      columns={columns} 
      pagination={{ pageSize: 10 }} 
      onRow={(record) => ({
        onClick: () => {
          // Tránh trigger khi click vào nút hoặc dropdown
          // Khi click vào row, chỉ chọn duy nhất row đó
          onSelectionChange([record.key]);
        },
        style: { cursor: 'pointer' }
      })}
    />
  );
};

export default AccountTable;
