<script>
  import TechNestLogo from "../assets/tech-nest.png";
</script>

<footer>
  <div class="logo">
    <img src={TechNestLogo} alt="logo" width="100" />
  </div>
  <div class="credits">
    <p>A <b>TECH&commat;NEST</b> service</p>
    <p>Developed by <a href="https://deme3.me/">Demetrio Battaglia</a></p>
  </div>
</footer>

<style>
footer {
  display: flex;
  align-items: center;
  padding: 0 64px 64px 64px;
  gap: 32px;
}

footer p {
  margin: 0;
}

footer p b {
  font-family: Arvo;
}
</style>
