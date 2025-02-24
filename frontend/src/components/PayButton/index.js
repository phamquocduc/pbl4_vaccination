import classNames from 'classnames/bind';
import styles from './PayButton.module.scss';

const cx = classNames.bind(styles);

function PayButton() {
    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:3000/vnpay/create-payment', {
                orderInfo: 'Thông tin đơn hàng',
                amount: 100000, // Số tiền thanh toán
                returnUrl: 'http://localhost:3000/vnpay/payment/return', // URL trả về sau khi thanh toán
            });

            if (response.status === 201) {
                // Chuyển hướng đến URL thanh toán được trả về từ API
                window.location.href = response.data.paymentUrl;
            } else {
                alert('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi thanh toán:', error);
            alert('Không thể tạo thanh toán. Vui lòng kiểm tra lại.');
        }
    };

    return <PayButton onClick={handlePayment}>Thanh toán nào</PayButton>;
}

export default PayButton;
