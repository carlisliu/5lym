/**
 * Created by Carlis on 2015/12/3.
 */

exports.defaultStatus = {
    status: 'success'
};

exports.defaultErrorStatus = function (msg, error) {
    if (msg && typeof msg !== 'string') {
        error = msg;
        msg = error.msg || 'Error'
    }
    return {
        status: 'error',
        msg: msg || '',
        error: error
    };
};

exports.status = function (status, msg, data) {
    var length = arguments.length;
    if (!length) {
        return exports.defaultStatus;
    } else if (length === 1) {
        if (typeof status !== 'string'){
            data = status;
            status = null;
        }
    } else if (length === 2) {
        if (typeof  msg === 'object') {
            data = msg;
            msg = null;
        }
    }
    var result = {
        status: status || 'success',
        msg: msg || ''
    };
    if (data) {
        for (var key in data) {
            result[key] = data[key];
        }
    }
    return result;
};