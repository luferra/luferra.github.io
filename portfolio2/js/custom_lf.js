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

        
      </div>
`;