// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
  import { getDatabase ,
ref ,
set ,
push ,
onChildAdded ,
remove} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAEx5b4aJTWboF318uDfQMiDT-3VZY-XR8",
    authDomain: "todo-app-with-database-407f6.firebaseapp.com",
    projectId: "todo-app-with-database-407f6",
    storageBucket: "todo-app-with-database-407f6.appspot.com",
    messagingSenderId: "654933090354",
    appId: "1:654933090354:web:4e15a81b7aaa2f77529c2b",
    measurementId: "G-0Y3THBH1P8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase();


  
  // =============================================================================================
// =============================================================================================
// ============================================================================================
var inp = document.getElementById('inp')

window.addTask = function () {
    var idref = push(ref(database,'Todos/')).key
    var obj = {
        input: inp.value,
        id : idref
    }
    var todoref = ref(database,`Todos/${idref}/`)
    set(todoref,obj)    
    inp.value = "";  
    window.location.href ="./index.html"

    }
    
    
    
    var ul = document.getElementById('ul')
    var arry = []   ;
    function nowValue (){
        var todoref = ref(database,'Todos/')
        onChildAdded(todoref,function (pushDataGet){
            
            var data = pushDataGet.val()
            arry.push(data)
            
            ul.innerHTML = "";
            for(var i  = 0; i < arry.length ; i++){
                ul.innerHTML += ` <li id ="li">${arry[i].input}
                <button class="del" onclick="clearVal('${arry[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                <button class="edit" onclick="editVal('${arry[i].input}','${arry[i].id}')"><i class="fa-solid fa-pen-to-square"></i></button>
               </li>`   
            }
        })
        window.editVal = function (value ,id) {   
            inp.value = value  
            remove(ref(database,`Todos/${id}`))
            // ul.innerHTML = ""
            
        }
        window.clearVal = function(id,This) {
            remove(ref(database,`Todos/${id}`))
            // ul.innerHTML = ""
            window.location.href ="./index.html"
            // location.reload()
            
        }
        window.delAll = function (){
            remove(ref(database,"Todos"))
        ul.innerHTML = " "            
            
            window.location.href ="./index.html"
        }
    }
    nowValue()