function printHead() {
    const targetElement = document.head || document.getElementsByTagName('head')[0];
    if (targetElement) {
        targetElement.innerHTML += `<title>Luca Ferrari - Portfolio</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="description" content="Template by CocoBasic" />
        <meta name="keywords" content="HTML, CSS, JavaScript, PHP" />
        <meta name="author" content="CocoBasic" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

        <link rel="shortcut icon" href="images/favicon.ico" />    
        <link href='https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800%7CPlayfair%20Display:700%7CPT%20Serif:400i' rel='stylesheet' type='text/css'>		
        <link rel="stylesheet" type="text/css"  href='style.css' />

        <!--[if lt IE 9]>
                <script src="js/html5shiv.js"></script>            
                <script src="js/respond.min.js"></script>                   
        <![endif]-->         ;`
    } else {
        console.error('Target element not found');
    }
}

printHead();

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
                            <a href="blog.html">Education</a>
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
                        <img src="images/logo.png" alt="Anotte">
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