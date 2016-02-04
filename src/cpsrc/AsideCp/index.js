require("./index.scss");
AsideCp = React.createClass({
  componentDidMount:function(){
      
  },
  render: function() {
    var singersData = ["初音ミク","鏡音リン","鏡音レン","巡音ルカ","KAITO","MEIKO","GUMI","IA","結月ゆかり","がくっぽいど","猫村いろは","UTAU"];
    var songStyleData =["POP","ROCK","JAZZ","FUNK","R&B","抒情","经典","演歌","和风曲","民族调曲"];
    var coverData = ["歌ってみた","Vocaloidカバー曲","UTAUカバー曲"];
    function makeTags(tagDatas){
        var tags = tagDatas.map(function(tag) {
          return <li key={tag}>
                    <a href="#">
                        <i className="fa fa-angle-right text-xs"></i>
                        <span>{tag}</span>
                    </a>
                </li>;
        });
        return tags;
    }
    
    var singers = makeTags(singersData);
    var songStyles = makeTags(songStyleData);
    var covers = makeTags(coverData);
    
    return <section className="vbox">
            <section className="w-f-md scrollable">
              <div className="slim-scroll" data-height="auto" data-disable-fade-out="true" data-distance="0" data-size="10px" data-railopacity="0.2">                 
                <nav className="nav-primary hidden-xs">
                  <ul className="nav bg clearfix">
                    <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                      发现
                    </li>
                    <li>
                      <a href="./">
                        <i className="icon-disc icon text-success"></i>
                        <span className="font-bold">湿娘主页</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className="icon-heart icon text-success"></i>
                        <span className="font-bold">帮助我们</span>
                      </a>
                    </li>
                  </ul>
                  <ul className="nav" data-ride="collapse">
                    <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                      分类索引
                    </li>
                    <li>
                      <a href="javascript:void(0);" onClick={this.handleDefaultTagClick}>
                        <i className="fa-thumbs-up fa text-info"></i>
                        <span className="font-bold">默认排序</span>
                      </a>
                    </li>
                    <li >
                      <a href="javascript:void(0);" className="auto">
                        <span className="pull-right text-muted">
                          <i className="fa fa-angle-left text"></i>
                          <i className="fa fa-angle-down text-active"></i>
                        </span>
                        <i className="icon-music-tone-alt icon text-info"></i>
                        <span>歌手</span>
                      </a>
                      <ul onClick={this.handleTagClick} className="nav dk text-sm">{singers}</ul>
                    </li>
                    <li className="hide">
                      <a href="javascript:void(0);" className="auto">
                        <span className="pull-right text-muted">
                          <i className="fa fa-angle-left text"></i>
                          <i className="fa fa-angle-down text-active"></i>
                        </span>
                        <i className="icon-list icon  text-info"></i>
                        <span>曲风</span>
                      </a>
                      <ul onClick={this.handleTagClick} className="nav dk text-sm">{songStyles}</ul>
                    </li>
                    <li >
                      <a href="javascript:void(0);" className="auto">
                        <span className="pull-right text-muted">
                          <i className="fa fa-angle-left text"></i>
                          <i className="fa fa-angle-down text-active"></i>
                        </span>
                        <i className="fa fa-microphone icon  text-info"></i>
                        <span>翻唱</span>
                      </a>
                      <ul onClick={this.handleTagClick} className="nav dk text-sm">{covers}</ul>
                    </li>
                  </ul>
                  <ul className="nav text-sm">
                    <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                        播放列表
                    </li>
                    <li>
                      <a>
                        <i className="icon-star icon text-warning-dker"></i>
                        <span>个人收藏</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className="icon-clock icon text-warning-dker"></i>
                        <span>最近播放</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </section>
          </section>;
  },
  handleTagClick:function(event){
     event.preventDefault();
     var $target = $(event.target);
     var $li = $($target.parents("li")[0]);
     var tag = $li.text();
     EventEmitter.dispatch("clickTag",tag);
     //alert(tag);
  },
  handleDefaultTagClick:function(event){
      event.preventDefault();
      EventEmitter.dispatch("defaultClickTag");
  }
});