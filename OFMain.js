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

stdio = stdio || requireStdio();

//========================Omnifocus Routine======================================

var cwd = "/Users/Joe/Projects/Mine/osx-jxa/";
var npm = cwd + "node_modules/";
var {TimeTask, RunLoop, runEvery} = require(cwd + "OFRunLoop.js");
var {cleanOutOldChecklists} = require(cwd + "OmnifocusRoutine.js");

var rl = new RunLoop();

rl.addTasks(
    runEvery(moment().duration(30, "minutes"),
        {
            task: function () {
                stdio.alert("hai Gurl");
            }
        }, {
            shift: moment().duration(5, "minutes")
        })
);

rl.addTask(runEvery(moment().duration(6, "hours"), {
    task: cleanOutOldChecklists
}));

rl.run();





