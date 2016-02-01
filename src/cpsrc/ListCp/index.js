ListCp = React.createClass({
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
          return   <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                      <div className="item" data-sm={song.ID}>
                        <div className="pos-rlt">
                          <div className="item-overlay opacity r r-2x bg-black">
                            <div className="center text-center m-t-n">
                              <a href="#"><i className="play fa fa-play-circle i-2x"></i></a>
                            </div>
                          </div>
                          <a href="#"><img src={filebase+song.ID+".jpg"} alt="" className="cover r r-2x img-full"/></a>
                        </div>
                        <div className="padder-v">
                          <a href="#" data-bjax data-target="#bjax-target" data-el="#bjax-el" data-replace="true" className="title text-ellipsis">{song.TITLE}</a>
                          <a href="#" data-bjax data-target="#bjax-target" data-el="#bjax-el" data-replace="true" className="author text-ellipsis text-xs text-muted">{song.AUTHOR}</a>
                        </div>
                      </div>
                    </div>;
        });
        
        return <section className="hbox stretch">
                <section>
                  <section className="vbox">
                    <section className="scrollable padder-lg">
                      <h2 className="font-thin m-b">最新更新</h2>
                      <div onClick={this.handleSongClick} className="row row-sm">
                          {songs}
                      </div>
                      <ul className="pagination pagination">
                        <li><a href="#"><i className="fa fa-chevron-left"></i></a></li>
                        <li className="active"><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li><a href="#"><i className="fa fa-chevron-right"></i></a></li>
                      </ul>
                    </section>                    
                  </section>
                </section>
              </section>;
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