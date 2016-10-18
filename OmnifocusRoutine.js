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
requireLibrary("moment-range.js");
//========================Omnifocus Routine======================================


var cwd = "/Users/Joe/Projects/Mine/osx-jxa/";
var npm = cwd + "node_modules/";
var {TimeTask, RunLoop, runEvery} = require(cwd + "OFRunLoop.js");
var filters = require(cwd + "OmnifocusFilters.js");
var {OF, OFDoc} = require(cwd + "OFConstants.js");


var evalWithinContext = function (context, code) {
    (function (code) {
        eval(code);
    }).apply(context, [code]);
};


const actions = {
    deferMove: function(/*...args*/){
        if (!arguments.length) {

        }


        this.completed = true

    },
    autoComplete: function(x /*,...args*/){
        if (arguments.length) {


        }


        x.completed = true

    },


    onlyIf: function(arg){

        return arg
    },
    unless: function(/*...args*/){
        return !onlyIf.apply(this, arguments)
    },
    all: function(/*...args*/){
        _.reduce(args, function (x, y) {
            return x && y
        })
    },
    any: function(/*...args*/){
        _.reduce(args, function (x, y) {
            return x || y
        })
    },
    iAm: function(/*...args*/){
        _.reduce(args, function (x, y) {
            return x && y
        })
    },

};


function EvaluateNote() {


}
exports.cleanOutOldChecklists = function () {
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
function commands(obj) {
    return _.map(_.filter(obj.note().split("\n"), function (x) {
        x.charAt(0) == "&"
    }), function (x) {
        return x.substr(1);
    });
}
exports.evaluateNote = function (obj) {
    _.each(commands(obj), function (x){
        evalWithinContext(actions, x);
    });
};


// var projects = ofDoc.flattenedProjects.whose({completed})();
// _.each(projects, function (project) {
//     if (dueAWhileAgo(project) && obj.status() == "active") obj.completed = true;
// });


//     of_qe = of.quickEntry;
//
//debugger;
