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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	AsideCp = React.createClass({displayName: "AsideCp",
	  render: function() {
	    var singersData = ["初音ミク","鏡音リン","鏡音レン","巡音ルカ","KAITO","MEIKO","GUMI","IA","結月ゆかり","がくっぽいど","猫村いろは","UTAU"];
	    var songStyleData =["POP","ROCK","JAZZ","FUNK","R&B","抒情","经典","演歌","和风曲","民族调曲"];
	    var coverData = ["歌ってみた","Vocaloidカバー曲","UTAUカバー曲"];
	    function makeTags(tagDatas){
	        var tags = tagDatas.map(function(tag) {
	          return React.createElement("li", null, 
	                    React.createElement("a", {href: "#"}, 
	                        React.createElement("i", {className: "fa fa-angle-right text-xs"}), 
	                        React.createElement("span", null, tag)
	                    )
	                );
	        });
	        return tags;
	    }
	    
	    var singers = makeTags(singersData);
	    var songStyles = makeTags(songStyleData);
	    var covers = makeTags(coverData);
	    
	    return React.createElement("section", {className: "vbox"}, 
	            React.createElement("section", {className: "w-f-md scrollable"}, 
	              React.createElement("div", {className: "slim-scroll", "data-height": "auto", "data-disable-fade-out": "true", "data-distance": "0", "data-size": "10px", "data-railOpacity": "0.2"}, 
	                React.createElement("nav", {className: "nav-primary hidden-xs"}, 
	                  React.createElement("ul", {className: "nav bg clearfix"}, 
	                    React.createElement("li", {className: "hidden-nav-xs padder m-t m-b-sm text-xs text-muted"}, 
	                      "发现"
	                    ), 
	                    React.createElement("li", null, 
	                      React.createElement("a", {href: "./"}, 
	                        React.createElement("i", {className: "icon-disc icon text-success"}), 
	                        React.createElement("span", {className: "font-bold"}, "湿娘主页")
	                      )
	                    ), 
	                    React.createElement("li", null, 
	                      React.createElement("a", null, 
	                        React.createElement("i", {className: "icon-heart icon text-success"}), 
	                        React.createElement("span", {className: "font-bold"}, "帮助我们")
	                      )
	                    )
	                  ), 
	                  React.createElement("ul", {className: "nav", "data-ride": "collapse"}, 
	                    React.createElement("li", {className: "hidden-nav-xs padder m-t m-b-sm text-xs text-muted"}, 
	                      "分类索引"
	                    ), 
	                    React.createElement("li", null, 
	                      React.createElement("a", {href: "javascript:void(0);", className: "auto"}, 
	                        React.createElement("span", {className: "pull-right text-muted"}, 
	                          React.createElement("i", {className: "fa fa-angle-left text"}), 
	                          React.createElement("i", {className: "fa fa-angle-down text-active"})
	                        ), 
	                        React.createElement("i", {className: "icon-music-tone-alt icon text-info"}), 
	                        React.createElement("span", null, "歌手")
	                      ), 
	                      React.createElement("ul", {onClick: this.handleTagClick, className: "nav dk text-sm"}, singers)
	                    ), 
	                    React.createElement("li", null, 
	                      React.createElement("a", {href: "javascript:void(0);", className: "auto"}, 
	                        React.createElement("span", {className: "pull-right text-muted"}, 
	                          React.createElement("i", {className: "fa fa-angle-left text"}), 
	                          React.createElement("i", {className: "fa fa-angle-down text-active"})
	                        ), 
	                        React.createElement("i", {className: "icon-list icon  text-info-dker"}), 
	                        React.createElement("span", null, "曲风")
	                      ), 
	                      React.createElement("ul", {onClick: this.handleTagClick, className: "nav dk text-sm"}, songStyles)
	                    ), 
	                    React.createElement("li", null, 
	                      React.createElement("a", {href: "javascript:void(0);", className: "auto"}, 
	                        React.createElement("span", {className: "pull-right text-muted"}, 
	                          React.createElement("i", {className: "fa fa-angle-left text"}), 
	                          React.createElement("i", {className: "fa fa-angle-down text-active"})
	                        ), 
	                        React.createElement("i", {className: "fa fa-microphone icon  text-primary"}), 
	                        React.createElement("span", null, "翻唱")
	                      ), 
	                      React.createElement("ul", {onClick: this.handleTagClick, className: "nav dk text-sm"}, covers)
	                    )
	                  ), 
	                  React.createElement("ul", {className: "nav text-sm"}, 
	                    React.createElement("li", {className: "hidden-nav-xs padder m-t m-b-sm text-xs text-muted"}, 
	                        "播放列表"
	                    ), 
	                    React.createElement("li", null, 
	                      React.createElement("a", null, 
	                        React.createElement("i", {className: "icon-star icon text-warning-dker"}), 
	                        React.createElement("span", null, "个人收藏")
	                      )
	                    ), 
	                    React.createElement("li", null, 
	                      React.createElement("a", null, 
	                        React.createElement("i", {className: "icon-clock icon text-info"}), 
	                        React.createElement("span", null, "最近播放")
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          );
	  },
	  handleTagClick:function(event){
	     event.preventDefault();
	     var $target = $(event.target);
	     var $li = $($target.parents("li")[0]);
	     var tag = $li.text();
	     alert(tag);
	  }
	});

/***/ }
/******/ ]);