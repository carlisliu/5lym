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
        if (typeof msg === 'string'){
            msg = status;
        } else {
            data = status;
        }
    } else if (length === 2) {
        if (typeof  msg === 'object') {
            data = msg;
            msg = status;
        }
    }
    var result = {
        status: 'success',
        msg: msg || ''
    };
    if (data) {
        for (var key in data) {
            result[key] = data[key];
        }
    }
    return result;
};