"use strict";

var browserSync = require("../../../index");

var assert      = require("chai").assert;
var sinon       = require("sinon");
var stripColor  = require("chalk").stripColor;
var logger      = require("../../../lib/logger").logger;

describe("E2E `logPrefix` option", function () {

    var instance;
    var spy;

    before(function (done) {
        var config = {
            open: false,
            logPrefix: "BS2",
            logLevel:  "info"
        };
        logger.mute(false);
        spy      = sinon.spy(console, "log");
        instance = browserSync(config, done);
    });

    after(function () {
        instance.cleanup();
        console.log.restore();
    });

    it("Can set the log prefix when given in options", function () {
        var arg = spy.getCall(0).args[0];
        assert.include(stripColor(arg), "[BS2]");
        assert.notInclude(stripColor(arg), "[BS]");
    });
});