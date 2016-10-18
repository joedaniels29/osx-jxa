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

var stdio = stdio || requireStdio();
//========================Omnifocus Routine======================================

var cwd = "/Users/Joe/Projects/Mine/osx-jxa/";
var npm = cwd + "node_modules/";
var {TimeTask, RunLoop, runEvery} = require(cwd + "OFRunLoop.js");
var filters = require(cwd + "OmnifocusFilters.js");
var {cleanOutOldChecklists} = require(cwd + "OmnifocusRoutine.js");

var rl = new RunLoop();

debugger
rl.addTasks(
    runEvery(moment.duration({ "minutes":3}),
        {
            task: function () {
                stdio.alert("hai Gurl");
            }
        }, {
            shift: moment.duration({ "minutes":5})
        } )
);

rl.addTask(runEvery(moment.duration({ "hours":6}), {
    task: cleanOutOldChecklists
}));

rl.run();
