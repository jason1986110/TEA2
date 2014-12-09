/*!
 * gliding
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */
var m = require('../../base/base.js').module('built-in-service-more', [__dirname + '/service.js']);
var swig = require('swig');
var ck = require('cookie');
var fs = require('fs');


/*template*/
var cache = {};
var root = m.config('public') || "public";
var render = function(fpath, json) {
    var tpl;
    fpath = root + fpath;
    if (tpl !== undefined) {
        tpl = cache[fpath];
    } else {
        tpl = swig.compileFile(fs.readFileSync(fpath));
        cache[fpath] = tpl;
    }
    return tpl(json);
};

render.renderHTML = function(string, json) {
    return swig.render(string, {
        locals: json
    });
};
m.provider('$render', render);



/*cookie*/
var cget, cset, cwrite;
cget = function(x) {
    return this.val[x];
};

cset = function(x, y) {
    this.val[x] = y;
};
cwrite = function(res) {
    res.setHeader('Set-Cookie', this.val);
};

var cookie = function($scope) {
    var c = {};
    c.val = ck.parse($scope.req.headers.cookie);
    c.get = cget;
    c.set = cset;
    c.write = cwrite;
    return c;
};
m.factory('$cookie', cookie);




/*static server*/
var static_server = function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var realPath = root + pathname;
    path.exists(realPath, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function(err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });

                    response.end(err);
                } else {
                    var contentType = mime.lookup(realPath);
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
};
m.handler('static', static_server);



module.exports = exports = m;