appBll.filter('shortDisplay', function () {
    return function (input, length) {
        var _length = 18;

        if (length && angular.isNumber(length)) _length = length

        if (typeof input == "string" && input.length > _length)
            return input.substring(0, _length) + "...";
        else
            return input;
    };
});

