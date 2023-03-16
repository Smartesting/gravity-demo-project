// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
beforeEach(function() {
  this.commands = [];
  this.gravityEvents = [];

  let currentCmd = null

  cy.once("window:before:load", (win) => {
    win.addEventListener("message", (ev) => {
      if (ev.data && ev.data.type === "gravity:sessionevent") {
        this.gravityEvents.push(ev.data.events[0]);
      }
    });
  });

  cy.on("command:start", (command) => {
    currentCmd = {
      cmd: null,
      startingDate: null,
      endDate: null,
      gravityEvents: []
    };
    currentCmd.cmd = command
    currentCmd.startingDate = Date.now();
  });

  cy.on("command:end", () => {
    currentCmd.endDate = Date.now();
    this.commands.push(currentCmd);
    currentCmd = {
      cmd: null,
      startingDate: null,
      endDate: null,
      gravityEvents: []
    };
  });
})

afterEach(function() {
  console.log("Collected gravity evts:", this.gravityEvents);

  while(this.gravityEvents.length > 0) {
    const gEvt = this.gravityEvents.shift();
    const evtTs = new Date(gEvt['recordedAt']).getTime();
    console.log(evtTs);
    this.commands.forEach((cmd) => {
      if (evtTs >= cmd.startingDate && evtTs <= cmd.endDate) {
        cmd.gravityEvents.push(gEvt);
      }
    });
  }

  console.log("Collected commands:", this.commands);
})
