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

	module.exports = __webpack_require__(6);


/***/ },

/***/ 6:
/***/ function(module, exports) {

	AudioCp = React.createClass({displayName: "AudioCp",
	   componentDidMount:function(){
	      var myPlaylist = new jPlayerPlaylist({
	        jPlayer: "#jplayer_N",
	        cssSelectorAncestor: "#jp_container_N"
	      }, [
	        {
	          title:"発熱エモーション (新式ボカロ調教)",
	          mp3:"http://125.211.202.141:8023/MP3/sm27790524.mp3"
	        }
	      ], {
	        playlistOptions: {
	          enableRemoveControls: true,
	          autoPlay: true
	        },
	        //不支持非H5浏览器
	        //swfPath: "js/jPlayer",
	        supplied: "webmv, ogv, m4v, oga, mp3",
	        smoothPlayBar: true,
	        keyEnabled: true,
	        audioFullScreen: false
	      });

	      $(document).on($.jPlayer.event.pause, myPlaylist.cssSelector.jPlayer,  function(){
	        $('.musicbar').removeClass('animate');
	        $('.jp-play-me').removeClass('active');
	        $('.jp-play-me').parent('li').removeClass('active');
	      });

	      $(document).on($.jPlayer.event.play, myPlaylist.cssSelector.jPlayer,  function(){
	        $('.musicbar').addClass('animate');
	      });

	      $(document).on('click', '.jp-play-me', function(e){
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
	   },
	    render:function(){
	        return React.createElement("div", {id: "jp_container_N"}, 
	                React.createElement("div", {className: "jp-type-playlist"}, 
	                    React.createElement("div", {id: "jplayer_N", className: "jp-jplayer hide"}), 
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
	                            React.createElement("div", null, 
	                              React.createElement("a", {className: "jp-shuffle", title: "shuffle"}, React.createElement("i", {className: "icon-shuffle text-muted"})), 
	                              React.createElement("a", {className: "jp-shuffle-off hid", title: "shuffle off"}, React.createElement("i", {className: "icon-shuffle text-lt"}))
	                            ), 
	                            React.createElement("div", null, 
	                              React.createElement("a", {className: "jp-repeat", title: "repeat"}, React.createElement("i", {className: "icon-loop text-muted"})), 
	                              React.createElement("a", {className: "jp-repeat-off hid", title: "repeat off"}, React.createElement("i", {className: "icon-loop text-lt"}))
	                            ), 
	                            React.createElement("div", {className: "hide"}, 
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
	    }
	});

/***/ }

/******/ });