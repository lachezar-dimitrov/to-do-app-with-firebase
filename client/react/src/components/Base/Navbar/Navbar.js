import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <NavLink className='navbar-brand' to='/home'>
        Todo
      </NavLink>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarColor01'
        aria-controls='navbarColor01'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon' />
      </button>

      <div className='collapse navbar-collapse' id='navbarColor01'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item active'>
            <NavLink className='nav-link' to='/home'>
              Home
            </NavLink>
          </li>
          <li className='nav-item active'>
            <NavLink className='nav-link' to='/books'>
              Books
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/about'>
              About
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/session'>
              Sign In
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/register'>
              Join
            </NavLink>
          </li>
        </ul>
        <form className='form-inline my-2 my-lg-0'>
          <input
            className='form-control mr-sm-2'
            type='text'
            placeholder='Search books'
          />
          <button className='btn btn-secondary my-2 my-sm-0' type='submit'>
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
