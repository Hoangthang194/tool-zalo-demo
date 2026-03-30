import React, { useState } from 'react';
import { Table, Tag, Typography, Card, Space, Avatar, Input } from 'antd';
import { MessageOutlined, FileTextOutlined, PictureOutlined, SearchOutlined } from '@ant-design/icons';

const { Text } = Typography;

const MOCK_MESSAGES = [
  { key: '1', id: 'm1', from: 'Nguyễn Văn A', group: 'Nhóm Nguồn A', content: 'Chào mọi người, đây là thông tin mới.', type: 'Text', time: '10:30 20/03/2026' },
  { key: '2', id: 'm2', from: 'Trần Thị B', group: 'Nhóm Data Sales', content: 'Báo cáo doanh số tuần này.', type: 'File', time: '10:45 20/03/2026' },
  { key: '3', id: 'm3', from: 'Lê Văn C', group: 'Nhóm Nguồn A', content: 'Hình ảnh dự án.', type: 'Image', time: '11:00 20/03/2026' },
  { key: '4', id: 'm4', from: 'Hệ thống', group: 'Nhóm Đích B', content: '[FORWARDED] Chào mọi người, đây là thông tin mới.', type: 'Text', time: '11:01 20/03/2026' },
];

const MessageList: React.FC<{ searchTerm?: string }> = ({ searchTerm = '' }) => {
  const [filters, setFilters] = useState<Record<string, string>>({
    from: '',
    group: '',
    content: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredMessages = MOCK_MESSAGES.filter(m => {
    const matchesGlobal = !searchTerm || 
      m.from.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocal = 
      (!filters.from || m.from.toLowerCase().includes(filters.from.toLowerCase())) &&
      (!filters.group || m.group.toLowerCase().includes(filters.group.toLowerCase())) &&
      (!filters.content || m.content.toLowerCase().includes(filters.content.toLowerCase()));

    return matchesGlobal && matchesLocal;
  });

  const columns = [
    { 
      title: (
        <div>
          <div>Người gửi</div>
          <Input 
            size="small" 
            placeholder="Lọc..." 
            prefix={<SearchOutlined />}
            value={filters.from}
            onChange={e => handleFilterChange('from', e.target.value)}
            style={{ marginTop: 8, fontWeight: 'normal' }}
          />
        </div>
      ), 
      dataIndex: 'from', 
      key: 'from',
      render: (text: string) => (
        <Space>
           <Avatar size="small">{text.charAt(0)}</Avatar>
           <Text strong>{text}</Text>
        </Space>
      )
    },
    { 
      title: (
        <div>
          <div>Nhóm</div>
          <Input 
            size="small" 
            placeholder="Lọc..." 
            prefix={<SearchOutlined />}
            value={filters.group}
            onChange={e => handleFilterChange('group', e.target.value)}
            style={{ marginTop: 8, fontWeight: 'normal' }}
          />
        </div>
      ), 
      dataIndex: 'group', 
      key: 'group',
      render: (text: string) => <Tag color="geekblue">{text}</Tag>
    },
    { 
      title: (
        <div>
          <div>Nội dung</div>
          <Input 
            size="small" 
            placeholder="Lọc..." 
            prefix={<SearchOutlined />}
            value={filters.content}
            onChange={e => handleFilterChange('content', e.target.value)}
            style={{ marginTop: 8, fontWeight: 'normal' }}
          />
        </div>
      ), 
      dataIndex: 'content', 
      key: 'content',
      render: (text: string, record: any) => {
        let icon = <MessageOutlined />;
        if (record.type === 'Image') icon = <PictureOutlined />;
        if (record.type === 'File') icon = <FileTextOutlined />;
        return (
          <Space>
            {icon}
            <span>{text}</span>
          </Space>
        );
      }
    },
    { title: 'Thời gian', dataIndex: 'time', key: 'time' },
    { 
      title: 'Loại', 
      dataIndex: 'type', 
      key: 'type',
      render: (type: string) => <Tag>{type.toUpperCase()}</Tag>
    },
  ];

  return (
    <Card title="Lịch sử tin nhắn chuyển tiếp" bordered={false}>
      <Table dataSource={filteredMessages} columns={columns} pagination={{ pageSize: 20 }} size="small" />
    </Card>
  );
};

export default MessageList;
