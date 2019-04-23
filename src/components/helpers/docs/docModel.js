import { getGlobal } from 'reactn';
import { getMonthDayYear } from '../shared/getMonthDayYear';
const uuid = require('uuidv4');

export function Document() {
    this.id = uuid();
    this.title = "Untitled";
    this.content = getGlobal().content;
    this.lastUpdate = Date.now();
    this.updated = getMonthDayYear();
  }