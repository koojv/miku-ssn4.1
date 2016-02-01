HeaderCp = React.createClass({
    render:function(){
        return <div>
     <div className="navbar-header aside bg-info dk nav-xs">
        <a className="btn btn-link visible-xs" data-toggle="class:nav-off-screen,open" data-target="#nav,html">
          <i className="icon-list"></i>
        </a>
        <a href="./" className="navbar-brand text-lt">
          <i className="icon-earphones"></i>
          <span className="hidden-nav-xs m-l-sm">shi-shi.net</span>
        </a>
        <a className="btn btn-link visible-xs" data-toggle="dropdown" data-target=".user">
          <i className="icon-settings"></i>
        </a>
      </div>
      <ul className="nav navbar-nav hidden-xs">
        <li>
          <a href="#nav,.navbar-header" data-toggle="class:nav-xs,nav-xs" className="text-muted">
            <i className="fa fa-indent text"></i>
            <i className="fa fa-dedent text-active"></i>
          </a>
        </li>
      </ul>
      <form className="navbar-form navbar-left input-s-lg m-t m-l-n-xs hidden-xs" role="search">
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-btn">
              <button type="submit" className="btn btn-sm bg-white btn-icon rounded"><i className="fa fa-search"></i></button>
            </span>
            <input type="text" className="form-control input-sm no-border rounded" placeholder="搜索歌曲、专辑..."/>
          </div>
        </div>
      </form>
      <div className="navbar-right ">
        <ul className="nav navbar-nav m-n hidden-xs nav-user user">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle bg clear" data-toggle="dropdown">
              MIKUScallion<b className="caret"></b>
            </a>
            <ul className="dropdown-menu animated fadeInRight">            
              <li>
                <span className="arrow top"></span>
                <a href="#">个人中心</a>
              </li>
              <li className="divider"></li>
              <li>
                <a href="#">退出</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
     </div>;
    }
});