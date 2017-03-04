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


const Evaluator = (function () {
    let object = null;
    let ctxt = null;
    const working = true;
    const home = !(working);
    const night = moment().hour() > 22;
    const evening = moment().hour() > 17 && moment().hour() < 22;
    // const evening =
    const driving = false;

    this.pastDue = function () {
        return this.object.dueDate() < moment().subtract(3, "hours").toDate();
    };

    this.isActive = function () {
        return !this.object.completed();
    };

    this.deferMove = function (/*...args*/) {
        if (!arguments.length) {

        }

    };
    this.guardIf = function (args) {
        const condition = args["onlyIf"] || (args["unless"] && not(args["unless"])) || undefined;
        if (condition == undefined) return false;
        return !oif(condition);
    };
    this.marco = function () {
        console.log("Oh yas.")
    };
    const duration = (d) => moment.duration(d);
    this.projectNamed = function (x) {
        return OFDoc.projects.whose({"name": x})()[0];
    };
    this.specification = function () {
        return {
            name: this.object.name,
            dueDate: this.object.dueDate,
            note: this.object.note(),
            deferDate: this.object.deferDate,
            completed: this.object.completed,
            // estimatedMinutes: this.object.estimatedMinutes()
        };
    };
    this.lightSpecification = function () {
        return {
            name: this.object.name(),
            // dueDate: this.object.dueDate(),
            // note: this.object.note(),
            // deferDate: this.object.deferDate(),
            // completed: this.object.completed(),
            // estimatedMinutes: this.object.estimatedMinutes()
        };
    };
    this.duplication = function () {
        return OF.Task(this.specification());
    };
    this.duplicateAndFetch = function (options) {
        let {to, context} = options;
        if (to){
            to.tasks.push(this.duplication());
            return to.tasks.whose(this.lightSpecification()).at(0);
        } if (context){
            //eh do it later.
        }

    };
    // const tomorrow = () => moment("to");
    this.defer = function (options) {
        if (!this.guardIf(options)) {
            let target = object;
            let {children, descendents, activeChildren, to, by, until, redate, cursor, once} = options;
            descendents = descendents || children || activeChildren;
            if (descendents) {
                cursor = cursor || moment();
                //debugger;
                return log(this.any(descendents.call(this, function () {
                    return this.defer({to, by, until, redate, cursor, once});
                })()).length);
            }
            if (to) { //project
                log("new thing!! :: " + this.duplicateAndFetch({to}).id());
                // to.tasks.push(this.duplication());
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

    this.autoComplete = function (...args) {
        if ((pastDue(object))
            && isActive(object)) {
            // if (args.length) {
            // }
            object.completed = true;
            ctxt.requiresRecursion = true;
        }
    };

    this.onlyIf = function (arg) {
        return (typeof arg == "function") ? arg() : arg;
    };
    const oif = this.onlyIf;

    this.toProject = function (arg) {
        return arg;
    };
    this.unless = function (...args) {
        return !onlyIf.apply(this, arguments);
    };
    this.pastDueChilderen = function (x) {
        const w = x || object;
        var kids = [];
        var childeren = object.tasks;
        for (var i = 0; i < childeren.length; i++) {
            var obj = childeren[i];
        }
    };

    this.recurse = function () {
        let tmp = this.object;
        _.each(tmp.tasks, (x) => {
            exports.evaluateNote(x)
        });
        object = tmp
    };


    this.children = function (fn) {
        return () => {
            return _.flatMap(this.object.tasks(), (x) => {
                const ev = exports.evaluateFunc(x, fn, ctxt);
                return ev ? [ev] : [];
            });
        }
    };
    this.activeChildren = function (fn) {
        return this.children(function () {
            return this.isActive() ? exports.evaluateFunc(this.object, fn, ctxt) : null;
        })
    };


    this.redate = function (cond, ...args) {
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
    this.or = function (args) {
        return () => _.reduce(args, function (x, y) {
            return x || y;
        }, false)
    };
    this.all = function (args) {
        return () => _.reduce(oif(args), function (x, y) {
            return oif(x) && oif(y);
        }, true)
    };
    this.any = function (args) {
        return () => _.reduce(oif(args), function (x, y) {
            return oif(x) || oif(y);
        }, false)
    };
    this.moreThan = function (n, args) {
        return () => (_.reduce(oif(args), function (x, y) {
            return oif(y) ? x + 1 : x;
        }, 0) > n);
    };
    this.not = function (not) {
        return () => !oif(not);
    };
    this.iAm = function (...args) {
        return () => _.reduce(oif(args), function (x, y) {
            return oif(x) && oif(y);
        })
    };
    this.at = function (...args) {
        return () => _.reduce(args, function (x, y) {
            return oif(x) && oif(y);
        })
    };
    const when = this.at;
    const log = console.log;

    this.doEval = function (dis, code, ctxt) {
        this.object = dis;
        this.ctxt = ctxt;
        if (typeof code == "function") return code.call(this);
        else return (function (code) {
            return eval("with(this) " + code);
        }).apply(this, [code]);
    };
});


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
                returnable = fn(this);
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
            return (new Evaluator()).doEval(obj, x, ctxt);
            // }catch (e){ console.log(e); }
        });
    });
};
exports.evaluateFunc = function (obj, func, ctxt) {
    return (ctxt || context(this)).evaluate(this, function (ctxt) {
        return (new Evaluator()).doEval(obj, func, ctxt);
    });
};

// var projects = OFDoc.flattenedProjects.whose({completed})();
// _.each(projects, function (project) {
//     if (dueAWhileAgo(project) && obj.status() == "active") obj.completed = true;
// });


//     of_qe = of.quickEntry;
//
//debugger;
