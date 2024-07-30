import React, { useContext } from 'react'
import * as config from '../../utilities/config'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalStateProvider'

const Header = () => {

	const { menuToggle, setMenuToggle } = useContext(GlobalContext);

  return (
    <>
        <nav>
			<i className='bi bi-list' onClick={()=> setMenuToggle(!menuToggle)}></i>
			<Link className="nav-link">Invite Friends</Link>
			<form action="#">
                <div className="form-input">
                </div>
            </form>
			<Link><i className="bi bi-brightness-high"></i></Link>
			<input type="checkbox" id="switch-mode" hidden />
			<label className="switch-mode"></label>
			<Link><i className="bi bi-moon"></i></Link>
			<Link className="notification"><i className='bi bi-bell'></i><span className="num">8</span></Link>
			<span className="nav-link dropdown-toggle profile" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				<img src={config.API_BASE_URL+"images/people.png"} />
				<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
					<li><Link className="dropdown-item" >My Courses</Link></li>
					<li><Link className="dropdown-item" >Explore Course</Link></li>
					<li><Link className="dropdown-item" >Account Settings</Link></li>
					<li className="mt-3"><hr className="dropdown-divider" /></li>
					<li><Link className="dropdown-item" >LogOut &nbsp;<i className="bi bi-box-arrow-right fs-5"></i></Link></li>
				</ul>
			</span>
		</nav>
    </>
  )
}

export default Header