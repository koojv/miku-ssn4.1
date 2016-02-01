AudioCp = React.createClass({
   componentDidMount:function(){
      //将myPlaylist暴露出去
      myPlaylist = new jPlayerPlaylist({
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
        return <div id="jp_container_N">
                <div className="jp-type-playlist">
                    <div id="jplayer_N" className="jp-jplayer hide"></div>
                    <div className="jp-gui">
                        <div className="jp-video-play hide">
                          <a className="jp-video-play-icon">play</a>
                        </div>
                        <div className="jp-interface">
                          <div className="jp-controls">
                            <div><a className="jp-previous"><i className="icon-control-rewind i-lg"></i></a></div>
                            <div>
                              <a className="jp-play"><i className="icon-control-play i-2x"></i></a>
                              <a className="jp-pause hid"><i className="icon-control-pause i-2x"></i></a>
                            </div>
                            <div><a className="jp-next"><i className="icon-control-forward i-lg"></i></a></div>
                            <div className="hide"><a className="jp-stop"><i className="fa fa-stop"></i></a></div>
                            <div><a className="" data-toggle="dropdown" data-target="#playlist"><i className="icon-list"></i></a></div>
                            <div className="jp-progress hidden-xs">
                              <div className="jp-seek-bar dk">
                                <div className="jp-play-bar bg-info">
                                </div>
                                <div className="jp-title text-lt">
                                  <ul>
                                    <li></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="hidden-xs hidden-sm jp-current-time text-xs text-muted"></div>
                            <div className="hidden-xs hidden-sm jp-duration text-xs text-muted"></div>
                            <div className="hidden-xs hidden-sm">
                              <a className="jp-mute" title="mute"><i className="icon-volume-2"></i></a>
                              <a className="jp-unmute hid" title="unmute"><i className="icon-volume-off"></i></a>
                            </div>
                            <div className="hidden-xs hidden-sm jp-volume">
                              <div className="jp-volume-bar dk">
                                <div className="jp-volume-bar-value lter"></div>
                              </div>
                            </div>
                            <div>
                              <a className="jp-shuffle" title="shuffle"><i className="icon-shuffle text-muted"></i></a>
                              <a className="jp-shuffle-off hid" title="shuffle off"><i className="icon-shuffle text-lt"></i></a>
                            </div>
                            <div>
                              <a className="jp-repeat" title="repeat"><i className="icon-loop text-muted"></i></a>
                              <a className="jp-repeat-off hid" title="repeat off"><i className="icon-loop text-lt"></i></a>
                            </div>
                            <div className="hide">
                              <a className="jp-full-screen" title="full screen"><i className="fa fa-expand"></i></a>
                              <a className="jp-restore-screen" title="restore screen"><i className="fa fa-compress text-lt"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    <div className="jp-playlist dropup" id="playlist">
                        <ul className="dropdown-menu aside-xl dker">
                          <li className="list-group-item"></li>
                        </ul>
                      </div>
                    <div className="jp-no-solution hide">
                        <span>Update Required</span>
                        To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
                      </div>
                </div>
              </div>;
    }
});