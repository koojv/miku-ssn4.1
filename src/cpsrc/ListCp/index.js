require("./index.scss");
ListCp = React.createClass({
    getInitialState: function() {
        //初始化的时候，优先读取hash上的查询串
        //这里的hash只是用来记录查询串（便于本页刷新与本页分享），不支持历史记录
        var queryString = this._hashUtil.get();
        if(queryString){
            var queryObj = this._hashUtil.toJsonObj(queryString);
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
          return   <div key={song.ID} className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                      <div className="item" data-sm={song.ID}>
                        <div className="pos-rlt">
                          <div className="item-overlay opacity r r-2x bg-black">
                            <div className="center text-center m-t-n">
                              <a href="javascript:void(0);"><i className="play fa fa-play-circle i-2x"></i></a>
                            </div>
                          </div>
                          <a href="javascript:void(0);"><img src={filebase+song.ID+".jpg"} alt="" className="cover r r-2x img-full"/></a>
                        </div>
                        <div className="padder-v">
                          <a href="javascript:void(0);" data-bjax data-target="#bjax-target" data-el="#bjax-el" data-replace="true" className="title text-ellipsis">{song.TITLE}</a>
                          <a href="javascript:void(0);" data-bjax data-target="#bjax-target" data-el="#bjax-el" data-replace="true" className="author text-ellipsis text-xs text-muted">{song.AUTHOR}</a>
                        </div>
                      </div>
                    </div>;
        });
        var pages = pageData.map(function(page){
            return <li key={page.page} className={page.className}><a data-page={page.page} href="javascript:void(0);" className="numPage">{page.text}</a></li>;
        });
        //console.log(pages);
        if(this.state.loading){
            loadingClass = "loading";
        }else{
            loadingClass = "loaded";
        }
        //console.log(loadingClass);
        return <section className={"hbox stretch "+loadingClass+" "+errorClass}>
                <section>
                  <section className="vbox">
                    <section className="scrollable padder-lg">
                      <h2 className="font-thin m-b">{pageTitle}</h2>
                      <div onClick={this.handleSongClick} className="row row-sm">
                          {songs}
                      </div>
                      <ul onClick={this.handlePageClick} className="pagination pagination">
                        <li className="prePageLi"><a href="javascript:void(0);" className="prePage"><i className="fa fa-chevron-left"></i></a></li>
                        {pages}
                        
                        <li className="nextPageLi"><a href="javascript:void(0);" className="nextPage"><i className="fa fa-chevron-right"></i></a></li>
                      </ul>
                    </section>                    
                  </section>
                </section>
              </section>;
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
        this._hashUtil.set(this._hashUtil.toQueryString(this.state.parameter));
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
    _hashUtil:{
        toJsonObj: function(queryString){ 
            var arr = queryString.split("&");
            var ret="{";
            for(var i=0;i<arr.length;i++){
                var tmparr=arr[i].split("=");
                ret+="\"";
                ret+=tmparr[0];
                ret+="\":\"";
                ret+=tmparr[1];
                ret+="\"";
                if (i<arr.length-1) ret+=",";
            }
            ret+="}";
            ret = decodeURIComponent(ret);
            ret = JSON.parse(ret);
            return ret;
        },
        toQueryString: function(jsonObj){
            var ret="";
            //var jsonObj = eval('(' + json + ')');
            for(var key in jsonObj){
                //alert(key+':'+json[i][key]);
                ret+=key + "=" + encodeURIComponent(jsonObj[key]) + "&";
                }
            //去除最后一个&
            ret = ret.slice(0,ret.length - 1);
            return ret;
        },
        get:function(){
            var url = window.location.href;
            //console.log(url);
            var index = url.indexOf("#");
            if(index!= -1){
                var queryString = url.slice(index+1,url.length);
                return queryString;   
            }else{
                return null;
            }
        },
        set:function(queryString){
            var url = window.location.href;
            //console.log(url);
            var index = url.indexOf("#");
            if(index!= -1){
                var orgurl = url.slice(0,index);
            }else{
                var orgurl = url;
            }
            //console.log(orgurl);
            var url = orgurl + "#" + queryString;
            window.location.replace(url);
            //console.log(url);
        }
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