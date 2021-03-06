/**
 *
 * The MIT License (MIT)
 *
 * Flowchain Open Source Project
 * 
 * Copyright (c) 2016-present, Jollen. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

'use strict';

/**
 * WoT.City Framework
 */
var wotcity = require('wotcity.io');

var ntpClient = require('ntp-client');

exports.getComponent = function() {
  var component = new wotcity.Component;

  component.name = "io.devify.ntp";
  component.description = "This component add the timestamp from NTP server.";

  // Register ports and event handlers
  component.inPorts.add('in', function(event, payload) {
    switch (event) {
      case 'data':
        // Data received
        ntpClient.getNetworkTime("pool.ntp.org", 123, function(err, timestamp) {
            if(err) {
                payload.timestamp = timestamp;
                component.outPorts.out.send(payload);
            }
        });
        return 0;
      case 'disconnect':
        // Input port disconnects
        return 0;
    }
  });

  component.outPorts.add('out');

  // Return process (the instance of component)
  return component;
};