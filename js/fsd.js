'use strict';

/* Filters */

angular.module('boilerplate.filters', []).
    filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]);

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('boilerplate.services', []).
    value('version', '0.1');

/* Directives */

angular.module('boilerplate.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]).
    directive('pleaseConfirm', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function(event) {
                    if(!confirm('Are you sure?')){
                        event.preventDefault();
                        event.stopImmediatePropagation();
                    }
                });
            }
        }
    });
/* Factories */
angular.module('boilerplate.factories', []);