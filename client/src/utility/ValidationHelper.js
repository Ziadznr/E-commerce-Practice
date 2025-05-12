class ValidationHelper {
    static IsLater(value) {
        let OnlyLaterRegex = new RegExp("[^A-Za-z'\\s,\\.\\-!/@#$%^&*(){}\\[\\]:;\"'<>\\?/+=|_=\\\\~]+$");
        return OnlyLaterRegex.test(value);
    }

    static IsEmail(value) {
        let EmailRegex = /\S+@\S+\.\S+/;
        return EmailRegex.test(value);
    }

    static IsMobile(value) {
        let MobileRegex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
        return MobileRegex.test(value);
    }

    static IsNumber(value) {
        let OnlyNumberRegex = /^\d+(\.\d+)?$/;
        return OnlyNumberRegex.test(value);
    }

    static IsNull(value) {
        return value == null;
    }

    static IsEmpty(value) {
        return value.length === 0;
    }
}

export default ValidationHelper;