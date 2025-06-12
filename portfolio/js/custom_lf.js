window.addEventListener("popstate", function(e) {
  if (location.pathname != "/index.html") {
    location.replace("/index.html");
  }
});


document.querySelector(".site-footer").innerHTML = `
<div class="container">

  <div class="row">
    <div class="col-12 text-center">
      <!--
        **==========

          NOTE:

          Please don't remove this copyright link unless you buy the license here https://untree.co/license/

        **==========

      -->
      <p class="mb-0">Copyright &copy;<script>document.write(new Date().getFullYear());</script>. All Rights Reserved. &mdash; Designed with love by <a href="https://untree.co">Untree.co</a>  Distributed By <a href="https://themewagon.com">ThemeWagon</a> <!-- License information: https://untree.co/license/ -->
      </p>
    </div>
  </div>
</div> <!-- /.container -->
`;


document.querySelector(".site-navigation").innerHTML = `
<a href="index.html" class="logo m-0">Luca Ferrari<span class="text-primary">.</span></a>

        <ul class="js-clone-nav d-none d-lg-inline-none site-menu float-right site-nav-wrap">
          <li><a href="#home-section" class="nav-link active">Home</a></li>
          <li><a href="#portfolio-section" class="nav-link">Portfolio</a></li>
          <li><a href="#contact-section" class="nav-link">Contact</a></li>
        </ul>

        <a href="#" class="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block d-lg-inline-block" data-toggle="collapse" data-target="#main-navbar">
          <span></span>
        </a>

      </div>
`;