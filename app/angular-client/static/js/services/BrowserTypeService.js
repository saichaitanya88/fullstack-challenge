"use strict";

var BrowserTypeService = angular.module('BrowserTypeService', []);

BrowserTypeService.factory('BrowserTypeService', [function () {

  var BrowserTypeServiceAPI = {};

  BrowserTypeServiceAPI.getBrowserType = function (ua) {
    if (!ua) {
      return "N/A";
    }
    let userAgent = ua.toLowerCase();
    if (userAgent.includes("firefox") && !userAgent.includes("seamonkey")) {
      return "Firefox";
    }
    else if (userAgent.includes("seamonkey")) {
      return "Seamonkey";
    }
    else if (userAgent.includes("chrome")) {
      return "Chrome";
    }
    else if (userAgent.includes("chromium")) {
      return "Chromium";
    }
    else if (userAgent.includes("safari")) {
      return "Safari";
    }
    else if (userAgent.includes("opr") || userAgent.includes("opera")) {
      return "Opera";
    }
    else if (userAgent.includes(";msie")) {
      return "IE";
    }
    else {
      return "Other"
    }
  };

  return BrowserTypeServiceAPI;

}]);