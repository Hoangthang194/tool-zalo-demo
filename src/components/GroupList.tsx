import React, { useState } from 'react';
import { Table, Tag, Typography, Card, Avatar, Space, Input, Select } from 'antd';
import { UsergroupAddOutlined, SearchOutlined } from '@ant-design/icons';

const { Text } = Typography;

const MOCK_GROUPS = [
  { key: '1', id: 'g12345', name: 'Nhóm Nguồn A', memberCount: 156, type: 'Source', avatar: '', account: 'Nguyễn Văn Nam' },
  { key: '2', id: 'g67890', name: 'Nhóm Đích B', memberCount: 500, type: 'Target', avatar: '', account: 'Trần Thị Hương' },
  { key: '3', id: 'g11122', name: 'Nhóm Data Sales', memberCount: 89, type: 'Source', avatar: '', account: 'Lê Minh Tuấn' },
];

const GroupList: React.FC<{ searchTerm?: string }> = ({ searchTerm = '' }) => {
  const [filters, setFilters] = useState<Record<string, string>>({
    name: '',
    id: '',
    account: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredGroups = MOCK_GROUPS.filter(g => {
    const matchesGlobal = !searchTerm || 
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      g.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.account.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocal = 
      (!filters.name || g.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.id || g.id.toLowerCase().includes(filters.id.toLowerCase())) &&
      (!filters.account || g.account.toLowerCase().includes(filters.account.toLowerCase()));

    return matchesGlobal && matchesLocal;
  });

  const columns = [
    { 
      title: (
        <div>
          <div>Tài khoản</div>
          <Select 
            size="small" 
            placeholder="Chọn..." 
            allowClear
            style={{ width: '100%', marginTop: 8, fontWeight: 'normal' }}
            value={filters.account || undefined}
            onChange={val => handleFilterChange('account', val || '')}
            options={Array.from(new Set(MOCK_GROUPS.map(g => g.account))).map(acc => ({ label: acc, value: acc }))}
          />
        </div>
      ), 
      dataIndex: 'account', 
      key: 'account',
      render: (text: string) => <Tag color="cyan">{text}</Tag>
    },
    { 
      title: (
        <div>
          <div>Tên nhóm</div>
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
      render: (text: string) => (
        <Space size="small">
          <Avatar icon={<UsergroupAddOutlined />} />
          <Text strong>{text}</Text>
        </Space>
      )
    },
    { 
      title: (
        <div>
          <div>ID Nhóm</div>
          <Input 
            size="small" 
            placeholder="Lọc ID..." 
            prefix={<SearchOutlined />}
            value={filters.id}
            onChange={e => handleFilterChange('id', e.target.value)}
            style={{ marginTop: 8, fontWeight: 'normal' }}
          />
        </div>
      ), 
      dataIndex: 'id', 
      key: 'id' 
    },
    { title: 'Thành viên', dataIndex: 'memberCount', key: 'memberCount', render: (val: number) => `${val} người` },
    { 
      title: 'Loại', 
      dataIndex: 'type', 
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'Target' ? 'gold' : 'blue'}>{type === 'Target' ? 'NHÓM ĐÍCH' : 'NHÓM NGUỒN'}</Tag>
      )
    },
  ];

  return (
    <Card title="Danh sách các nhóm Zalo" bordered={false}>
      <Table 
        size="small"
        dataSource={filteredGroups} 
        columns={columns} 
        pagination={{ pageSize: 15 }} 
      />
    </Card>
  );
};

export default GroupList;
