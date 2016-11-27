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
        var ppath = "/Users/joe/Projects/Mine/osx-jxa-stdlib/";
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


const evaluator = (function () {
    function pastDue() {
        return object.dueDate() < moment().subtract(3, "hours").toDate();
    }

    function isActive(obj) {
        return obj.status() == "active";
    }

    const deferMove = function (/*...args*/) {
        if (!arguments.length) {

        }


        completed = true

    };
    let autoComplete = function (...args) {
        if ((pastDue(object))
            && isActive(object)) {
        // if (args.length) {
        // }
        // console.log("ohai" + code);
        object.completed = true;
            affect = true;
        }
    };

    const onlyIf = function (arg) {
        return arg;
    };
    const toProject = function (arg) {
        return arg;
    };
    const unless = function (...args) {
        return !onlyIf.apply(this, arguments);
    };
    const all = function (...args) {
        _.reduce(args, function (x, y) {
            return x && y;
        })
    };

    const pastDueChilderen = function(x){
        const w = x || object;
        var kids = [];
        var childeren = object.tasks;
        for (var i = 0; i < childeren.length; i++) {
            var obj = childeren[i];
            console.log(obj.title())
        }

    };
    const recurse = function () {
        // console.log(object.name());
        var tmp = object;
        _.each(tmp.tasks, (x) =>{
            exports.evaluateNote(x)
        });
        object = tmp
    };
    const redate = function (cond, ...args) {
        // console.log(object.name());
        if (cond === undefined || cond) {
            // const overdues = pastDueChilderen();
            console.log("Got here!!");
            console.log(object.name());
            var kids = object.tasks();
            var cursor = moment();
            for (var i = 0; i < kids.length; i++ && cursor.add(1, "day")) {
                var obj = kids[i];
                obj.dueDate = moment(cursor).toDate();
                console.log(obj.name())
            }
        }
    };
    const or = function (...args) {
        _.reduce(args, function (x, y) {
            return x || y;
        })
    };
    const any = function (...args) {
        _.reduce(args, function (x, y) {
            return x || y
        })
    };
    const iAm = function (...args) {
        _.reduce(args, function (x, y) {
            return x && y
        })
    };
    const at = function (...args) {
        _.reduce(args, function (x, y) {
            return x && y
        })
    };
    var object = null;
    const working = true;
    const home = !(working);
    const night = moment().hour() > 22 ;
    const evening = moment().hour() > 17 && moment().hour() < 22 ;
    // const evening =
    const driving = false;
    const when = at;
    return function (dis, code) {
        object = dis;
        (function (code) {
            eval(code);
        }).apply(this, [code]);
    };
})();


exports.cleanOutOldChecklists = function () {

};
// exports.projects = OFDoc.folders.whose({"name": "Checklists"}).at(0).projects.whose({completed:false})();
var affect = false;
exports.evaluateProjects = function () {
    affect = false;
    var projects = OFDoc.flattenedProjects.whose({completed: false})();
    // var projects = OFDoc.folders.whose({"name": "Checklists"}).at(0).projects.whose({completed: false})();
    _.each(projects, function (project) {
        exports.evaluateNote(project)
    });
    if (affect)  evaluateProjects();
    // OFDoc.synchronize()
};
function commands(obj) {
    return _.map(_.filter(obj.note().split("\n"), function (x) {
        return x.charAt(0) == "&"
    }), function (x) {
        return x.substr(1);
    });
}
exports.evaluateNote = function (obj) {
    _.each(commands(obj), function (x) {
        // try{
        evaluator(obj, x);
        // }catch (e){ console.log(e); }
    });
};


// var projects = OFDoc.flattenedProjects.whose({completed})();
// _.each(projects, function (project) {
//     if (dueAWhileAgo(project) && obj.status() == "active") obj.completed = true;
// });


//     of_qe = of.quickEntry;
//
//debugger;
