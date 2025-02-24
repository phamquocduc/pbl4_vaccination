import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentReturn = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const handlePaymentResponse = async () => {
            const params = Object.fromEntries([...searchParams]);
            const queryString = new URLSearchParams(params).toString();
            const url = `http://localhost:3000/vnpay/payment/return?${queryString}`;

            try {
                const response = await axios.get(url);

                if (response.data.success) {
                    setStatus('success');
                    setTimeout(() => {
                        navigate('/recordList');
                    }, 5000);
                } else {
                    setStatus('failure');
                }
            } catch (error) {
                console.error('Lỗi khi xử lý phản hồi thanh toán:', error);
                setStatus('failure');
            }
        };

        handlePaymentResponse();
    }, [searchParams, navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {status === null ? (
                <h1>Đang xử lý thanh toán...</h1>
            ) : status === 'success' ? (
                <div>
                    <h1 style={{ color: 'green' }}>Thanh toán thành công!</h1>
                    <p>Bạn sẽ được chuyển hướng đến trang danh sách trong giây lát...</p>
                </div>
            ) : (
                <div>
                    <h1 style={{ color: 'red' }}>Thanh toán thất bại</h1>
                    <p>Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
                </div>
            )}
        </div>
    );
};

export default PaymentReturn;
