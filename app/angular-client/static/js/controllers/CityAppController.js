/**
 * Created by pratikdhage on 12/15/17.
 */

"use strict";

// added CityService as module dependency
var CityApp = angular.module("CityApp", ["CityService", "WebGLService", "BrowserTypeService"]);

CityApp.config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
}]);


//Injected factory service 'CityFactoryAPI'
CityApp.controller("CityAppController", function ($scope, $http, CityFactoryAPI, WebGLService, BrowserTypeService) {

    $scope.title = "this is just a starting !";
    console.info("WebGLService", WebGLService);
    var app = this;

    // display all data
    var refreshData = function () {

        CityFactoryAPI.refreshCityStateService()
            .then(function (response) {

                app.citytable = response.data.output;

                console.log(response.data);
                console.log(response.data.output);

            }, function (error) {
                console.log('can not get the data.' + error.message);
            }
            );

    };

    refreshData();

    // adds a new record
    app.addCityState = function (cityrecord) {
        if (cityrecord.cname !== '' || cityrecord.state !== '') {
            cityrecord = app.applyUserAgent(cityrecord); // Add Navigator User Agent
            CityFactoryAPI.addCityStateService(cityrecord)
                .then(function (response) {

                    app.citytable.push(response.data.output);
                    refreshData();
                    $scope.cityrecord = {};

                }, function (error) {
                    console.log('can not post the cityrecord data.' + error.message);
                }
                );
        }
    };

    // deletes a given record
    app.deleteCityState = function (cityrecord) {

        CityFactoryAPI.deleteCityStateService(cityrecord)
            .then(function (response) {

                $scope.cityrecord = response.data.output;
                refreshData();
                $scope.cityrecord = {};

            }, function (error) {
                console.log('can not delete the given cityrecord data.' + error.message);
            }
            );
    };

    // edit functionality for the state for a given cityrecord
    app.editState = function (cityrecord) {

        if (cityrecord.cname !== '' || cityrecord.state !== '') {
            cityrecord = app.applyUserAgent(cityrecord);
            CityFactoryAPI.editCityStateService(cityrecord)
                .then(function (response) {

                    $scope.cityrecord = response.data.output;
                    refreshData();

                }, function (error) {
                    console.log('can not edit the cityrecord data.' + error.message);
                }
                );
        }

    };

    // updates the state for a given cityrecord
    app.updateState = function (cityrecord) {

        if (cityrecord.cname !== '' || cityrecord.state !== '') {

            CityFactoryAPI.updateCityStateService(cityrecord)
                .then(function (response) {

                    app.citytable.push(response.data.output);
                    refreshData();
                    $scope.cityrecord = {};

                }, function (error) {
                    console.log('can not update the given cityrecord data.' + error.message);
                }
                );
        }

    };

    app.applyUserAgent = function (cityrecord) {
        cityrecord.userAgent = navigator.userAgent;
        return cityrecord;
    }

    $scope.webGLEnabled = WebGLService.isWebGLEnabled();

});

CityApp.directive("userAgent", function (BrowserTypeService) {
    return {
        restrict: 'EA',
        template: "<b>{{ua}}</b>",
        replace: true,
        scope: {
            cityrecord: '=',
            ua: "@"
        },
        link: function (scope) {
            scope.ua = BrowserTypeService.getBrowserType(scope.cityrecord.userAgent);
        }
    }
});

CityApp.directive("zip", function (BrowserTypeService) {
    return {
        restrict: 'EA',
        template: "<b>{{zip}}</b>",
        replace: true,
        scope: {
            cityrecord: '=',
            zip: "@"
        },
        link: function (scope) {
            scope.zip = scope.cityrecord.zip || "N/A"
            // if you want to overwrite the actual object... 
            // scope.cityrecord.zip = scope.cityrecord.zip || "N/A" 
            // but since we do not write records to the api.. do we need to modify the object? 
        }
    }
});