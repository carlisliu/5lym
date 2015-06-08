/**
 * Created by Carlis on 6/6/15.
 */

module.exports = function (req, res, next) {
    res.encased = function (error, res, callback) {
        var data = {}, args;
        if (error) {
            data.status = 'error';
            data.msg = 'Error occurs';
            data.error = error;
            if (req.xhr) {
                return res.json(data);
            } else {
                return res.render('error', data);
            }
        } else {
            data.status = 'success';
            args = [].slice.call(arguments, 2);
            args.unshift(data);
            callback && callback.apply(res, args);
        }
    };
    next();
};