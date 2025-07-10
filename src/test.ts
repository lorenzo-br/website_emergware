import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import 'zone.js';

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
);