var require = function (path) {
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
    return require(ppath + name)
}
function requireStdio() {
    return Object.assign(requireLibrary("stdio"))
};


// - (NSString *) id;  // The identifier of the task.
//  OmniFocusRichText *note;  // The note of the task.
//  NSString *name;  // The name of the task.
//  id context;  // The task's context.  If a child is added, this will be used for its context.
//  completedByChildren;  // If true, complete when children are completed.
//  sequential;  // If true, any children are sequentially dependent.
//  flagged;  // True if flagged
//  NSDate *creationDate;  // When the task was created.  This can only be set when the object is still in the inserted state.  For objects created in the document, it can be passed with the creation properties.  For objects in a quick entry tree, it can be set until the quick entry panel is saved.
//  id deferDate;  // When the task should become available for action.
//  id dueDate;  // When the task must be finished.
//  id estimatedMinutes;  // The estimated time, in whole minutes, that this task will take to finish.
// delete()
//what to do?
// (void) setId: (NSString *) id;
//
// (SBElementArray *) tasks;
// (SBElementArray *) flattenedTasks;
//
//
// @property (copy, readonly) id container;  // The containing task, project or document.
// @property (copy, readonly) id containingProject;  // The task's project, up however many levels of parent tasks.  Inbox tasks aren't considered contained by their provisionalliy assigned container, so if the task is actually an inbox task, this will be missing value.
// @property (copy, readonly) id parentTask;  // The task holding this task.  If this is missing value, then this is a top level task -- either the root of a project or an inbox item.
// @property (copy, readonly) id containingDocument;  // The containing document or quick entry tree of the object.
// @property (readonly) BOOL inInbox;  // Returns true if the task itself is an inbox task or if the task is contained by an inbox task.
// @property (readonly) BOOL next;  // If the task is the next task of its containing project, next is true.
// @property (readonly) BOOL blocked;  // True if the task has a task that must be completed prior to it being actionable.
// @property (copy, readonly) NSDate *modificationDate;  // When the task was last modified.
// @property (copy) id completionDate;  // The task's date of completion.
// @property BOOL completed;  // True if the task is completed.
// @property (copy) id repetitionRule;  // The repetition rule for this task, or missing value if it does not repeat.
// @property (readonly) NSInteger numberOfTasks;  // The number of direct children of this task.
// @property (readonly) NSInteger numberOfAvailableTasks;  // The number of available direct children of this task.
// @property (readonly) NSInteger numberOfCompletedTasks;  // The number of completed direct children of this task.
//
// - (void) closeSaving:(OmniFocusSaveOptions)saving savingIn:(NSURL *)savingIn;  // Close a document.
// - (void) saveIn:(NSURL *)in_ as:(NSString *)as compression:(BOOL)compression;  // Save a document.
// - (void) printWithProperties:(NSDictionary *)withProperties printDialog:(BOOL)printDialog;  // Print a document.
// - (void) delete;  // Delete an object.
// - (id) duplicateTo:(SBObject *)to withProperties:(NSDictionary *)withProperties;  // Copy an object.
// - (SBObject *) moveTo:(SBObject *)to;  // Move an object to a new location.
// - (SBObject *) archiveIn:(NSURL *)in_ compression:(BOOL)compression summaries:(BOOL)summaries usingCache:(BOOL)usingCache;  // Write an backup archive of the document.
// - (void) compact;  // Hides completed tasks and processes any inbox items that have the necessary information into projects and tasks.
// - (void) undo;  // Undo the last command.
// - (void) redo;  // Redo the last undone command.
// - (void) synchronize;  // Synchronizes with the shared OmniFocus sync database.
// - (void) addTo:(SBObject *)to;  // Add the given object(s) to the container.
// - (void) removeFrom:(SBObject *)from;  // Remove the given object(s) from the container.

//     of = Application('OmniFocus');
//     of_doc = of.defaultDocument;
//     of_qe = of.quickEntry;
//
// var ofc = {
//     dueDate: "dueDate"
// };
// var $of = {
//     run: function () {
//
//     },
//     over: function () {
//
//     },
//     just: function () {
//         arguments.forEach(function (o) {
//             o();
//         });
//     },
//
//     Task: function () {
//         this.name = "";
//         this.note = "";
//         this.context = "";
//         this.deferDate = "";
//
//     },
//     Project: function () {
//
//     },
//     timespan: function () {
//         var begin = this.begin;
//         var end = this.end;
//         var overrideToTime = this.overrideToTime;
//         var key = this.key || ofc.dueDate;
//         var tasks = arguments;
//
//         return function () {
//             var deltaT = (end - begin) / tasks.length;
//             return tasks.map(function (fTask, i) {
//                 return function () {
//                     var utcTime = begin + i * deltaT;
//                     var date = new Date(utcTime);
//                     if (!!overrideToTime) date.setHours(overrideToTime);
//                     var task = fTask();
//                     task[key] = date;
//                     return task;
//                 }
//             });
//         }
//     }
//
//
// };
//
//
// var sample = $of.save(
//     $of.inProject(
//         $of.insideFolder($of.newProject("my cool project")),
//         $of.overNext(
//             $of.timespan(3, "weeks"),
//             $of.n(7)("My Task: [", $of.nIdx(), "of", $of.nCount(), "]: xyz").map(function (name) {
//                 return new $of.Task({name: name})
//             })
//         )
//     )
// );
// var sample2 = $of.save(
//     $of.inProject(
//         $of.insideFolder($of.newProject("Read Textbook")),
//         $of.onceA(
//             $of.timespan(1, "day"),
//             $of.textbook(20, [7, 4, 3, 5, 3, 5, 7, 5, 4, 7, 3]) ("Read Section: ", $of.nIdx(), ".", $of.nSubIdx(), ": my Book").map(function (name) {
//                 return $of.taskLiteral({name: name})
//             })
//         )
//     )
// );
//

// ctxt = function (thing, name) {
//     return thing.contexts.whose({"name": name})[0]
// }
// project = function (thing, name) {
//     return thing.projects.whose({"name": name})[0]
// }
// folder = function (thing, name) {
//     return thing.folders.whose({"name": name})[0]
// }
// reduce = function (fn) {
//     return function (contexts) {
//         var [x, y ...xs] = contexts;
//         var val = fn(x, y);
//         return xs.length ? reduce(fn)([val, ...xs]) : val
//     };
// };
// ctxts = reduce(ctxt);
// folders = reduce(folder);
//
//
//
// ctxts([ofDoc, ...["At Computer", "Someday Maybe", "Low Energy"]]);
//
//
// //get email context
// email_context = of_doc.flattenedContexts.whose({name: 'email'})[0];
//
// ofDoc.contexts.whose({"name": "Work"})[0].contexts.whose({"name": "Low Energy"})[0].properties()
//
//
// //default defer to 9am tomorrow
// defer = new Date();
// defer.setDate(defer.getDate() + 1);
// defer.setHours(9);
// defer.setMinutes(0);
// defer.setSeconds(0);
//
// ofDoc = of.defaultDocument,
//     inbox = ofDoc.inboxTasks,
// task = of.InboxTask({
//     name: 'Trying Hard ' + title,
//     note: url + "\n",
//     context: ctxts([ofDoc, ...["At Computer", "Someday Maybe", "Low Energy"]]),
//     deferDate: defer
// });
//
// //create task in quick entry box
// of.quickEntry.inboxTasks.push(task);
// of.quickEntry.open();