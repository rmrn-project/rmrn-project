// footer.js

// HTML Footer
const footerHTML = `
<footer id="kontak">
  <div class="container text-center">
    <!-- Logo -->
    <a href="/" class="footer-logo">
      <img src="/image/rmrn.png" alt="RMRN Logo" width="75">
    </a>

    <p>Undangan Digital & Souvenir Korek Custom<br>
       WA: <a href="https://wa.me/6281255721597" target="_blank" rel="noopener">0812-5572-1597</a>
    </p>
    <p>&copy; 2025 RMRN. All rights reserved.</p>
  </div>
</footer>
`;

// CSS Footer
const footerCSS = `
<style>
  footer {
    background-color: var(--biru-tua);
    color: var(--putih);
    padding: 90px 0 40px;
    margin-top: 50px;
    text-align: center;
  }
  footer h3 {
    font-size: 2.2rem;
    margin-bottom: 20px;
  }
  footer a {
    color: var(--putih);
    text-decoration: none;
  }
</style>
`;

// Inject ke body
document.body.insertAdjacentHTML('beforeend', footerCSS + footerHTML);