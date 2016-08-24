//========================================================================
if (require == undefined) {
    function require(path) {
        var fm = $.NSFileManager.defaultManager;
        path = path.toString();
        path = path.endsWith(".js") ? path : path + ".js";
        var contents = fm.contentsAtPath(path);
        contents = $.NSString.alloc.initWithDataEncoding(contents, $.NSUTF8StringEncoding);
        var module = {exports: {}};
        var exports = module.exports;
        eval(ObjC.unwrap(contents));
        return module.exports
    };

    function requireLibrary(name) {
        var ppath = "/Users/Joe/Library/Script Libraries/";
        console.log("ppath");
        return require(ppath + name)
    }

    function requireStdio() {
        return Object.assign(requireLibrary("stdio"))
    }
}
var _ = requireLibrary("lodash.js");
var moment = requireLibrary("moment-with-locales.js");

//========================Omnifocus Routine======================================
exports.cleanOutOldChecklists = function () {


    var of = of || Application('OmniFocus');
    var ofDoc = ofDoc || of.defaultDocument;

    function dueAWhileAgo(obj) {
        return obj.dueDate < moment().subtract(3, "hours").toDate();
    }

    function isActive(obj) {
        return obj.status() == "active";
    }

    function hasMethod(obj, method) {
        return obj.note() == "active";
    }

    var completed = false;

    var projects = ofDoc.folders.whose({"name": "Checklists"}).at(0).projects.whose({completed})();
    _.each(projects, function (project) {
        if ((dueAWhileAgo(obj))
            && isActive(obj)) {
            obj.completed = true
        }
    });

};
// var projects = ofDoc.flattenedProjects.whose({completed})();
// _.each(projects, function (project) {
//     if (dueAWhileAgo(project) && obj.status() == "active") obj.completed = true;
// });


//     of_qe = of.quickEntry;
//
//debugger;