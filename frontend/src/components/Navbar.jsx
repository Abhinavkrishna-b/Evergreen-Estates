import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <span className="logoIcon">🏡</span>
          <span className="logoText">Evergreen Estate</span>
        </div>

        <ul className="navLinks">
          <li><a href="#home">Home</a></li>
          <li><a href="#properties">Properties</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="authButtons">
          <button className="signIn">Sign in</button>
          <button className="signUp">Sign up</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;