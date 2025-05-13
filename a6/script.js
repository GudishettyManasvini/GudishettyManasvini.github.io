function msg()
{
   
    let email=document.getElementById('email').value;
    let pass=document.getElementById('pass').value;
    document.getElementById('op').innerText=`Email: ${email},Password: ${pass}`;
    console.log("Emai:", email);
    console.log("Password:", pass);
}