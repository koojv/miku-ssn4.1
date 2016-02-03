/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);


/***/ },

/***/ 9:
/***/ function(module, exports) {

	HeaderCp = React.createClass({displayName: "HeaderCp",
	    render:function(){
	        return React.createElement("div", null, 
	     React.createElement("div", {className: "navbar-header aside bg-info dk nav-xs"}, 
	        React.createElement("a", {className: "btn btn-link visible-xs", "data-toggle": "class:nav-off-screen,open", "data-target": "#nav,html"}, 
	          React.createElement("i", {className: "icon-list"})
	        ), 
	        React.createElement("a", {href: "./", className: "navbar-brand text-lt"}, 
	          React.createElement("i", {className: "icon-earphones"}), 
	          React.createElement("span", {className: "hidden-nav-xs m-l-sm"}, "shi-shi.net")
	        ), 
	        React.createElement("a", {className: "btn btn-link visible-xs", "data-toggle": "dropdown", "data-target": ".user"}, 
	          React.createElement("i", {className: "icon-settings"})
	        )
	      ), 
	      React.createElement("ul", {className: "nav navbar-nav hidden-xs"}, 
	        React.createElement("li", null, 
	          React.createElement("a", {href: "#nav,.navbar-header", "data-toggle": "class:nav-xs,nav-xs", className: "text-muted"}, 
	            React.createElement("i", {className: "fa fa-indent text"}), 
	            React.createElement("i", {className: "fa fa-dedent text-active"})
	          )
	        )
	      ), 
	      React.createElement("form", {className: "navbar-form navbar-left input-s-lg m-t m-l-n-xs hidden-xs", role: "search"}, 
	        React.createElement("div", {className: "form-group"}, 
	          React.createElement("div", {className: "input-group"}, 
	            React.createElement("span", {className: "input-group-btn"}, 
	              React.createElement("button", {type: "submit", className: "btn btn-sm bg-white btn-icon rounded"}, React.createElement("i", {className: "fa fa-search"}))
	            ), 
	            React.createElement("input", {type: "text", className: "form-control input-sm no-border rounded", placeholder: "Search songs, albums..."})
	          )
	        )
	      ), 
	      React.createElement("div", {className: "navbar-right "}, 
	        React.createElement("ul", {className: "nav navbar-nav m-n hidden-xs nav-user user"}, 
	          React.createElement("li", {className: "dropdown"}, 
	            React.createElement("a", {href: "#", className: "dropdown-toggle bg clear", "data-toggle": "dropdown"}, 
	              "MIKUScallion", React.createElement("b", {className: "caret"})
	            ), 
	            React.createElement("ul", {className: "dropdown-menu animated fadeInRight"}, 
	              React.createElement("li", null, 
	                React.createElement("span", {className: "arrow top"}), 
	                React.createElement("a", {href: "#"}, "个人中心")
	              ), 
	              React.createElement("li", {className: "divider"}), 
	              React.createElement("li", null, 
	                React.createElement("a", {href: "#"}, "退出")
	              )
	            )
	          )
	        )
	      )
	     );
	    }
	});

/***/ }

/******/ });