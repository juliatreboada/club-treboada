document.addEventListener('DOMContentLoaded', () => {
  const btnLogin = document.getElementById('btn-login');

  btnLogin.addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      // Usamos Amplify global desde CDN
    const user = await window.Amplify.Auth.signIn(email, password);


      // Mostrar ventana de éxito
      alert(`¡Login exitoso! Bienvenido ${user.username}`);

      // También se puede hacer un redirect si quieres
      // window.location.href = "/dashboard.html";

    } catch (error) {
      // Mostrar error en alerta y en consola
      console.error('Error de login:', error);
      alert(`Error de login: ${error.message}`);

      // Opcional: mostrar mensaje en tu div de error
      const errorDiv = document.getElementById('login-error');
      if (errorDiv) {
        errorDiv.textContent = error.message;
        errorDiv.classList.remove('d-none');
      }
    }
  });
});
