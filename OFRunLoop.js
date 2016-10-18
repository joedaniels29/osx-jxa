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
var { _ } = requireLibrary("lodash.js");
var moment = requireLibrary("moment-with-locales.js");
var momentRange = requireLibrary("moment-range.js");

stdio = stdio || requireStdio();
//========================Omnifocus Routine======================================


var epochBegin = moment().startOf('month');
var epochEnd = moment(epochBegin).add("month", 1);
function epsilonClose(time){
    return Math.abs(moment(time).diff(moment(),"minutes") < 15);
}

exports.TimeTask =  function (properties) {
    var noop = function () {
        stdio.alert("ohai");
    };
    this.time = moment().startOf("day").toDate();
    this.run = noop;
    this.enabled = true;
    for (k in properties) this[k] = properties[k];
};

exports.runEvery = function(duration, properties, options){
    var range = moment.range(epochBegin, epochEnd);
    var ret = [];

    range.by(duration, function(m) {
        var task = new exports.TimeTask(properties);
        task.time = (options && options.shift ? moment(m)
            .add(options.shift) : moment(m))
            .toDate();
        ret.push(task);
    });

    return ret;
};
exports.RunLoop =  function RunLoop(properties){
    this.tasks = [];
    this.addTask = function(t){this.tasks.push(t)};
    this.addTasks = function(t){this.tasks = this.tasks.concat(t)};

    this.run = function(){
        debugger;
        _.forEach(this.tasks, function(task){
            if (!epsilonClose(task.time)) return;
            if (!task.enabled) return;
            task.task()
        });
    };

    for (k in properties) this[k] = properties[k];
};
