#!/usr/bin/env node
var path  = require('path')
var shell = require('shelljs')

shell.exec(`ts-node ${ path.join(__dirname, '../lib/index.ts') } --colors`)