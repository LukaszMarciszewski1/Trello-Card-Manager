import { createContext, useContext, useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget'

interface AuthProviderProps {
  children: React.ReactNode
}
// export const AuthContext = createContext<TrelloApiContextType | null>(null)
// type TrelloApiContextType = ReturnType<typeof TrelloApi>

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false
})

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    netlifyIdentity.on('login', (user) => {
      setUser(user)
      netlifyIdentity.close()
      console.log('login event')
    })
    netlifyIdentity.on('logout', () => {
      setUser(null)
      console.log('logout event')
    })
    netlifyIdentity.on('init', (user) => {
      setUser(user)
      setAuthReady(true)
      console.log('init event')
    })

    
    netlifyIdentity.init()

    return () => {
      netlifyIdentity.off('login')
    }
  }, [])

  const login = () => {
    netlifyIdentity.open()
  }

  const logout = () => {
    netlifyIdentity.logout()
  }

  const context = { user, login, logout, authReady }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const auth = useContext(AuthContext)

  if (!auth) {
    throw new Error('useAuth needs to be used inside AuthContext')
  }

  return auth
}