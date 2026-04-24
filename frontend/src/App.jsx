import './App.css'
import Navbar from './components/Navbar/Navbar';
import HomePage from './routes/Homepage/Homepage';

function App() {
	return (
		<div className = "app">
			<div className="navbar">
				<Navbar />
			</div>

			<div className="content">
				<HomePage />
			</div>
		</div>
	)
}

export default App
