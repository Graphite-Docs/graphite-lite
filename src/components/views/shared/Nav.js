import React, { Component } from 'reactn';
import { Link } from 'react-router-dom';
import logo from '../../images/graphite-mark.svg';
import { handleSignOut } from '../../helpers/auth/handleAuth';

class Nav extends Component {
  render() {
      
    document.addEventListener('DOMContentLoaded', () => {

        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      
        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {
      
          // Add a click event on each of them
          $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {
      
              // Get the target from the "data-target" attribute
              const target = el.dataset.target;
              const $target = document.getElementById(target);
      
              // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
              el.classList.toggle('is-active');
              $target.classList.toggle('is-active');
      
            });
          });
        }
      
      });

      return (
        <div>
         <nav className="navbar primary-background" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to={"/"}>
                    <img src={logo} alt="graphite-logo" />
                </Link>
                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                {/*<div class="navbar-start">
                <a class="navbar-item">
                    Home
                </a>

                <a class="navbar-item">
                    Documentation
                </a>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                    More
                    </a>

                    <div class="navbar-dropdown">
                    <a class="navbar-item">
                        About
                    </a>
                    <a class="navbar-item">
                        Jobs
                    </a>
                    <a class="navbar-item">
                        Contact
                    </a>
                    <hr class="navbar-divider" />
                    <a class="navbar-item">
                        Report an issue
                    </a>
                    </div>
                </div>
                </div>*/}

                <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <button onClick={handleSignOut} className="button is-primary">
                            <strong>Sign out</strong>
                        </button>
                    </div>
                </div>
                </div>

            </div>
            </nav>
        </div>
      );
  }
}

export default Nav;
