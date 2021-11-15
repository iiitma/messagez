import React,  {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { selectMe } from '../features/users';

export default function SideBar(params) {
    const me = useSelector(selectMe);

    return (
      <div id="sidenav" className="sidenav col-auto py-4 px-3 d-flex flex-column">
      <div className="sidenav-header text-center sticky-top">
        <div className="sidenav-mini-icon">
        <img
        src={me.avatar}
        alt="..."
        className="avatar avatar-sm rounded-3"
        data-bs-toggle="tooltip" data-bs-placement="bottom" title={me.fullName}
      />
        </div>
      </div>
  
      <ul className="nav flex-column text-center mb-auto">
        <li className="nav-item active">
          <span href="./" rel="noopener" className="nav-link py-3" ><i className="fa-comments-alt"></i></span>
        </li> 
         <li className="nav-item">
          <a href="./" rel="noopener" className="nav-link py-3" >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-users" viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="9" cy="7" r="4" />
  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
</svg>
          </a>
        </li>
        <li className="nav-item">
          <a href="./" rel="noopener" className="nav-link py-3" >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-phone" viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
</svg>
          </a>
          <span className="badge bg-danger rounded-circle notification-badge">2</span>
        </li>
  <hr />
        <li className="nav-item">
          <a href="./" rel="noopener" className="nav-link py-3" >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-star" viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
</svg>
          </a>
        </li>
  
        <li className="nav-item">
          <a href="./" rel="noopener" className="nav-link py-3" >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bookmarks" viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M13 7a2 2 0 0 1 2 2v12l-5 -3l-5 3v-12a2 2 0 0 1 2 -2h6z" />
  <path d="M9.265 4a2 2 0 0 1 1.735 -1h6a2 2 0 0 1 2 2v12l-1 -.6" />
</svg>
          </a>
        </li>
        <li className="nav-item">
          <a href="./" rel="noopener" className="nav-link py-3" >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-settings" viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
  <circle cx="12" cy="12" r="3" />
</svg>
          </a>
        </li>
  
  
        <hr />
  
        <li className="nav-item">
        <a href="./" rel="noopener" className="btn btn-icon-only btn-primary rounded-circle" ><i className="fa fa-plus"></i></a>
        </li>
      </ul>
  
      <div className="sidenav-footer text-center py-3">
      <ThemeToggle/>
      </div>
      </div>
    )
  }
  


  function ThemeToggle(){
    const [darkTheme, setDarkTheme] = useState(false);
    const buttonHandler = () => {
      setDarkTheme((current) => !current, );
    };
  
    useEffect(() => {
        if (darkTheme){
        document.body.classList.add("dark-theme");
        document.querySelector('meta[name="theme-color"').setAttribute("content", "#121212")
      } else {
        document.body.classList.remove("dark-theme");
        document.querySelector('meta[name="theme-color"').setAttribute("content", "#6076f3")
      }
    });
   
    return (
      <>
      <span className="text-xs"><i className="fal fa-sun"></i></span>
  <div className="form-check form-switch theme-toggle mt-3">
    <input className="form-check-input" onChange={buttonHandler} type="checkbox" defaultChecked={darkTheme}/>
  </div>
  <span className="text-xs"><i className="fal fa-moon"></i></span>
  </>
    );
  }
