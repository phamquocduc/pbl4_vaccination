export enum ExceptionEnum{
    DULICATE_PROPERTIES,
    INVALID_EMAIL,
    USER_NOT_EXIT,
    INCORECT_PASSWORD,
    CONFIRM_PASSWORD_NOT_MATCH,
    PASSWORD_INVALID,
    CURR_PASSWORD_INVALID,
    EXCEED_THE_LIMIT,
    INVALID_PHONE_NUMBER,
    PROFILE_NOT_EXIT,
    DONT_HAVE_PERMISSION,
    VACCINATION_CENTER_NOT_EXIT,
    VACCINE_DESCRIPTION_NOT_EXIT,
    VACCINE_NOT_EXIT,
}

export function createExceptionMessage(type: ExceptionEnum): string {
    switch (type) {
        case ExceptionEnum.DULICATE_PROPERTIES:
            return 'Properties already exists';
        case ExceptionEnum.INVALID_EMAIL:
            return 'Email is invalid';
        case ExceptionEnum.USER_NOT_EXIT:
            return 'User does not exist';
        case ExceptionEnum.INCORECT_PASSWORD:
            return 'Password is incorrect';
        case ExceptionEnum.CONFIRM_PASSWORD_NOT_MATCH:
            return 'Confirm password and current password not match';
        case ExceptionEnum.PASSWORD_INVALID:
            return 'Password has at least 8 characters';
        case ExceptionEnum.CURR_PASSWORD_INVALID:
            return 'Current password incorect';
        case ExceptionEnum.EXCEED_THE_LIMIT:
            return 'Vaccination Profile limited';
        case ExceptionEnum.INVALID_PHONE_NUMBER:
            return 'Invalid phone number';
        case ExceptionEnum.PROFILE_NOT_EXIT:
            return 'Profile not exit';
        case ExceptionEnum.DONT_HAVE_PERMISSION:
            return 'Dont have permission';
        case ExceptionEnum.VACCINATION_CENTER_NOT_EXIT:
            return 'Vaccination center not exit';
        case ExceptionEnum.VACCINE_DESCRIPTION_NOT_EXIT:
            return 'Vaccine description not exit';
        case ExceptionEnum.VACCINE_NOT_EXIT:
            return 'Vaccine not exit';
        default:
            return 'Unknown error';
    }
}
