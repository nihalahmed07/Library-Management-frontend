const firebaseConfig = {
    apiKey: "AIzaSyB38r2VRt1VWjBvaCc7k-DI9BRxCiv4WiQ",
    authDomain: "library-management---devrev.firebaseapp.com",
    databaseURL: "https://library-management---devrev-default-rtdb.firebaseio.com",
    projectId: "library-management---devrev",
    storageBucket: "library-management---devrev.appspot.com",
    messagingSenderId: "353275880124",
    appId: "1:353275880124:web:d1f08579c206d96a35a6b9",
    measurementId: "G-976YQWE1W0"
};
      firebase.initializeApp(firebaseConfig);
  render();
  function render(){
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      recaptchaVerifier.render();
  }
  function phoneAuth(){
      var number = document.getElementById('number').value;
      firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier).then(function(confirmationResult){
          window.confirmationResult = confirmationResult;
          coderesult = confirmationResult;
          document.getElementById('sender').style.display = 'none';
          document.getElementById('verifier').style.display = 'block';
      }).catch(function(error){
          alert(error.message);
      });
  }
  function codeverify(){
      var code = document.getElementById('verificationcode').value;
      coderesult.confirm(code).then(function(){
          document.getElementsByClassName('p-conf')[0].style.display = 'block';
          document.getElementsByClassName('n-conf')[0].style.display = 'none';
      }).catch(function(){
          document.getElementsByClassName('p-conf')[0].style.display = 'none';
          document.getElementsByClassName('n-conf')[0].style.display = 'block';
      })
  }
  function gotohome() {
          window.location.href = 'home.html';
  }