
import React from "react"
import "../visitingcard/Navbar.css"
import { Button } from 'reactstrap'


const NavBar = () => {


    return (
        <div>

            <nav class="navbar fixed-top" data-bs-theme="dark">
                <div class="container-fluid">
                    <a class="navbar-brand fw-bold" href="#">Generator</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav5" aria-controls="navbarNav5" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav5">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#"><i class="fa-sharp fa-solid fa-user-tie"></i></a>
                            </li>
                            <li class="nav-item">
                                <Button>login</Button>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Features</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link">help</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default NavBar
