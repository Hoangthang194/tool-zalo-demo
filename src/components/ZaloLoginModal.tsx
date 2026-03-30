import React, { useState, useRef, useEffect } from 'react';
import { Modal, Space, Button, Input, Alert, Tag } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { initZaloLogin, getZaloStatus } from '../services/api';

interface ZaloLoginModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: (agentId: string) => void;
  initialAgentId?: string;
}

const ZaloLoginModal: React.FC<ZaloLoginModalProps> = ({ open, onCancel, onSuccess, initialAgentId }) => {
  const [agentId, setAgentId] = useState('');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'waiting' | 'scanned' | 'success' | 'error'>('idle');
  const pollingRef = useRef<any>(null);

  const startLogin = async (idToUse?: string) => {
    const id = idToUse || agentId;
    if (!id) return;
    setLoginStatus('waiting');
    setQrCode(null);
    try {
      const resp = await initZaloLogin(id);
      if (resp.data.qrCode) setQrCode(resp.data.qrCode);
      setLoginStatus(resp.data.status || 'waiting');
      startPolling(id);
    } catch (err) {
      setLoginStatus('error');
    }
  };

  const startPolling = (id: string) => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    pollingRef.current = setInterval(async () => {
      try {
        const statusResp = await getZaloStatus(id);
        const { status, qrCode: newQrCode } = statusResp.data;
        setLoginStatus(status);
        if (newQrCode) {
          setQrCode(newQrCode);
        }
        if (status === 'success') {
          stopPolling();
          onSuccess(id);
        }
      } catch (err) {}
    }, 2000);
  };

  const stopPolling = () => {
    if (pollingRef.current) { clearInterval(pollingRef.current); pollingRef.current = null; }
  };

  useEffect(() => {
    if (!open) {
      stopPolling();
      setLoginStatus('idle');
      setAgentId('');
      setQrCode(null);
    } else if (initialAgentId) {
      setAgentId(initialAgentId);
      startLogin(initialAgentId);
    }
  }, [open, initialAgentId]);

  return (
    <Modal 
      title="Thêm tài khoản Zalo mới" 
      open={open} 
      onCancel={onCancel}
      footer={null}
    >
      {loginStatus === 'idle' ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message="Nhập ID duy nhất cho tài khoản này để bắt đầu quy trình đăng nhập." type="info" showIcon />
          <Input 
            placeholder="Ví dụ: sale-agent-01" 
            value={agentId} 
            onChange={e => setAgentId(e.target.value)} 
            size="large"
          />
          <Button type="primary" block size="large" onClick={() => startLogin()}>
            Tạo mã QR đăng nhập
          </Button>
        </Space>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ marginBottom: 20 }}>
            {loginStatus === 'waiting' && <Tag color="warning">ĐANG CHỜ QUÉT MÃ</Tag>}
            {loginStatus === 'scanned' && <Tag color="processing">ĐÃ QUÉT - HÃY XÁC NHẬN TRÊN ĐIỆN THOẠI</Tag>}
            {loginStatus === 'success' && <Tag color="success">ĐĂNG NHẬP THÀNH CÔNG</Tag>}
            {loginStatus === 'error' && <Tag color="error">ĐĂNG NHẬP THẤT BẠI</Tag>}
          </div>
          
          <div style={{ border: '1px solid #f0f0f0', padding: 20, borderRadius: 12, display: 'inline-block', background: '#fff' }}>
            {qrCode ? (
              <img src={qrCode} alt="Zalo QR" style={{ width: 240, height: 240 }} />
            ) : (
              <div style={{ width: 240, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SyncOutlined spin style={{ fontSize: 32, color: '#1890ff' }} />
              </div>
            )}
          </div>
          
          <p style={{ marginTop: 20, color: '#8c8c8c' }}>
            Sử dụng ứng dụng Zalo trên điện thoại để quét mã QR này.
          </p>
          
          {loginStatus === 'success' && (
            <Button type="primary" block onClick={onCancel} style={{ marginTop: 20 }}>
              Hoàn tất & Đóng
            </Button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ZaloLoginModal;
