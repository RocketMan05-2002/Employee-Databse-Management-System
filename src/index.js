/*
In JavaScript, IIFE stands for "Immediately Invoked Function Expression". 
It's a function that runs as soon as it's defined. IIFEs are useful for creating private scopes, 
encapsulating variables, and more.
*/

// (async function () {

//     const response = await fetch('./src/data.json');
//     const data = await response.json();
//     console.log(data);
//     let employees = data;
//     let selectedEmployeeId = employees[0].id;
//     let selectedEmployee = employees[0];

//     const employeeList = document.querySelector('.employee__names--list');
//     const employeeInfo = document.querySelector('.employee__single--info');

//     // render employees.
//     const renderEmployees = () =>{
//         employeeList.innerHTML = "";
//         employees.forEach((emp) => {
//             const employee = document.createElement("span");
//             employee.classList.add("employee__names--item");
//             if(parseInt(selectedEmployeeId,10)===emp.id){
//                 employee.classList.add("selected");
//                 selectedEmployee = emp;
//             }
//             employee.setAttribute("id",emp.id);
//             employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDe">&times;</i>`
//             employeeList.append(employee);
//         });
//     };

//     renderEmployees();
// })();

(async function() {
    const response = await fetch('./src/data.json');
    const data = await response.json();
    console.log(data);

    let employees = data;
    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];

    const employeeList = document.querySelector('.employee__names--list');
    const employeeInfo = document.querySelector('.employee__single--info');

    // select employee Logic
    employeeList.addEventListener("click",(e)=>{
        if(e.target.tagName === 'SPAN' && selectedEmployeeId !== e.target.id) {
            selectedEmployeeId = e.target.id;
            renderEmployees();
            renderSingleEmployee();
        }
    })

    //Add employee logic
    const createEmployee = document.querySelector(".createEmployee");
    const addEmployeeModal = document.querySelector(".addEmployee");
    const addEmployeeForm = document.querySelector(".addEmployee_create");

    createEmployee.addEventListener("click",()=>{
        addEmployeeModal.style.display = "flex";
    });
    addEmployeeModal.addEventListener("click",(e)=>{
        if(e.target.className === "addEmployee"){
            addEmployeeModal.style.display = "none";
        }
    });

    const dobInput  = document.querySelector(".addEmployee_create--dob");
    dobInput.ax = `${new Date().getFullYear()-18}`;


    addEmployeeForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const formData = new FormData(addEmployeeForm);
        const values = [...formData.entries()];
        console.log(values);
        let empData = {}
        values.forEach((val)=>{
            empData[val[0]] =val[1];
        })
        empData.id = employees[employees.length-1].id+1;
    })

    const renderEmployees = () =>{
        employeeList.innerHTML = ""
        employees.forEach((emp)=>{
            const employee = document.createElement("span");
            employee.classList.add("employee__names--item");
            if(parseInt(selectedEmployeeId,10) === emp.id){
                employee.classList.add("selected");
                selectedEmployee = emp;
            }
            employee.setAttribute("id",emp.id);
            employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="deleteEmployee">❌</i>`;
            employeeList.append(employee);
        })
    };

    //render single Employee

    const renderSingleEmployee = () =>{
        employeeInfo.innerHTML = `
        <img src="${selectedEmployee.imageUrl}" />
        <span class="employees__single--heading">
        ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
        </span>
        <span>${selectedEmployee.address}</span>
        <span>${selectedEmployee.email}</span>
        <span>Mobile - ${selectedEmployee.contactNumber}</span>
        <span>DOB - ${selectedEmployee.dob}</span>
        `
    }

    if(selectedEmployee) renderSingleEmployee();
    renderEmployees();
})();