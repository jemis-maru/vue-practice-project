<template>
  <div>
    <footer>
      <div class="container">
        <div>
          <h5 class="footerHeader">Vishwakarma Government Engineering College, Ahmedabad</h5>
        </div>
        <br />
        <div class="row">
          <div class="col-md-6 col-12">
            <div class="row">
              <div class="col-md-1 col-1">
                <b-icon icon="house-fill"></b-icon>
              </div>
              <div
                class="col-md-10 col-10 text-left addressDiv"
              >
                Nr. Visat three roads, <br />
                Sabarmati-Koba highway, <br />
                Chandkheda, Ahmedabad-382424
              </div>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <p class="contactTitle">Contact us</p>
            <div class="row contactRowDiv">
              <div class="col-md-11 col-11 row text-left">
                <div class="row">
                  <div class="col">
                    <b-icon icon="telephone-fill"></b-icon>
                  </div>
                  <div class="col">
                    <div class="col-md-12 col-12 text-wrap">
                      <a
                        class="text-white text-decoration-none"
                        href="tel:07923293866"
                        >(079)23293866</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-11 row col-11 text-left mt-2">
                <div class="row">
                  <div class="col">
                    <b-icon icon="envelope-open-fill"></b-icon>
                  </div>
                  <div class="col">
                    <div class="col-md-12 col-12 text-wrap">
                      <a
                        class="text-white text-decoration-none"
                        href="mailto:est@vgecg.ac.in"
                        >est@vgecg.ac.in</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="footer-copyright text-center py-3">
        © 2021 Copyright:
        <a
          class="text-decoration-none footerLink"
          target="_blank"
          href="https://www.vgecg.ac.in/"
          >vgecg.ac.in</a
        >
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "custom-footer",
};
</script>

<style scoped>
footer {
    color: #ffffff;
    padding-top: 20px;
    background-color: #003865;
}
.footerHeader {
    text-align: center;
}
.addressDiv{
    margin-bottom: 10px;
}
.contactTitle{
    text-align: left;
}
.contactRowDiv{
    margin-left: 2px;
}
.footerLink{
    color: #ffffff;
}
</style>