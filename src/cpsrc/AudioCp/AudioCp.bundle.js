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
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	AudioCp = React.createClass({displayName: "AudioCp",
	   getInitialState:function(){
	       return {playstate:"listloop",playmodel:"audio"};
	   },
	   componentDidMount:function(){
	      var backMyPlaylist = localStorage.getItem("myPlaylist");
	      //backMyPlaylist = null;
	      if(backMyPlaylist){
	         backMyPlaylist = JSON.parse(backMyPlaylist);
	      }else{
	         backMyPlaylist = {};
	         backMyPlaylist.original = [];
	         backMyPlaylist.current = 0;
	      }
	      var myPlaylist = new jPlayerPlaylist({
	        jPlayer: "#jplayer_N",
	        cssSelectorAncestor: "#jp_container_N"
	      }, backMyPlaylist.original, {
	        playlistOptions: {
	          enableRemoveControls: true,
	          autoPlay: true
	        },
	        //不支持非H5浏览器
	        //swfPath: "js/jPlayer",
	        supplied: "mp3,m4v",
	        smoothPlayBar: true,
	        keyEnabled: true,
	        audioFullScreen: false
	      });
	      myPlaylist.play(backMyPlaylist.current);
	      //this.state = {};
	      this.state.myPlaylist = myPlaylist;
	    
	      $(document).on($.jPlayer.event.pause, myPlaylist.cssSelector.jPlayer,  function(){
	        $('.musicbar').removeClass('animate');
	        $('.jp-play-me').removeClass('active');
	        $('.jp-play-me').parent('li').removeClass('active');
	      });

	      $(document).on($.jPlayer.event.play, myPlaylist.cssSelector.jPlayer,  function(){
	        $('.musicbar').addClass('animate');
	      });

	      $(document).on('click', '.jp-play-me', function(e){
	        console.log("xxxx");
	        e && e.preventDefault();
	        var $this = $(e.target);
	        if (!$this.is('a')) $this = $this.closest('a');

	        $('.jp-play-me').not($this).removeClass('active');
	        $('.jp-play-me').parent('li').not($this.parent('li')).removeClass('active');

	        $this.toggleClass('active');
	        $this.parent('li').toggleClass('active');
	        if( !$this.hasClass('active') ){
	          myPlaylist.pause();
	        }else{
	          var i = Math.floor(Math.random() * (1 + 7 - 1));
	          myPlaylist.play(i);
	        }

	      });
	      //默认列表循环
	      $(".jp-repeat").click();
	      //注册一个全局事件（）
	      var self = this;
	      EventEmitter.subscribe("playSong", function(data) {
	          //console.log(data);
	          self._addToMyPlaylist(myPlaylist,data.title,data.author,data.cover,data.file,true);
	          EventEmitter.dispatch("sp");
	      });
	      //全局事件，本地保存播放列表(在jplayer.playlist.min里有多处调用，注意)
	      EventEmitter.subscribe("sp",function(){
	        //console.log("update playlist",self.state.myPlaylist);
	        localStorage.setItem("myPlaylist",JSON.stringify(self.state.myPlaylist));
	        self.setState({playmodel:"audio"});
	      });
	   },
	   render:function(){
	        var playstateClass = this.state.playstate;
	        var playmodelClass = this.state.playmodel;
	        //console.log(playstateClass);
	        //console.log(playmodelClass);
	        return React.createElement("div", {id: "jp_container_N"}, 
	                React.createElement("div", {className: playmodelClass+" jp-type-playlist"}, 
	                    React.createElement("div", {className: "myjpview"}, 
	                        React.createElement("div", {id: "jplayer_N", className: "jp-jplayer"})
	                    ), 
	                    React.createElement("div", {className: "jp-gui"}, 
	                        React.createElement("div", {className: "jp-video-play hide"}, 
	                          React.createElement("a", {className: "jp-video-play-icon"}, "play")
	                        ), 
	                        React.createElement("div", {className: "jp-interface"}, 
	                          React.createElement("div", {className: "jp-controls"}, 
	                            React.createElement("div", null, React.createElement("a", {className: "jp-previous"}, React.createElement("i", {className: "icon-control-rewind i-lg"}))), 
	                            React.createElement("div", null, 
	                              React.createElement("a", {className: "jp-play"}, React.createElement("i", {className: "icon-control-play i-2x"})), 
	                              React.createElement("a", {className: "jp-pause hid"}, React.createElement("i", {className: "icon-control-pause i-2x"}))
	                            ), 
	                            React.createElement("div", null, React.createElement("a", {className: "jp-next"}, React.createElement("i", {className: "icon-control-forward i-lg"}))), 
	                            React.createElement("div", {className: "hide"}, React.createElement("a", {className: "jp-stop"}, React.createElement("i", {className: "fa fa-stop"}))), 
	                            React.createElement("div", null, React.createElement("a", {className: "", "data-toggle": "dropdown", "data-target": "#playlist"}, React.createElement("i", {className: "icon-list"}))), 
	                            React.createElement("div", {className: "jp-progress hidden-xs"}, 
	                              React.createElement("div", {className: "jp-seek-bar dk"}, 
	                                React.createElement("div", {className: "jp-play-bar bg-info"}
	                                ), 
	                                React.createElement("div", {className: "jp-title text-lt"}, 
	                                  React.createElement("ul", null, 
	                                    React.createElement("li", null)
	                                  )
	                                )
	                              )
	                            ), 
	                            React.createElement("div", {className: "hidden-xs hidden-sm jp-current-time text-xs text-muted"}), 
	                            React.createElement("div", {className: "hidden-xs hidden-sm jp-duration text-xs text-muted"}), 
	                            React.createElement("div", {className: "hidden-xs hidden-sm"}, 
	                              React.createElement("a", {className: "jp-mute", title: "mute"}, React.createElement("i", {className: "icon-volume-2"})), 
	                              React.createElement("a", {className: "jp-unmute hid", title: "unmute"}, React.createElement("i", {className: "icon-volume-off"}))
	                            ), 
	                            React.createElement("div", {className: "hidden-xs hidden-sm jp-volume"}, 
	                              React.createElement("div", {className: "jp-volume-bar dk"}, 
	                                React.createElement("div", {className: "jp-volume-bar-value lter"})
	                              )
	                            ), 
	                            React.createElement("div", {className: "myjptoogles", onClick: this.handleMyjptoogles}, 
	                                React.createElement("div", {className: playstateClass}, 
	                                React.createElement("a", {className: "myjp-listloop", title: "list loop"}, React.createElement("i", {className: "icon-loop text-lt"})), 
	                                    
	                                React.createElement("a", {className: "myjp-listshuffle", title: "list shuffle"}, React.createElement("i", {className: "icon-shuffle text-lt"})), 
	                                React.createElement("a", {className: "myjp-singleloop", title: "single loop"}, React.createElement("i", {className: "icon-refresh text-lt"}))
	                                )
	                            ), 
	                            React.createElement("div", {className: "hide"}, 
	                              React.createElement("a", {className: "jp-shuffle", title: "shuffle"}, React.createElement("i", {className: "icon-shuffle text-muted"})), 
	                              React.createElement("a", {className: "jp-shuffle-off hid", title: "shuffle off"}, React.createElement("i", {className: "icon-shuffle text-lt"}))
	                            ), 
	                            React.createElement("div", {className: "hide"}, 
	                              React.createElement("a", {className: "jp-repeat", title: "repeat"}, React.createElement("i", {className: "icon-loop text-muted"})), 
	                              React.createElement("a", {className: "jp-repeat-off hid", title: "repeat off"}, React.createElement("i", {className: "icon-loop text-lt"}))
	                            ), 
	                            React.createElement("div", null, 
	                              React.createElement("a", {onClick: this.handlePv, className: "jp-pv", title: "view pv"}, React.createElement("i", {className: "fa fa-video-camera"}))
	                            ), 
	                            React.createElement("div", {className: "myjpfullscreen"}, 
	                              React.createElement("a", {className: "jp-full-screen", title: "full screen"}, React.createElement("i", {className: "fa fa-expand"})), 
	                              React.createElement("a", {className: "jp-restore-screen", title: "restore screen"}, React.createElement("i", {className: "fa fa-compress text-lt"}))
	                            )
	                          )
	                        )
	                      ), 
	                    React.createElement("div", {className: "jp-playlist dropup", id: "playlist"}, 
	                        React.createElement("ul", {className: "dropdown-menu aside-xl dker"}, 
	                          React.createElement("li", {className: "list-group-item"})
	                        )
	                      ), 
	                    React.createElement("div", {className: "jp-no-solution hide"}, 
	                        React.createElement("span", null, "Update Required"), 
	                        "To play the media you will need to either update your browser to a recent version or update your ", React.createElement("a", {href: "http://get.adobe.com/flashplayer/", target: "_blank"}, "Flash plugin"), "."
	                      )
	                )
	              );
	    },
	   //
	   _addToMyPlaylist:function(myPlaylist,title,author,cover,href,isplay){
	      var mp3 = href;
	      var m4v = href.replace("mp3","mp4");
	      //播放列表打开
	      //$("#playlist").addClass("open");
	      //当前播放列表去重复
	      for(i in myPlaylist.playlist){
	          var item = myPlaylist.playlist[i];
	          //找到重复
	          if(item.mp3 == href || item.title == title){
	              //播放列表中已经存在的这首歌
	              if(isplay){
	                 //注意for in 语法的key是字符串
	                 //会影响jplist
	                 myPlaylist.play(parseInt(i));
	                 return true;
	              }else{
	                return false;
	              }
	          }
	      }
	      //向jplayer播放列表中添加新歌曲
	      //优化，需要每次添加到最开始而不是最后
	      myPlaylist.add({
	            title:title,
	            artist:author,
	            poster:cover,
	            _mp3:mp3,
	            _m4v:m4v,
	            mp3:mp3,
	            m4v:null
	      });
	      if(isplay){
	        myPlaylist.play($("#jp-playlist ul").length-1);
	      }
	    return true;
	   },
	   handleMyjptoogles:function(event){
	       var $target = $(event.target);
	       var $myjptoogles = $target.parents("div.myjptoogles");
	       if($target.hasClass("myjp-listloop")||$target.parent().hasClass("myjp-listloop")){
	           this.setState({"playstate":"singleloop"});
	           $("#jp_audio_0").attr("loop","true");
	       }
	       if($target.hasClass("myjp-singleloop")||$target.parent().hasClass("myjp-singleloop")){
	           this.setState({"playstate":"listshuffle"});
	           $("#jp_audio_0").removeAttr("loop");
	           $(".jp-shuffle").click();
	       }
	       if($target.hasClass("myjp-listshuffle")||$target.parent().hasClass("myjp-listshuffle")){
	           this.setState({"playstate":"listloop"});
	           $(".jp-shuffle-off").click();
	       }
	   },
	   handlePv:function(event){
	       var myPlaylist = this.state.myPlaylist;
	       var playlist = myPlaylist.playlist;
	       var current = myPlaylist.current;
	       var temp = playlist[current];
	       if(!temp){
	           return false;
	       }
	       if($("body").width()<767){
	           window.location.href = temp._m4v;
	           return;
	       }
	       if(temp.mp3 == null){
	            temp.mp3 = temp._mp3;
	            temp.m4v = null;
	        }else if(temp.m4v == null){
	            temp.mp3 = null;
	            temp.m4v = temp._m4v;
	        }
	       if(this.state.playmodel == "audio"){  
	         this.setState({playmodel:"pv"});
	       }else{
	         this.setState({playmodel:"audio"}); 
	       }
	       myPlaylist.setPlaylist(playlist);
	       myPlaylist.play(current);
	       var h = $("#bjax-target").height();
	       if(h>document.documentElement.clientHeight){
	           h = document.documentElement.clientHeight - 50 -60;
	       }
	       $(".myjpview").height(h);
	       //console.log(h);
	   }
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "@media (max-width: 767px) {\n  #audioDiv {\n    position: fixed;\n    width: 100%;\n    z-index: 999;\n    bottom: 0px; } }\n\n#audioDiv .myjptoogles .listloop .myjp-listloop {\n  display: inline-block; }\n\n#audioDiv .myjptoogles .listloop .myjp-listshuffle {\n  display: none; }\n\n#audioDiv .myjptoogles .listloop .myjp-singleloop {\n  display: none; }\n\n#audioDiv .myjptoogles .singleloop .myjp-listloop {\n  display: none; }\n\n#audioDiv .myjptoogles .singleloop .myjp-listshuffle {\n  display: none; }\n\n#audioDiv .myjptoogles .singleloop .myjp-singleloop {\n  display: inline-block; }\n\n#audioDiv .myjptoogles .listshuffle .myjp-listloop {\n  display: none; }\n\n#audioDiv .myjptoogles .listshuffle .myjp-listshuffle {\n  display: inline-block; }\n\n#audioDiv .myjptoogles .listshuffle .myjp-singleloop {\n  display: none; }\n\n#audioDiv .audio .myjpview {\n  display: none; }\n\n#audioDiv .audio .myjpfullscreen {\n  display: none; }\n\n#audioDiv .pv .myjpview {\n  padding: 30px;\n  padding-top: 60px;\n  width: 100%;\n  height: auto; }\n  #audioDiv .pv .myjpview #jplayer_N {\n    margin: 0 auto;\n    width: auto !important;\n    max-width: 1024px;\n    height: auto !important; }\n    #audioDiv .pv .myjpview #jplayer_N video {\n      width: 100% !important;\n      height: auto !important; }\n    #audioDiv .pv .myjpview #jplayer_N img {\n      display: none !important; }\n\n#audioDiv .pv .myjpfullscreen {\n  display: none; }\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);