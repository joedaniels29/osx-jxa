//!/usr/bin/env osascript -l JavaScript
var require=function(path){var fm=$.NSFileManager.defaultManager;path=path.toString();path=path.endsWith(".js")?path:path+".js";var contents=fm.contentsAtPath(path);contents=$.NSString.alloc.initWithDataEncoding(contents,$.NSUTF8StringEncoding);var module={exports:{}};var exports=module.exports;eval(ObjC.unwrap(contents));return module.exports};function requireLibrary(name){var ppath="/Users/Joe/Library/Script Libraries/";console.log("ppath");return require(ppath+name)}
function requireStdio(){return Object.assign(requireLibrary("stdio"))};
debugger;


//
// ObjC.import('Cocoa')
// $.NSBeep()
// //If the ObjC method does take arguments, then you invoke it by calling the JavaScript method (function-typed property) named according to the JSExport convention; the letter following each ":" is capitalized, and then the ":"s are removed. This example instantiates an NSString from a JavaScript string and writes it to a file.
//
//
// str = $.NSString.alloc.initWithUTF8String('foo')
// str.writeToFileAtomically('/tmp/foo', true)
//
// $.NSNumber.numberWithInt(99).intValue
//
// task = $.NSTask.alloc.init
// task.running == task.isRunning
//
//
// //constants
// $.NSNotFound
// $.NSFileReadNoSuchFileError
// $.NSZeroRect
// //functions
// $.NSBeep()
// $.NSMakeSize(33, 55)
// nil = $()
//
//
// ObjC.import('stdlib')
// $.exit(123)