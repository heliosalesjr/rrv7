import {
    
    NavLink,

    
  } from "react-router";

const Navbar = () => {
  return (
    <>
      <nav className="flex gap-4 p-4 bg-stone-800 text-white">
      <NavLink 
        to="/" 
        className="text-2xl font-extrabold tracking-widest bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg hover:scale-110 transition-transform"
      >
        Hey<span className="animate-bounce inline-block text-stone-200">Helio</span><span className="text-pink-400">!</span>
      </NavLink>
        <div className="ml-auto flex gap-4">
          <NavLink to="/" className={ ({isActive}) => isActive ? "font-bold underline" : "text-stone-300"}>Home</NavLink>
          <NavLink to="/new" className={ ({isActive}) => isActive ? "font-bold underline" : "text-stone-300"}>New Item</NavLink>
        </div>
      </nav>
     
      
    </>
  )
}

export default Navbar