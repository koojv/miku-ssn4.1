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
	ListCp = React.createClass({displayName: "ListCp",
	    getInitialState: function() {
	        //初始化的时候，优先读取hash上的查询串
	        //这里的hash只是用来记录查询串（便于本页刷新与本页分享），不支持历史记录
	        var queryString = HashUtil.get();
	        if(queryString){
	            var queryObj = HashUtil.toJsonObj(queryString);
	        }else{
	            var queryObj = {cmd: "list", page: "1", item: 18, by: "download", order: "down"};
	        }
	        //console.log(queryObj);
	        
	        return{
	            data:null,
	            loading:true,
	            tag:queryObj.keyword,
	            parameter:queryObj
	        };
	    },
	    componentDidMount:function(){
	        this._loadSongsData(this.state.parameter);
	        
	        var self = this;
	        EventEmitter.subscribe("clickTag", function(data) {
	            //console.log(data);
	            self.state.tag = data;
	            self.state.parameter.page = 1;
	            self.state.parameter.range = "tag";
	            self.state.parameter.keyword = self.state.tag;
	            self._loadSongsData(self.state.parameter);
	        });
	        EventEmitter.subscribe("defaultClickTag", function() {
	            //console.log("defaultClickTag");
	            self.state.tag = null;
	            self.state.parameter = {cmd: "list", page: 1, item: 18, by: "download", order: "down"};
	            self._loadSongsData(self.state.parameter);
	        });
	    },
	    render:function(){
	        //console.log(this.state);
	        //文件存储基础路径
	        var filebase = this.props.api+"?cmd=file&name=";
	        
	        //state中保留json字符串，实际使用时将其转成对象
	        var data = JSON.parse(this.state.data);
	        //console.log(data);
	        var songData = new Array();
	        var pageData = new Array();
	        var pageTitle = "最新更新";
	        var loadingClass = "";
	        var errorClass = "";
	        
	        if(this.state.tag){
	            pageTitle = this.state.tag+"/"+pageTitle;
	        }
	        if(data&&data.STATUS=="[I]OK"){
	            pageTitle = pageTitle +"("+data.CURRENTPAGE+"/"+data.TOTALPAGE+")";
	            for(var i=0;i<data.COUNTPERPAGE;i++){
	                songData.push(data[i]);
	            }
	            //console.log(songData);
	            //console.log(data.CURRENTPAGE);
	            //console.log(pageData);
	            pageData = this._makePageData(data,10);
	        }else{
	            errorClass = "error";    
	        }
	        var songs = songData.map(function(song) {
	          return   React.createElement("div", {key: song.ID, className: "col-xs-6 col-sm-4 col-md-3 col-lg-2"}, 
	                      React.createElement("div", {className: "item", "data-sm": song.ID}, 
	                        React.createElement("div", {className: "pos-rlt"}, 
	                          React.createElement("div", {className: "item-overlay opacity r r-2x bg-black"}, 
	                            React.createElement("div", {className: "center text-center m-t-n"}, 
	                              React.createElement("a", {href: "#"}, React.createElement("i", {className: "play fa fa-play-circle i-2x"}))
	                            )
	                          ), 
	                          React.createElement("a", {href: "#"}, React.createElement("img", {src: filebase+song.ID+".jpg", alt: "", className: "cover r r-2x img-full"}))
	                        ), 
	                        React.createElement("div", {className: "padder-v"}, 
	                          React.createElement("a", {href: "javascript:void(0);", "data-bjax": true, "data-target": "#bjax-target", "data-el": "#bjax-el", "data-replace": "true", className: "title text-ellipsis"}, song.TITLE), 
	                          React.createElement("a", {href: "javascript:void(0);", "data-bjax": true, "data-target": "#bjax-target", "data-el": "#bjax-el", "data-replace": "true", className: "author text-ellipsis text-xs text-muted"}, song.AUTHOR)
	                        )
	                      )
	                    );
	        });
	        var pages = pageData.map(function(page){
	            return React.createElement("li", {key: page.page, className: page.className}, React.createElement("a", {"data-page": page.page, href: "#", className: "numPage"}, page.text));
	        });
	        //console.log(pages);
	        if(this.state.loading){
	            loadingClass = "loading";
	        }else{
	            loadingClass = "loaded";
	        }
	        //console.log(loadingClass);
	        return React.createElement("section", {className: "hbox stretch "+loadingClass+" "+errorClass}, 
	                React.createElement("section", null, 
	                  React.createElement("section", {className: "vbox"}, 
	                    React.createElement("section", {className: "scrollable padder-lg"}, 
	                      React.createElement("h2", {className: "font-thin m-b"}, pageTitle), 
	                      React.createElement("div", {onClick: this.handleSongClick, className: "row row-sm"}, 
	                          songs
	                      ), 
	                      React.createElement("ul", {onClick: this.handlePageClick, className: "pagination pagination"}, 
	                        React.createElement("li", {className: "prePageLi"}, React.createElement("a", {href: "#", className: "prePage"}, React.createElement("i", {className: "fa fa-chevron-left"}))), 
	                        pages, 
	                        
	                        React.createElement("li", {className: "nextPageLi"}, React.createElement("a", {href: "#", className: "nextPage"}, React.createElement("i", {className: "fa fa-chevron-right"})))
	                      )
	                    )
	                  )
	                )
	              );
	    },
	    _makePageData:function(data,beShowPageNum){
	        beShowPageNum = beShowPageNum - 2;
	        var pageData = new Array();
	        //对于首页的处理
	        if(data.CURRENTPAGE==1){
	           pageData.push({text:"首页","page":1,"className":"first active"});  
	        }else{
	           pageData.push({text:"首页","page":1,"className":"first"});
	        }

	        //中间显示几页处理
	        var startPage = parseInt(data.CURRENTPAGE) - Math.floor(beShowPageNum/2);
	        //最小显示正数第二页
	        if(startPage<=1){
	            startPage = 2;
	        }
	        //最大显示到数第二页
	        var endPage = parseInt(data.CURRENTPAGE) + Math.floor(beShowPageNum/2);
	        if(endPage >= data.TOTALPAGE-1){
	            endPage = data.TOTALPAGE-1;
	        }

	        for(var i =startPage;i<=endPage;i++){
	            if(i == data.CURRENTPAGE){
	               pageData.push({"text":i,"page":i,"className":"active"});   
	            }else{
	               pageData.push({"text":i,"page":i,"className":""});
	            }
	        }
	        //不足补充(有BUG)
	        /*
	        console.log(pageData.length,beShowPageNum + 1);
	        if(pageData.length < beShowPageNum + 1){
	            var addnum = (beShowPageNum + 1)-pageData.length;
	            //正向补充
	            var lastpage = pageData[pageData.length-1].page;
	            if(lastpage <= parseInt(data.TOTALPAGE) - Math.floor(beShowPageNum/2)){
	                for(var i=lastpage+1;i<=lastpage+addnum;i++){
	                    if(i == data.CURRENTPAGE){
	                       pageData.push({"page":i,"className":"active"});   
	                    }else{
	                       pageData.push({"page":i,"className":""});
	                    }   
	                }
	                console.log("正向补充");
	            }else{
	                var firstPage = pageData[1];
	                for(var i = firstPage.page -1;i>=firstPage.page - addnum;i--){
	                    if(i == data.CURRENTPAGE){
	                       pageData.push({"page":i,"className":"active"});   
	                    }else{
	                       pageData.push({"page":i,"className":""});
	                    }
	                }
	                //按照page排序
	                pageData.sort(function(a,b){
	                    if(a.page > b.page){
	                        return 1;
	                    }
	                    if(a.page == b.page){
	                        return 0;
	                    }
	                    if(a.page < b.page){
	                        return -1;
	                    }
	                });
	                console.log("反向补充");
	            }
	            //反向补充

	        }
	        */
	        //对于尾页的处理
	        if(data.CURRENTPAGE==data.TOTALPAGE){
	           pageData.push({"page":data.TOTALPAGE,"text":"尾页","className":"last active"});  
	        }else{
	           pageData.push({"page":data.TOTALPAGE,"text":"尾页","className":"last"});
	        }
	        return pageData;
	    },
	    _loadSongsData:function(parameter){
	        this.setState({
	            loading:true
	        });
	        //在加载数据之前，将查询串同步到hash上
	        HashUtil.set(HashUtil.toQueryString(this.state.parameter));
	        var self = this;
	        var promise = $.get(this.props.api,parameter);
	        promise.done(function(data){
	            self.setState({
	                data:data,
	                loading:false
	            });
	        });
	        //console.log(promise);
	    },
	    handleSongClick:function(event){
	        event.preventDefault();
	        var filebase = this.props.api+"?cmd=file&name=";
	        var $target = $(event.target);
	        var $item = $($target.parents("div.item")[0]);
	        if($target.hasClass("play")||$target.hasClass("title")){
	            //console.log($item[0]);
	            var sm = $item.attr("data-sm");
	            var title = $item.find(".title").text();
	            var author = $item.find(".author").text();
	            var cover = $item.find(".cover").attr("src");
	            //调用全局事件系统的添加歌曲事件（添加一首歌，并且播放）
	            EventEmitter.dispatch("playSong", { "title":title,"author":author,"cover":cover,"file":filebase+sm+".mp3"});
	        }
	        function addToMyPlaylist(title,author,cover,href,isplay){
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
	              myPlaylist.add({
	                    title:title,
	                    artist:author,
	                    poster:cover,
	                    mp3:href
	              });
	              if(isplay){
	                myPlaylist.play($("#jp-playlist ul").length-1);
	              }
	            return true;
	        }
	    },
	    handlePageClick:function(evnet){
	        evnet.preventDefault();
	        var $target =  $(evnet.target);
	        if($target.hasClass("prePage")||$target.parent().hasClass("prePage")){
	            var data = JSON.parse(this.state.data);
	            var page = parseInt(data.CURRENTPAGE)-1;
	            if(page <= 0){
	                return false;
	            }
	            
	            this.state.parameter.page = page;
	            this._loadSongsData(this.state.parameter);
	            return true;
	        }
	        if($target.hasClass("nextPage")||$target.parent().hasClass("nextPage")){
	            var data = JSON.parse(this.state.data);
	            var page = parseInt(data.CURRENTPAGE)+1;
	            if(page > data.TOTALPAGE){
	                return false;
	            }
	            this.state.parameter.page = page;
	            this._loadSongsData(this.state.parameter);
	            return true;
	        }
	        if($target.hasClass("numPage")){
	            var page = parseInt($target.attr("data-page"));
	            this.state.parameter.page = page;
	            this._loadSongsData(this.state.parameter);
	            return true;
	        }
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
	exports.push([module.id, "#bjax-target .loading {\n  display: none; }\n\n#bjax-target .error {\n  display: none; }\n\n@media (max-width: 767px) {\n  #bjax-target .pagination {\n    width: 100%; }\n    #bjax-target .pagination li {\n      display: none; }\n    #bjax-target .pagination li.nextPageLi, #bjax-target .pagination li.prePageLi, #bjax-target .pagination li.first, #bjax-target .pagination li.last {\n      display: inline-block;\n      text-align: center;\n      width: 25%; }\n      #bjax-target .pagination li.nextPageLi a, #bjax-target .pagination li.prePageLi a, #bjax-target .pagination li.first a, #bjax-target .pagination li.last a {\n        width: 100%; } }\n\n@media (max-width: 767px) {\n  #bjax-target .padder-lg {\n    padding-bottom: 60px; } }\n", ""]);

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