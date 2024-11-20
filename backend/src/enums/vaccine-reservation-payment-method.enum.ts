export enum EPaymentMethod {
    CREDIT_CARD = 'Thẻ tín dụng',  
    DEBIT_CARD = 'Thẻ ghi nợ',    
    VNPAY = 'VNpay',            
    BANK_TRANSFER = 'Chuyển khoản ngân hàng',  
    CASH = 'Thanh toán tiền mặt sau khi hoàn thành',               
}


export enum EVNPaymentMethod {
    VNPAYQR = 'Thanh toán VNPAYQR code',  
    VNBANK = 'Thẻ thanh toán nội địa',          
    INTCARD = 'Thẻ thanh toán quốc tế',      
}

export function createVNPayMethodParam(value: string){
    switch(value){
        case EVNPaymentMethod.VNPAYQR:
            return 'VNPAYQR'
        case EVNPaymentMethod.VNBANK:
            return 'VNBANK'
        case EVNPaymentMethod.INTCARD:
            return 'INTCARD'
    }
}