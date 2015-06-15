/**
 * Created by Carlis on 6/6/15.
 */

var isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(object) === '[object Array]';
};
// Borrow from jQuery, change a little bit.
var isPlainObject = function (obj) {
    var key, hasOwn = ({}).hasOwnProperty;
    //Because this method is used in server side, so remove browse-related code.
    //By Carlis [2015-06-06]
    // Not own constructor property must be Object
    if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
    }
    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    for (key in obj) {
    }
    return key === undefined || hasOwn.call(obj, key);
}
// Borrow from jQuery, change a little bit.
var extend = function () {
    var src, copyIsArray, copy, name, options, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;
        // skip the boolean and the target
        target = arguments[ i ] || {};
        i++;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && typeof target !== 'function') {
        target = {};
    }
    // extend itself if only one argument is passed
    if (i === length) {
        target = this;
        i--;
    }
    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[ i ]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[ name ];
                copy = options[ name ];
                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }
                // Recurse if we're merging plain objects or arrays
                if (deep && copy && ( isPlainObject(copy) || (copyIsArray = isArray(copy)) )) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && isArray(src) ? src : [];
                    } else {
                        clone = src && isPlainObject(src) ? src : {};
                    }
                    // Never move original objects, clone them
                    target[ name ] = extend(deep, clone, copy);
                } else if (copy !== undefined) {  // Don't bring in undefined values
                    target[ name ] = copy;
                }
            }
        }
    }
    // Return the modified object
    return target;
};

var extendProps = function (target, source, props) {
    var key;
    if (isArray(props)) {
        for (key in source) {
            if (props.indexOf(key) > -1) {
                target[key] = source[key];
            }
        }
        return target;
    }
    return extend.apply(this, [].slice.call(arguments, 0));
};

module.exports = {
    extend: extend,
    extendProps: extendProps
}