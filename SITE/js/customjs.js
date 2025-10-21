function printMenu() {
    const targetElement = document.getElementsByClassName('menu-left-part')[0];
    if (targetElement) {
        targetElement.innerHTML += `
                <nav id="header-main-menu">
                    <ul class="main-menu sm sm-clean">
                        <li>
                            <a href="index.html">Home</a>
                        </li>
                        <li>
                            <a href="about.html">About</a>
                        </li>
                        <li>
                            <a href="education.html">Education</a>
                        </li>
                        <li>
                            <a href="contact.html">Contact</a>
                        </li>
                    </ul>
                </nav>       

                <div class="menu-right-text">
                    <p class="menu-text-title">HELLO</p>
                    <div class="menu-text">
                        Welcome to Luca Ferrari's Portfolio
                    </div>
                    <br>
                    <br>
                    <a class="socail-text" href="#">LI.</a>
                </div>`
    } else {
        console.error('Target element not found');
    }
}

printMenu();

function printSidebar() {
    const targetElement = document.getElementsByClassName('menu-right-part')[0];
    if (targetElement) {
        targetElement.innerHTML += `<div class="header-logo">
                    <a href="index.html">
                        <img src="images/logo.png" alt="LuFerra Logo">
                    </a>               
                </div>

                <div class="toggle-holder">
                    <div id="toggle">
                        <div class="menu-line"></div>
                    </div>                
                </div>   `
    } else {
        console.error('Target element not found');
    }
}

printSidebar();