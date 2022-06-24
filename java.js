// function myFunction(){
//   login();
//   onlogin();

// }




let bool = false;

async function onlogin() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;
  let auth = document.querySelector(
    'input[name="flexRadioDefault"]:checked'
  ).value;
  // let data=0;
  var body = {
    email: email,
    pass: password,
    auth: auth,
  };
  console.log(body.email);
  console.log(body.pass);
  console.log(body.auth);

  await axios({
    method: "post",
    url: "http://localhost:3000/login",
    data: body,
  })
    .then(function (response) {
      if(response.data.token === undefined){
          logincheck=true;
      }
      else{
          logincheck=true;
      console.log("====", response.data.token);
      localStorage.setItem("token", response.data.token);
      // document.getElementById('data').innerHTML = response.data.token
      // console.log('token',localStorage.getItem("token"));
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Please enter a valid information", error.message);
    });

  let value = localStorage.getItem("token");
  console.log("value", value);
  axios
    .post(
      "http://localhost:3000/decode",
      {
        //...data
      },
      {
        headers: {
          Authorization: value,
        },
      }
    )
    .then(function (response) {
      console.log("token decode", response);
      localStorage.setItem("auth", response.data.decoded.auth);
      let user = localStorage.getItem("auth");
      console.log("user", response.data.decoded.auth);
      if (response.data.decoded.auth === "admin") {
        location.href = "admin.html";
        // login();

      } else if (response.data.decoded.auth === "student") {
        location.href = "student.html";
        alert("student");
      } else {
        alert("Please select role");
      }
    })
    .catch(function (error) {
      console.log("token not decode", error);
    });
  
}
let boolean=localStorage.getItem("token");
window.onload = function(){
  if(boolean) {
    login();
}
// else{
//   login();
// }
}
async function login() {
  // onlogin();
  console.log('login successful');
  // if(logincheck == true){
    console.log('logincheck in progress');

  await axios({
    method: "get",
    url: "http://localhost:3000/token",
  })
    .then(function (response) {
      console.log("====", response.data._id);
      let data = response.data;
      let placeholder = document.querySelector("#api");
      let api = "";

      for (let i = 0; i < data.length; i++) {
        console.log(data[i]._id);
        api += `<tr>
          <td>${data[i].name}</td>
          <td>${data[i].email}</td>
          <td>${data[i].pass}</td>
          <td><button type="button" class="btn btn-outline-secondary" onclick="remove('${data[i]._id}')" type="submit">Delete</button></td>
          <td><button type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat" onclick="edit('${data[i]._id}', '${data[i].name}','${data[i].email}','${data[i].pass}')">Edit</button></td>

          </tr>`;
      }
      placeholder.innerHTML = api;
    }
    )
  
    .catch(function (error) {
      console.log("====", error);
    });
  }



let myid = "";
function edit(w, x, y, z) {
  document.getElementById("name1").value = x;
  document.getElementById("email1").value = y;
  document.getElementById("pass1").value = z;
  // document.getElementById("auth1").value = a;

  myid = w;
}

async function update() {
  let email2 = document.getElementById("email1").value;
  let password2 = document.getElementById("pass1").value;
  let name2 = document.getElementById("name1").value;
  // let auth2 = document.getElementById("auth1").value;
  //  let body = {
  //   email: email2,
  //   pass: password2,
  //   auth: 'student',
  // };
  // console.log(body.email);
  // console.log(body.pass);
  // console.log(body.auth);
  console.log(myid);
  if(boolean){
  await axios
    .put(`http://localhost:3000/token/${myid}`, {
      email: email2,
      pass: password2,
      name: name2,
      auth: 'student',

    })
    .then((response) => {
      // if(logincheck==true){

      console.log(response);
      // }
    })
    .catch((error) => {
      console.log(error);
    });
    window.location.href = "admin.html";
  }
}

async function remove(x) {
  // if(logincheck){
  await axios
    .delete(`http://localhost:3000/token/${x}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
  window.location.href = "admin.html";
}


async function register() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;
  // let auth = document.getElementById("auth").value;
  var body = {
    email: email,
    pass: password,
    name: name,
    auth: 'student',
  };
  console.log(body.email);
  console.log(body.pass);
  console.log(body.name);
  console.log('regiister',boolean);
if(boolean){


  await axios({
    method: "post",
    url: "http://localhost:3000/token",
    data: body,
  })
    .then(function (response) {
      console.log("====", response);
    })
    .catch(function (error) {
      alert("Enter valid information this user already exist", error);
    });

  window.location.href = "admin.html";
}
else{
  alert("Please login first");
}
}




function logout() {
  localStorage.clear();
  location.href = "login.html";
}

// let user=localStorage.getItem("auth")
//     if (user === 'admin' ){
//        location.href = "admin.html";
// }
// else if (user === 'student'){
//          location.href = "student.html";
// }
// else{
//   alert("Please select role");
// }
// }

// function loginadmin(){
//   let email = document.getElementById("email").value;
//   let password = document.getElementById("pass").value;
//   let auth = document.querySelector('input[name="flexRadioDefault"]:checked').value;
//   // let data=0;
//   var body = {
//     "email": email,
//     "pass": password,
//     "auth": auth
//   };
//   console.log(body.email);
//   console.log(body.pass);
//   console.log(body.auth);

//   axios({
//       method: "post",
//       url: "http://localhost:3000/api/login",
//       data: body,
//     })
//       .then(function (response) {
//         console.log('====',response.data.token);
//         let token_decode = response.data.token;
//         return token_decode;
//       }).then(function(x){
//         let value = x;
//         console.log('value',value);
//           axios.post("http://localhost:3000/api/decode", {
//             //...data
//           }, {
//             headers: {
//               'Authorization': value
//             }
//           })
//         .then(function(response){
//           console.log("token decode",response);
//           // localStorage.setItem("auth", response.data.decoded.auth);
//           // let user=localStorage.getItem("auth")
//           console.log("user",response.data.decoded.auth);
//           if (response.data.decoded.auth === 'admin' ){
//              location.href = "admin.html";
//             // alert("admin  ");

//       }
//       else if (response.data.decoded.auth === 'student'){
//                location.href = "student.html";
//               // alert("student");

//       }
//       else{
//         alert("Please select role");
//       }

//       })

//       })
//       .catch(function (error) {
//         console.log(error);
//         alert("Please enter a valid information",error.message);
//       })

// .catch(function(error){
//     console.log('token not decode',error);
//   })
// }

// async function login() {
//   axios({
//     method: "get",
//     url: "http://localhost:3000/token",
//   })
//     .then(function (response) {
//       console.log("====", response);
//       let data = response.data;
//       let mail='';
//       let pass='';
//       let role='';
//       for (let i = 0; i < data.length; i++) {
//         console.log(data[i]);
//         mail+=data[i].email+"<br/>";
//         pass+=data[i].pass+"<br/>";
//         role+=data[i].auth+"<br/>";
//       }
//       document.getElementById("email").innerHTML = mail;
//       document.getElementById("passkey").innerHTML = pass;
//       document.getElementById("role").innerHTML = role;

//     })
//     .catch(function (error) {
//       console.log("====", error.message);
//     });
// }
// function edit() {
//   alert("click on edit");
// }
// function remove() {
//   alert("click on delete");
// }
