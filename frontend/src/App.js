import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Books from './pages/Books';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './Components/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Book from './pages/Book';
import Dashboard from './pages/Dashboard';
import AddBook from './pages/AddBook';
import MyStoredBooks from './pages/MyStoredBooks';
import BooksIBought from './pages/BooksIBought';
import Cart from './pages/Cart';
function App() {
  return (
    <div className='w-screen min-h-screen bg-[#f5f5f5]'>
        <Navbar />
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/about' element = {<About/>}/>
          <Route path='/contact' element = {<Contact/>}/>
          <Route path='/books' element = {<Books/>}/>
          <Route path='/signin' element = {<Login/>}/>
          <Route path='/signup' element = {<SignUp/>}/>
          <Route path='/books/book/:bookid' element = {<Book/>}/>
          <Route path='/dashboard' element = {<Dashboard/>}/>
          <Route path='/add-book' element = {<AddBook/>}/>
          <Route path='/myaddbooks' element = {<MyStoredBooks/>}/>
          <Route path='/mypurchasedbooks' element = {<BooksIBought/>}/>
          <Route path='/cart' element = {<Cart/>}/>
         </Routes>
    </div>
  );
}

export default App;
