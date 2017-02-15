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
    let object = null;
    let ctxt = null;
    const working = true;
    const home = !(working);
    const night = moment().hour() > 22;
    const evening = moment().hour() > 17 && moment().hour() < 22;
    // const evening =
    const driving = false;

    function pastDue() {
        return this.object.dueDate() < moment().subtract(3, "hours").toDate();
    }

    function isActive(obj) {
        return obj.status() == "active";
    }

    const deferMove = function (/*...args*/) {
        if (!arguments.length) {

        }

    };
    const guardIf = (args) => {
        const condition = args["onlyIf"] || (args["unless"] && not(args["unless"])) || undefined;
        if (condition == undefined) return false;
        return !oif(condition);
    };
    const marco = () => {
        console.log("Oh yas.")
    };
    const duration = (d) => moment.duration(d);

    // const tomorrow = () => moment("to");
    const defer = function (options) {

        if (guardIf(options)) {
            return;
        } else {
            let target = object;
            let {children, to, by, until, redate, cursor, once} = options;
            if (children) {
                var cursor = cursor || moment();
                debugger;
                return log(any(children(function () {
                    // debugger;
                    return defer({to, by, until, redate, cursor, once});
                })()).length);
            }

            if (to) { //project
                // to = typeof to == "function" ? to() : to;
            } else if (redate && by && cursor) {
                this.object.dueDate = cursor.add(moment.duration(oif(by))).toDate();
            }
            else if (by && this.object.dueDate()) { //duration
                log("hai by");
                this.object.dueDate = moment(this.object.dueDate()).add(moment.duration(oif(by))).toDate();
            } else if (until) { //duration
                this.object.dueDate = moment(oif(until)).toDate();
            }
            // if (options["once"]) target = duplicate(object);

            // if (typeof to == "moment") target.dueDate = to.toDate();
            // else  target.project = to;

            // if (options["once"]) {
            //     target.note = target.note() + `#onceId(${target.project.id()})`;
            //     object.completed = true;
            // }
        }
    };

    let autoComplete = function (...args) {
        if ((pastDue(object))
            && isActive(object)) {
            // if (args.length) {
            // }
            object.completed = true;
            ctxt.requiresRecursion = true;
        }
    };

    const onlyIf = function (arg) {
        return (typeof arg == "function") ? arg() : arg;
    };
    const oif = onlyIf;
    const toProject = function (arg) {
        return arg;
    };
    const unless = function (...args) {
        return !onlyIf.apply(this, arguments);
    };
    const pastDueChilderen = function (x) {
        const w = x || object;
        var kids = [];
        var childeren = object.tasks;
        for (var i = 0; i < childeren.length; i++) {
            var obj = childeren[i];
        }
    };

    const recurse = function () {
        var tmp = object;
        _.each(tmp.tasks, (x) => {
            exports.evaluateNote(x)
        });
        object = tmp
    };

    const children = function (fn) {
        let tmp = this.object;
        return () => {
            return _.map(tmp.tasks(), (x) => {
                return exports.evaluateFunc(x, fn, ctxt);
            });
        }
    };


    const redate = function (cond, ...args) {
        if (cond === undefined || cond) {
            // const overdues = pastDueChilderen();
            var kids = object.tasks();
            var cursor = moment();
            for (var i = 0; i < kids.length; i++ && cursor.add(1, "day")) {
                var obj = kids[i];
                obj.dueDate = moment(cursor).toDate();
            }
        }
    };
    const or = function (args) {
        return () => _.reduce(args, function (x, y) {
            return x || y;
        }, false)
    };
    const all = function (args) {
        return () => _.reduce(oif(args), function (x, y) {
            return oif(x) && oif(y);
        }, true)
    };
    const any = function (args) {

        return () => _.reduce(oif(args), function (x, y) {
            return oif(x) || oif(y);
        }, false)
    };
    const moreThan = function (n, args) {
        return () => (_.reduce(oif(args), function (x, y) {
            return oif(y) ? x + 1 : x;
        }, 0) > n);
    };
    const not = function (not) {
        return () => !oif(not);
    };
    const iAm = function (...args) {
        return () => _.reduce(oif(args), function (x, y) {
            return oif(x) && oif(y);
        })
    };
    const at = function (...args) {
        return () => _.reduce(args, function (x, y) {
            return oif(x) && oif(y);
        })
    };
    const when = at;
    const log = console.log;

    return function (dis, code, ctxt) {
        this.object = dis;
        this.ctxt = ctxt;
        if (typeof code == "function") return code.call(this);
        else return (function (code) {
            debugger;
            return eval(code);
        }).call(this, code);
    };
})();


exports.cleanOutOldChecklists = function () {

};
function context(x) {
    return {
        me: x,
        requiresRecursion: false,
        //will call the callback many times potentially. basically a do while on requresRecursion.
        evaluate: function (me, fn) {
            let returnable = null;
            do {
                this.requiresRecursion = false;
                returnable = fn();
            } while (this.me == me && this.requiresRecursion);
            return returnable;

        }
    }
}
// exports.projects = OFDoc.folders.whose({"name": "Checklists"}).at(0).projects.whose({completed:false})();
function commands(obj) {
    return _.map(_.filter(obj.note().split("\n"), function (x) {
        return x.charAt(0) == "&"
    }), function (x) {
        return x.substr(1);
    });
}


exports.evaluateProjects = function (ctxt) {
    (ctxt || context(this)).evaluate(this, function (ctxt) {
        var projects = OFDoc.flattenedProjects.whose({completed: false})();
        // var projects = OFDoc.folders.whose({"name": "Checklists"}).at(0).projects.whose({completed: false})();
        _.each(projects, function (project) {
            exports.evaluateNote(project)
        });
    });
};


exports.evaluateProject = function (project, ctxt) {
    (ctxt || context(this)).evaluate(this, function (ctxt) {
        return exports.evaluateNote(project);
    });
};

exports.evaluateNote = function (obj, ctxt) {
    (ctxt || context(this)).evaluate(this, function (ctxt) {
        _.each(commands(obj), function (x) {
            // try{
            return new evaluator(obj, x, ctxt);
            // }catch (e){ console.log(e); }
        });
    });
};
exports.evaluateFunc = function (obj, func, ctxt) {
    return (ctxt || context(this)).evaluate(this, function (ctxt) {
        return new evaluator(obj, func, ctxt);
    });
};

// var projects = OFDoc.flattenedProjects.whose({completed})();
// _.each(projects, function (project) {
//     if (dueAWhileAgo(project) && obj.status() == "active") obj.completed = true;
// });


//     of_qe = of.quickEntry;
//
//debugger;
