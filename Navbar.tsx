import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Navbar(){
  const { user, signout } = useAuth()
  return (
    <nav className="bg-gradient-to-r from-fifaBlue to-indigo-800 text-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2"><div className="bg-white/10 p-2 rounded">WC26</div><div className="font-bold">WorldCup 2026</div></Link>
          <Link to="/matches" className="hover:underline">Matches</Link>
          <Link to="/teams" className="hover:underline">Teams</Link>
          <Link to="/groups" className="hover:underline">Groups</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/cart" className="bg-white text-fifaBlue px-3 py-1 rounded">Panier</Link>
          {user ? (<div className="flex items-center gap-3"><div className="text-sm">{user.email}</div><button onClick={signout} className="bg-white/20 px-3 py-1 rounded">Logout</button></div>) :
            (<div><Link to="/signin" className="underline mr-2">Sign in</Link><Link to="/signup" className="bg-white px-3 py-1 rounded text-fifaBlue">Sign up</Link></div>)}
        </div>
      </div>
    </nav>
  )
}
