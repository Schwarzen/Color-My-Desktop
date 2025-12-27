Blamer
======

Blamer is a tool for get information about author of code from version control system. Supports git and subversion.

Status
------
[![NPM version](https://badge.fury.io/js/blamer.svg)](http://badge.fury.io/js/blamer)
[![Build Status](https://travis-ci.org/kucherenko/blamer.svg?branch=master)](https://travis-ci.org/kucherenko/blamer)
[![codecov](https://codecov.io/gh/kucherenko/blamer/branch/master/graph/badge.svg)](https://codecov.io/gh/kucherenko/blamer)
[![Code Climate](https://codeclimate.com/github/kucherenko/blamer/badges/gpa.svg)](https://codeclimate.com/github/kucherenko/blamer)


[![NPM](https://nodei.co/npm/blamer.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/blamer/)

Setup
-----

    npm install blamer

Usage
-----

```typescript

import Blamer from 'blamer';

// first parameter in Blamer is type of VCS, can be 'svn' or 'git', 'git' used by default
const blamer = new Blamer('git');

( async () => {
    const result = await blamer.blameByFile('/path/to/file/in/repo');
    console.log("Blame json: %j", result);
    //        will print
    //        Blame json: {"/path/to/file/in/repo": {
    //            "1": {
    //                "rev": "rev",
    //                "author": "author",
    //                "date": "2014-10-15T12:33:31.675393Z",
    //                "line": "1"
    //             }
    //        }
    //   }
})

```

License
-------

[The MIT License](https://github.com/kucherenko/blamer/blob/master/LICENSE)
