import 'es6-shim'
import 'babel-polyfill'
import 'reflect-metadata'
import 'zone.js/dist/zone'
import 'zone.js/dist/long-stack-trace-zone'
import 'zone.js/dist/async-test'
import 'zone.js/dist/fake-async-test'
import 'zone.js/dist/sync-test'
import 'zone.js/dist/proxy'
import 'zone.js/dist/mocha-patch'

import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'
import { TestBed } from '@angular/core/testing'

TestBed.resetTestEnvironment();
TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

//This is webpack code, basically it performs a dynamic require (import) for
//every test file in the current directory (and subdirectories). This is done
//to force webpack to transpile everything
const req = require.context('.', true, /\.test\.js$/);
req.keys().forEach(key => req(key));