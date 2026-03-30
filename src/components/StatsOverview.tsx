import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, CheckCircleOutlined, SyncOutlined, ReloadOutlined } from '@ant-design/icons';

interface StatsProps {
  totalAccounts: number;
  activeWorkers: number;
}

const StatsOverview: React.FC<StatsProps> = ({ totalAccounts, activeWorkers }) => {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic title="Tổng tài khoản" value={totalAccounts} prefix={<UserOutlined />} />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic 
            title="Đang hoạt động" 
            value={activeWorkers} 
            valueStyle={{ color: '#3f8600' }} 
            prefix={<CheckCircleOutlined />} 
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic title="Tin nhắn đã chuyển" value={12450} valueStyle={{ color: '#1890ff' }} prefix={<SyncOutlined />} />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic title="Sức mạnh hệ thống" value={99.9} precision={1} suffix="%" prefix={<ReloadOutlined />} />
        </Card>
      </Col>
    </Row>
  );
};

export default StatsOverview;
