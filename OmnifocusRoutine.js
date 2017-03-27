//========================================================================
if (require == undefined) {
    function require(path) {
        let fm = $.NSFileManager.defaultManager;
        path = path.toString();
        path = path.endsWith(".js") ? path : path + ".js";
        let contents = fm.contentsAtPath(path);
        contents = $.NSString.alloc.initWithDataEncoding(contents, $.NSUTF8StringEncoding);
        let module = {exports: {}};
        let exports = module.exports;
        eval(ObjC.unwrap(contents));
        return module.exports
    };

    function requireLibrary(name) {
        let ppath = "/Users/joe/Projects/Mine/osx-jxa-stdlib/";
        return require(ppath + name)
    }

    function requireStdio() {
        return Object.assign(requireLibrary("stdio"))
    }
}
const _ = requireLibrary("lodash.js");
const moment = requireLibrary("moment-with-locales.js");
requireLibrary("moment-range.js");
//========================Omnifocus Routine======================================


const cwd = "/Users/Joe/Projects/Mine/osx-jxa/";
const npm = cwd + "node_modules/";
const TimeTask, RunLoop, runEvery;
const filters = require(cwd + "OmnifocusFilters.js");
const {OF, OFDoc} = require(cwd + "OFConstants.js");

let EVAL_CHAR;
const kREMOVED = -100;
BETA = false;
if (BETA) {
    EVAL_CHAR = "@";
} else {
    EVAL_CHAR = "#";

}

const Evaluator = function () {
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
            dueDate: this.object.dueDate(),
            note: this.object.note(),
            deferDate: this.object.deferDate,
            completed: this.object.completed(),
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
        let {to, ofcontext} = options;
        if (to) {
            to.tasks.push(this.duplication());
            return to.tasks.whose(this.lightSpecification()).at(0);
        }
        if (ofcontext) {
            //eh do it later.
        }

    };
    this.handlingDuplication = function (options, body) {
        if (options.once || options.to) {
            var d = this.withDuplicate(options, body);
            this.object.completed = true;
            return d;
        } else {
            return body.call(this);
        }

    };
    this.remove = function (params) {
        let oid = params["oid"];
        if (this.object.id() != oid) {
            this.ctxt.markAndSweep["delete"] = this.ctxt.markAndSweep["delete"] || [];
            this.ctxt.markAndSweep["delete"].push(this.object.id());
            return kREMOVED;
        }
    };
    this.withDuplicate = function (options, body) {
        const duplicate = this.duplicateAndFetch(options);
        if (typeof body == "function") exports.evaluateFunc(duplicate, body, ctxt);
        if (options["once"]) duplicate.note = duplicate.note() + evaluable("remove", {oid: duplicate.id()});
        return duplicate
    };
    // const tomorrow = () => moment("to");
    this.defer = function (options) {
        if (!this.guardIf(options)) {
            let {descendents, children, activeChildren} = options;

            let passableOptions = {};
            for (let k in options)
                if (!{descendents, children, activeChildren}[k]
                    && options.hasOwnProperty(k)) passableOptions[k] = options[k];

            let {to, by, until, redate, cursor, once} = passableOptions;

            descendents = descendents || children || activeChildren;
            if (descendents) {
                //the notion of a cursor only really makes sense if you are working with a list of things.
                cursor = cursor || moment();
                //debugger;
                return log(this.any(descendents.call(this, function () {
                    return this.defer(passableOptions);
                })()).length);
            }
            this.handlingDuplication(passableOptions, function () {
                //to is handled in the duplicator.
                if (redate && by && cursor) {
                    this.object.dueDate = cursor.add(moment.duration(oif(by))).toDate();

                }
                else if (by && this.object.dueDate()) { //duration
                    this.object.dueDate = moment(this.object.dueDate()).add(moment.duration(oif(by))).toDate();
                } else if (until) { //duration
                    this.object.dueDate = moment(oif(until)).toDate();
                }
            });
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
        let kids = [];
        let childeren = object.tasks();
        for (let i = 0; i < childeren.length; i++) {
            let obj = childeren[i];
        }
    };

    this.recurse = function () {
        let tmp = this.object;
        _.each(tmp.tasks(), (x) => {
            exports.evaluateNote(x)
        });
        object = tmp
    };


    this.children = function (fn) {
        return () => {
            return _.flatMap(this.object.tasks(), (x) => {
                const ev = exports.evaluateFunc(x, fn, ctxt);
                return ev != null ? [ev] : [];
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
            const kids = object.tasks();
            let cursor = moment();
            for (let i = 0; i < kids.length; i++ && cursor.add(1, "day")) {
                let obj = kids[i];
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
};


exports.cleanOutOldChecklists = function () {

};
function context(x) {
    return {
        me: x,
        requiresRecursion: false,
        markAndSweep: {},
        delete: function (xs) {
            return _.each(xs, (x) => OFDoc.tasks.byId(x).delete())
        },
        //will call the callback many times potentially. basically a do while on requresRecursion.
        evaluate: function (me, fn) {
            let returnable = null;
            do {
                this.requiresRecursion = false;
                returnable = fn(this);
                for (let k in this.markAndSweep) if (this.markAndSweep.hasOwnProperty(k)) {
                    this[k](this.markAndSweep[k]);
                    this.markAndSweep[k] = null;
                }
            } while (this.me == me && this.requiresRecursion);
            return returnable;

        }
    }
}

function toDry(it) {
    switch (typeof it) {
        case "string":
            return it;
        case "function":
            return it.name;
        case "number":
            return String(it);
        case "object":
            return JSON.stringify(it);
        default:
            return it;
    }

}
function evaluable(func, ...args) {
    return `\n${EVAL_CHAR}${toDry(func)}(${args.map(toDry).join(", ")});`;
}


// exports.projects = OFDoc.folders.whose({"name": "Checklists"}).at(0).projects.whose({completed:false})();
function commands(obj) {
    debugger;
    return _.map(_.filter(obj.note().split("\n"), function (x) {
        if (x.length == 0) return false;
        return x.charAt(0) == EVAL_CHAR
    }), function (x) {
        return x.substr(1);
    });
}


exports.evaluateProjects = function (ctxt) {
    (ctxt || context(this)).evaluate(this, function (ctxt) {
        let projects = OFDoc.flattenedProjects.whose({completed: false})();
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
            const evaluated = (new Evaluator()).doEval(obj, x, ctxt);

            // handles when you remove. Dont continue operating on a context that has a removed this.object
            return evaluated == kREMOVED ? false : evaluated;
            // }catch (e){ console.log(e); }
        });
    });
};
exports.evaluateFunc = function (obj, func, ctxt) {
    return (ctxt || context(this)).evaluate(this, function (ctxt) {
        return (new Evaluator()).doEval(obj, func, ctxt);
    });
};