#!/usr/bin/env osascript -l JavaScript

//refer to https://github.com/dtinth/JXA-Cookbook


//ObjC.import('stdlib/');
//ObjC.import('AppKit');

//get application:
//var app = Application.currentApplication();
//app.includeStandardAdditions = true;




var isRunning = false;
var apps = $.NSWorkspace.sharedWorkspace.runningApplications; // Note these never take () unless they have arguments
apps = ObjC.unwrap(apps); // Unwrap the NSArray instance to a normal JS array
var app, itunesApp;
for (var i = 0, j = apps.length; i < j; i++) {
    app = apps[i];

    // Another option for comparison is to unwrap app.bundleIdentifier
    // ObjC.unwrap(app.bundleIdentifier) === 'org.whatever.Name'

    // Some applications do not have a bundleIdentifier as an NSString
    if (typeof app.bundleIdentifier.isEqualToString === 'undefined') {
        continue;
    }

    if (app.bundleIdentifier.isEqualToString('com.apple.iTunes')) {
        isRunning = true;
        break;
    }
}

if (!isRunning) {
    $.exit(1)
}

var itunesApp = Application('iTunes');

//var app = Application.currentApplication()
//app.includeStandardAdditions = true

itunesApp.activate()

var se = Application('System Events')
var proc = se.processes.byName('iTunes')

// Use the windows() properties to get the main window; most apps only have one
var win = proc.windows[0]
// Use the .byName() method to get the exact button by text value (this is not compatible with non-English environments)
var button = win.buttons.byName("Check for Updates")
// Click the button
button.click()


var itunesApp = Application('iTunes')
itunesApp.activate()

var se = Application('System Events')
var proc = se.processes.byName('iTunes')
var fileMenu = proc.menuBars[0].menuBarItems.byName('File')
var devicesMenu = fileMenu.menus[0].menuItems.byName('Devices')
var items = devicesMenu.menus[0].menuItems()

// The menu item name here is dynamic, so using byName() will not work
// The menu item will only be enabled if a *single* device is plugged in and it is not busy
for (var i = 0, j < items.length; i < j; i++) {
    if (items[i].enabled() && /^Sync /.test(items[i].title())) {
        items[i].click()
    }
}


