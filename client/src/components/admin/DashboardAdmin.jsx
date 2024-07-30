import React, { useContext } from 'react'
import Sidebar from '../include/Sidebar'
import Header from '../include/Header'
import * as config from '../../utilities/config'
import { GlobalContext } from '../../context/GlobalStateProvider'


const DashboardAdmin = () => {

    const { userType } = useContext(GlobalContext);

    console.log(localStorage);

  return (
    <>
        <Sidebar />
		<section id="content" className="contentcss">
        <Header />
			<main>
				<h1>{userType}</h1>

			</main>
		</section>
    </>
  )
}

export default DashboardAdmin