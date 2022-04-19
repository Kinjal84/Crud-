// var dataEntry = [];

// createTable();
let isEdit = false;
let editIndex = -1;

function radioChange(event) {
    console.log(event.target.value, 'change');
}
createTable();

function adddata() {
    if (validateForm() === false) {
        return false;
    } else {

        let data = JSON.parse(localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : [];

        console.log("6774333");
        const Name = document.getElementById("name").value;
        const Enrollment = document.getElementById("enrollment").value;
        const Email = document.getElementById("email").value;
        const Dob = document.getElementById("dob").value;
        const Password = document.getElementById("password").value;
        const Colleges = document.getElementById("collegelist").value;
        const Year = document.querySelector('input[name=year]:checked').value;
        const checkbox = document.querySelectorAll('input[type="checkbox"]');
        var result = [];
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                result.push(checkbox[i].value);
                console.log(result);
            }
        }
        const Address = document.getElementById("address").value;
        // const Image = document.getElementById("image").value;
        // const imageElement = document.getElementById("image").files[0];
        // const Image = URL.createObjectURL(imageElement);


        console.log(Address);

        let editdata = {
            "name": Name,
            "enrollment": Enrollment,
            "email": Email,
            "dob": Dob,
            "password": Password,
            "collegelist": Colleges,
            "year": Year,
            "hobby": result,
            "address": Address,


        }
        if (isEdit) {
            isEdit = false;
            data[editIndex] = editdata;
            editIndex = -1;

        } else {

            data.push(editdata);
        }



        localStorage.setItem("data", JSON.stringify(data));
        createTable();

        return true;
    }
}


function createTable() {
    console.log("567890");
    let record = JSON.parse(localStorage.getItem('data'));
    console.log(record);
    let html = '';
    let addList = document.getElementById('storelist');
    html += `<tr>
                        <th scope="column">Sr.No</th>
                        <th scope="column">Name</th>
                        <th scope="column">Enrollment</th>
                        <th scope="column">Email</th>
                        <th scope="column">Dob</th>
                        <th scope="column">Password</th>
                        <th scope="column">College</th>
                        <th scope="column">Year</th>
                        <th scope="column">Hobby</th>
                        <th scope="column">Address</th>
                       
                      
                        <th scope="column">Action</th>
                        </tr>`

    record.forEach((element, index) => {
        html += `<tr>
                        <td scope="row" id="index">${index+1}</td>
                        <td>${element.name}</td>
                        <td>${element.enrollment}</td>
                        <td>${element.email}</td>
                        <td>${element.dob}</td>
                        <td>${element.password}</td>
                        <td>${element.collegelist}</td>
                        <td>${element.year}</td>
                        <td>${element.hobby}</td>
                        <td>${element.address}</td>
                        
 
                        <td>
                            <button type="button" class="text-primary" onclick=editBtn(${index})><i class="fa fa-edit"></i>Edit</button>
                            <button type="button" class="text-danger" onclick=deleteBtn(${index})><i class="fa fa-trash"></i>Delete</button>
                        </td>
                    </tr>`;

    });


    addList.innerHTML = html;
}


function deleteBtn(index) {
    const data = JSON.parse(localStorage.getItem('data'));
    document.getElementById("index").value = data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));
    createTable();
}

// function editBtn(index) {
//     // const data = JSON.parse(localStorage.getItem('data'));
//     // document.getElementById("index").value = data[index];


// }


function editBtn(index) {

    isEdit = true;
    editIndex = index;


    const data = JSON.parse(localStorage.getItem('data'));
    selectedIndex = index;
    document.getElementById("name").value = data[selectedIndex].name;
    document.getElementById("enrollment").value = data[selectedIndex].enrollment;
    document.getElementById("email").value = data[selectedIndex].email;
    document.getElementById("dob").value = data[selectedIndex].dob;
    document.getElementById("password").value = data[selectedIndex].password;
    document.getElementById("collegelist").value = data[selectedIndex].collegelist;
    document.getElementById(`${data[selectedIndex].year}`).checked = true;
    document.getElementById("address").value = data[selectedIndex].address;

    let result = data[selectedIndex].hobby;
    let checkboxs = document.querySelectorAll('input[type=checkbox]')
    for (let index = 0; index < checkboxs.length; index++) {
        checkboxs[index].checked = result.includes(checkboxs[index].value);
    }

    // document.getElementById("image").value = data[selectedIndex].Image;
    // console.log(result);
    createTable();

}


function reset() {
    document.getElementById("form").reset();

}




function validateForm() {
    //     console.log("gfeyu");
    //     const Name = document.getElementById('name');
    //     const erno = document.getElementById('enrollment');
    //     const email = document.getElementById('email');
    //     const Dob = document.getElementById('dob');
    //     const password = document.getElementById('password');
    //     if (document.forms["form"][name].value === "") {
    //         document.getElementById("p-name").innerHTML = "Enter name";
    //         console.log("sdgh");
    //     }
    //     if (document.forms["form"][enrollment].value === "") {
    //         document.getElementById("p-enroll").innerHTML = "Enter enrollment No";
    //     }
    //     if (document.forms["form"][email].value === "") {
    //         document.getElementById("p-email").innerHTML = "Enter Email";
    //     }
    //     if (document.forms["form"][dob].value === "") {
    //         document.getElementById("p-dob").innerHTML = "Enter BirthDate";
    //     }
    //     if (document.forms["form"][password].value === "") {
    //         document.getElementById("p-password").innerHTML = "Enter Password";
    //     }
    //     return true;


    event.preventDefault();

    var fields = ["name", "enrollment", "email", "dob", "password", "year", "collegelist", "address"]

    var i, l = fields.length;
    var fieldname;

    for (i = 0; i < l; i++) {
        fieldname = fields[i];
        if (document.forms["form"][fieldname].value === "") {
            document.getElementById("empty-msg").innerHTML = fieldname + " should not be empty";
            // alert(fieldname + " can not be empty");
            return false;
        }


    }


    // Enrollment number validation
    const erno = document.getElementById('enrollment');
    let enNo = 0;

    if (erno.value.length != 12) {
        alert("Enrollment Number must be length of 12");

        enNo = 0;
        return false
    } else {
        enNo = 1;
    }



    let pattern = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/;
    const email = document.getElementById('email');
    Email = 0;
    if (!(email.value.match(pattern))) {
        alert("Please, Enter a valid email address.");
        Email = 0;
        return false;
    } else {
        Email = 1;
    }

    //Password validation

    var upperCase = /[A-Z]/g;
    var specialChar = /[$%^&*!@]/;
    let Password = 0;

    if (password.value.length < 8) {
        alert("Password must have at least 8 characters.");
        password.focus();
        Password = 0;
        return false;
    } else if (!(password.value.match(upperCase))) {
        alert("Password must have at least one uppercase.");
        Password = 0;
        return false;
    } else if (!(password.value.match(specialChar))) {
        alert("Password must have any one of the special characters.");
        Password = 0;
        return false;
    } else {
        Password = 1;
    }


    // Birthday validation

    var today = new Date();
    var year = today.getFullYear();
    var date = dob.value.split('-');
    var age = year - date[0];;

    if (age < 18 || age > 23) {
        alert("You are not allowed to register. Your age should be between 18 to 23");
        Brithdate = 0;
        return false;
    } else {
        Brithdate = 1;
    }


    // var radioYear = document.querySelector('input[name=year]:checked');
    // if (radioYear.value === "") {
    //     alert("must select year");
    //     return false;
    // }
    return true;


}