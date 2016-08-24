#!/usr/bin/env osascript -l JavaScript

app.displayAlert('wow');
//    => {"buttonReturned":"OK"}

app.displayAlert('wow', { message: 'I like JavaScript' })
//    => {"buttonReturned":"OK"}

app.displayDialog('What is your name?', { defaultAnswer: "" })
//    => {"buttonReturned":"OK", "textReturned":"Text you entered"}
// OR !! Error on line 1: Error: User canceled.

app.displayDialog('How old are you?')
//    => {"buttonReturned":"OK"}
// OR !! Error on line 1: Error: User canceled.

app.chooseFromList(['red', 'green', 'blue'], { withPrompt: 'What is your favorite color?' })

app.chooseFromList(['red', 'green', 'blue'],
    { withPrompt: 'What is your favorite color?',
        multipleSelectionsAllowed: true })


app.displayNotification('The file has been converted',
    { withTitle: 'Success', subtitle: 'Done' })


app.chooseFile()
app.chooseFile({ withPrompt: 'Please select the first image' })
//    => Path("/Users/dtinth/npm-debug.log")
// OR !! Error on line 1: Error: User canceled.

app.chooseFile({ withPrompt: 'Select the first image', ofType: ['public.jpeg', 'public.png'] })

app.chooseFileName()
//    => Path("/Users/dtinth/untitled")

app.chooseFolder()
//    => Path("/Users/dtinth/Screenshots")


app.doShellScript('false')
//    !! Error on line 1: Error: The command exited with a non-zero status.

app.doShellScript('asdf; true')
//