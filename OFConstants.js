//========================================================================
if (require === undefined) {
    var require = function (path) {
        var fm = $.NSFileManager.defaultManager;
        path = path.toString();
        path = path.endsWith(".js") ? path : path + ".js";
        var contents = fm.contentsAtPath(path);
        contents = $.NSString.alloc.initWithDataEncoding(contents, $.NSUTF8StringEncoding);
        var module = {exports: {}};
        var exports = module.exports;
        eval(ObjC.unwrap(contents));
        return module.exports;
    };
    function requireLibrary(name) {
        var ppath = "/Users/Joe/Library/Script Libraries/";
        return require(ppath + name);
    }
    function requireStdio() {
        return Object.assign(requireLibrary("stdio"));
    };

}
var _ = requireLibrary("lodash.js");
var moment = requireLibrary("moment-with-locales.js");

var stdio = stdio || requireStdio();

//========================OFConstants Routine======================================

var cwd = "/Users/Joe/Projects/Mine/osx-jxa/";
var npm = cwd + "node_modules/";

exports.OF = Application('OmniFocus');
exports.OF.includeStandardAdditions = true;
exports.OFDoc = exports.OF.defaultDocument;
