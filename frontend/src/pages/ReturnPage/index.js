import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const PaymentReturn = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const handlePaymentResponse = async () => {
            // Lấy các tham số từ URL
            const params = Object.fromEntries([...searchParams]);
            const queryString = new URLSearchParams(params).toString();
            const url = `http://localhost:3000/vnpay/payment/return?${queryString}`;
            console.log(url);
            try {
                // Gửi dữ liệu phản hồi về server để xác minh
                const response = await axios.get(url);

                if (response.data.success) {
                    alert('Thanh toán thành công!');
                    alert('ni ne');
                } else {
                    alert('Thanh toán thất bại. Vui lòng kiểm tra lại.');
                }
            } catch (error) {
                console.error('Lỗi khi xử lý phản hồi thanh toán:', error);
                alert('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        };

        handlePaymentResponse();
    }, [searchParams]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Đang xử lý thanh toán...</h1>
        </div>
    );
};

export default PaymentReturn;
