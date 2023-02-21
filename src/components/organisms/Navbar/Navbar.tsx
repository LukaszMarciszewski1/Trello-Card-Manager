import { useContext } from 'react'
import styles from './styles.module.scss'
import { AuthContext } from 'context/AuthContext'
import Button from 'components/common/Button/Button'

const Navbar: React.FC = () => {
  // const { logout } = useContext(AuthContext)
  // const {dispatch} = useContext(AuthContext)
  // const { user, login, logout, authReady } = useContext(AuthContext)

  // console.log(user)
  return (
    <div className={styles.navbar}>
      {/* {authReady && ( */}
      <ul>
        {/* {!user && <li onClick={login} className={styles.navBtn}>Login/Signup</li>}
          {user && <li>{user}</li>}
          {user && <li onClick={logout} className={styles.navBtn}>Logout</li>} */}
          {/* <button onClick={logout}>Logout</button> */}
      </ul>
      {/* )} */}
    </div>
  )
}

export default Navbar