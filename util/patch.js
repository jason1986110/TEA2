String.prototype.startsWith = function(str) {
    return this.indexOf(str) === 0;
};
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.endsWithArray = function(arr) {
    for (var v = 0; v < arr.length; v++)
        if (this.endsWith(arr[v]))
            return true;
    return false;
};

Array.prototype.removeIndexAt = function(idx) {
    return this.slice(0, idx).concat(this.slice(idx + 1));
};