webpackJsonp([0],{314:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(1),i=r(o),u=n(263),a=n(319),l=r(a),c=n(289),s=n(322),f=r(s),d=n(321),p=r(d);if("serviceWorker"in navigator){var v=new p.default("./sw.js");v.on("update",function(e){console.log("updating"),e.postMessage({action:"skip"})}),v.on("installed",function(){console.log("installed")})}(0,u.render)(i.default.createElement(c.Provider,{store:f.default},l.default),document.getElementById("app"))},316:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;var u=function(){function e(e,t){for(var n=0;t.length>n;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(1),l=function(e){return e&&e.__esModule?e:{default:e}}(a);t.App=function(e){function t(e){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),u(t,[{key:"render",value:function(){return l.default.createElement("div",null,"madara and obito!")}}]),t}(a.Component)},317:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),i=r(o),u=n(109),a=n(801),l=r(a),c=n(792),s=r(c),f=n(790),d=r(f),p=n(817),v=r(p);t.default=(0,u.createDevTools)(i.default.createElement(s.default,{toggleVisibilityKey:"ctrl-h",changePositionKey:"ctrl-q",changeMonitorKey:"ctrl-m",defaultIsVisible:!0},i.default.createElement(l.default,{theme:"tomorrow"}),i.default.createElement(d.default,null),i.default.createElement(v.default,{keyboardEnabled:!0})))},318:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.reducers=void 0;var r=n(181);t.reducers=(0,r.combineReducers)({})},319:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var r=n(771),o=n(316),i=e.createElement(r.Router,{history:r.browserHistory},e.createElement(r.Route,{path:"/",component:o.App}));t.default=i}).call(t,n(1))},320:function(e,t,n){"use strict";function r(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log("hello saga");case 1:case"end":return e.stop()}},o[0],this)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var o=[r].map(regeneratorRuntime.mark)},321:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;t.length>n;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(538),l=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));n.script=e;var i=n.onSuccess.bind(n),u=n.onError.bind(n);return navigator.serviceWorker.register(e).then(function(e){return i(e)}).catch(function(e){return u(e)}),n}return i(t,e),u(t,[{key:"onSuccess",value:function(e){console.log(e.waiting),console.log(e.installing);var t=this;if(console.log("registed"),navigator.serviceWorker.controller){if(e.waiting)return void t.emit("update",e.waiting);if(e.installing){return void this.onTrack.bind(this,e.installing)()}e.addEventListener("updatefound",function(){console.log("update found"),t.onTrack(e.installing)}),e.addEventListener("controllerchange",function(){window.location.reload()})}}},{key:"onError",value:function(e){console.error(e)}},{key:"onTrack",value:function(e){var t=this;console.log("tracking"),e.addEventListener("statechange",function(){"installed"==e.state&&t.emit("installed",e)})}}]),t}(l.default)},322:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(181),i=n(317),u=(r(i),n(318)),a=n(809),l=(r(a),n(811)),c=r(l),s=n(320),f=r(s),d=void 0,p=(0,c.default)(),v=(0,o.applyMiddleware)(p);d=(0,o.compose)(v);var b=(0,o.createStore)(u.reducers,{},d);p.run(f.default),t.default=b},826:function(e,t,n){n(315),e.exports=n(314)}},[826]);
//# sourceMappingURL=bundle.js.map