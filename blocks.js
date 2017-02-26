//!/usr/bin/env osascript -l JavaScript


var array = NSMutableArray.alloc().init();
array.addObject(1);
array.addObject(3);
array.addObject(5);

array.enumerateObjectsUsingBlock(function(item, index, boolRef) {
    console.log("Item: " + item + ", index:", index);
});