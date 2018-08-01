"use strict";

var WebGLService = angular.module('WebGLService', []);

WebGLService.factory('WebGLService', [function () {

  var WebGLServiceAPI = {};

  WebGLServiceAPI.isWebGLEnabled = function () {
    var canvas = document.createElement("canvas");
    var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gl && gl instanceof WebGLRenderingContext) {
      return true;
    }
    else {
      return false;
    }
  };

  return WebGLServiceAPI;

}]);