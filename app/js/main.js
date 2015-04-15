(function () {
    'use strict';
    angular.module('angular-interactive-map-indonesia', ['ngRoute', 'ngAnimate'])

    .config([
        '$locationProvider',
        '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            // routes
            $routeProvider
                .when("/", {
                templateUrl: "./partials/map.html",
                controller: "MainController"
            })
            .otherwise({
                redirectTo: '/'
            });
        }
    ]);

    angular.module('angular-interactive-map-indonesia').controller('MainController', ['$scope',function($scope) {

        $scope.test = "Testing...";
        var states = ['ID-AC', 'ID-BA', 'ID-BB', 'ID-BE', 'ID-BT', 'ID-GO', 'ID-JA', 'ID-JB', 'ID-JI', 'ID-JK', 'ID-JT', 'ID-KB', 'ID-KI', 'ID-KR', 'ID-KS', 'ID-KT', 'ID-KU', 'ID-LA', 'ID-MA', 'ID-MU', 'ID-NB', 'ID-NT', 'ID-PA', 'ID-PB', 'ID-RI', 'ID-SA', 'ID-SB', 'ID-SG', 'ID-SN', 'ID-SR', 'ID-SS', 'ID-ST', 'ID-SU', 'ID-YO'];
        $scope.createDummyData = function () {
            var dataTemp = {};
            angular.forEach(states, function (state, key) {
                dataTemp[state] = {value: Math.random()}
            });
            $scope.dummyData = dataTemp;
        };
        $scope.createDummyData();

        $scope.changeHoverRegion = function (region) {
            $scope.hoverRegion = region;
        };

    }]);

    angular.module('angular-interactive-map-indonesia').directive('svgMap', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            templateUrl: '/images/map-indonesia.svg',
            link: function (scope, element, attrs) {
                var regions = element[0].querySelectorAll('.land');
                angular.forEach(regions, function (path, key) {
                    var regionElement = angular.element(path);
                    regionElement.attr("region", "");
                    regionElement.attr("dummy-data", "dummyData");
                    regionElement.attr("hover-region", "hoverRegion");
                    $compile(regionElement)(scope);
                })
            }
        }
    }]);

    angular.module('angular-interactive-map-indonesia').directive('region', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            scope: {
                dummyData: "=",
                hoverRegion: "="
            },
            link: function (scope, element, attrs) {
                scope.elementId = element.attr("id");
                scope.regionClick = function () {
                    alert(scope.dummyData[scope.elementId].value);
                };
                scope.regionMouseOver = function () {
                    scope.hoverRegion = scope.elementId;
                    element[0].parentNode.appendChild(element[0]);
                };
                element.attr("ng-attr-fill", "{{dummyData[elementId].value | map_colour}}");
                element.attr("ng-mouseover", "regionMouseOver()");
                element.attr("ng-class", "{active:hoverRegion==elementId}");
                element.removeAttr("region");
                $compile(element)(scope);
            }
        }
    }]);

    angular.module('angular-interactive-map-indonesia').filter('map_colour', [function () {
        return function (input) {
            var b = 255 - Math.floor(input * 255);
            var g = Math.floor(input * 255);
            return "rgba(255," + g + "," + b + ",1)";
        }
    }]);

}());
