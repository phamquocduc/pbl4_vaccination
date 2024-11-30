export enum EPaymentMethod {
    VNPAY = 'VNpay',             
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