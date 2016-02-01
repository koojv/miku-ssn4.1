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

	module.exports = __webpack_require__(8);


/***/ },

/***/ 8:
/***/ function(module, exports) {

	ListCp = React.createClass({displayName: "ListCp",
	    getInitialState: function() {
	        return{
	            api:"http://125.211.202.141:8023/",
	            data:null
	        };
	    },
	    componentDidMount:function(){
	        var self = this;
	        $.get(this.state.api,{cmd: "list", page: "1", item: 20, by: "download", order: "down"},function(data){
	            self.setState({
	                data:data
	            });
	        });
	    },
	    render:function(){
	        //console.log(this.state);
	        //文件存储基础路径
	        var filebase = this.state.api+"?cmd=file&name=";
	        
	        //state中保留json字符串，实际使用时将其转成对象
	        var data = JSON.parse(this.state.data);
	        var songData = new Array();
	        
	        if(data&&data.STATUS=="[I]OK"){
	            for(var i=0;i<data.ITEMPERPAGE;i++){
	                songData.push(data[i]);
	            }
	            //console.log(songData);
	        }
	        var songs = songData.map(function(song) {
	          return   React.createElement("div", {className: "col-xs-6 col-sm-4 col-md-3 col-lg-2"}, 
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
	                          React.createElement("a", {href: "#", "data-bjax": true, "data-target": "#bjax-target", "data-el": "#bjax-el", "data-replace": "true", className: "title text-ellipsis"}, song.TITLE), 
	                          React.createElement("a", {href: "#", "data-bjax": true, "data-target": "#bjax-target", "data-el": "#bjax-el", "data-replace": "true", className: "author text-ellipsis text-xs text-muted"}, song.AUTHOR)
	                        )
	                      )
	                    );
	        });
	        
	        return React.createElement("section", {className: "hbox stretch"}, 
	                React.createElement("section", null, 
	                  React.createElement("section", {className: "vbox"}, 
	                    React.createElement("section", {className: "scrollable padder-lg"}, 
	                      React.createElement("h2", {className: "font-thin m-b"}, "最新更新"), 
	                      React.createElement("div", {onClick: this.handleSongClick, className: "row row-sm"}, 
	                          songs
	                      ), 
	                      React.createElement("ul", {className: "pagination pagination"}, 
	                        React.createElement("li", null, React.createElement("a", {href: "#"}, React.createElement("i", {className: "fa fa-chevron-left"}))), 
	                        React.createElement("li", {className: "active"}, React.createElement("a", {href: "#"}, "1")), 
	                        React.createElement("li", null, React.createElement("a", {href: "#"}, "2")), 
	                        React.createElement("li", null, React.createElement("a", {href: "#"}, "3")), 
	                        React.createElement("li", null, React.createElement("a", {href: "#"}, "4")), 
	                        React.createElement("li", null, React.createElement("a", {href: "#"}, "5")), 
	                        React.createElement("li", null, React.createElement("a", {href: "#"}, React.createElement("i", {className: "fa fa-chevron-right"})))
	                      )
	                    )
	                  )
	                )
	              );
	    },
	    handleSongClick:function(event){
	        event.preventDefault();
	        var filebase = this.state.api+"?cmd=file&name=";
	        var $target = $(event.target);
	        var $item = $($target.parents("div.item")[0]);
	        if($target.hasClass("play")||$target.hasClass("title")){
	            //console.log($item[0]);
	            var sm = $item.attr("data-sm");
	            var title = $item.find(".title").text();
	            var author = $item.find(".author").text();
	            var cover = $item.find(".cover").attr("src");
	            //console.log(sm,title,author,cover);
	            addToMyPlaylist(title,author,cover,filebase+sm+".mp3",true)
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
	    }
	});

/***/ }

/******/ });