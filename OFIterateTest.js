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

var stdio = stdio || requireStdio();
//========================Omnifocus Routine======================================

var cwd = "/Users/Joe/Projects/Mine/osx-jxa/";
var npm = cwd + "node_modules/";
var {TimeTask, RunLoop, runEvery} = require(cwd + "OFRunLoop.js");
var filters = require(cwd + "OmnifocusFilters.js");
var {evaluateProject} = require(cwd + "OmnifocusRoutine.js");
var {OF, OFDoc} = require(cwd + "OFConstants.js");

var rl = new RunLoop();

// rl.addTasks(
//     runEvery(moment.duration({ "minutes":3}),
//         {
//             task: evaluateProjects
//         }, {
//             shift: moment.duration({ "minutes":0})
//         } )
// );

rl.addTask( {
    enabled:true,
    time: moment(),
    task: () => {
        debugger;
        // var projects = OFDoc.folders.whose({"name": "Checklists"}).at(0).projects.whose({completed: false})();
        //evaluateProjects(projects[0])
        let project = OFDoc.projects.whose({"name": "TestProject"})()[0];
        evaluateProject(project)
    }
});

rl.run();
