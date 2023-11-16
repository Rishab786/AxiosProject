let form = document.getElementById("add");
form.addEventListener("click", addExpense);
function addExpense(e) {
  e.preventDefault();
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("categories").value;
  if (amount.trim() === "" || description.trim() === "") {
    alert("Please Enter Valid Text and Amount");
  } else {
    var obj = {
      Amount: amount,
      Description: description,
      Category: category,
    };
    axios
      .post(
        "https://crudcrud.com/api/bf4fb13dc7ee49b98d8de2eb267b4e1b/expense-tracker",
        obj
      )
      .then(function (value) {
        console.log(value);
      })
      .catch(function (error) {
        console.log(error);
      });
    const component = document.getElementById("uList");
    const newElement = document.createElement("li");
    newElement.className = "fs-5";
    newElement.innerHTML = `${description}  ${amount}  ${category}  `;
    component.appendChild(newElement);
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger";
    editBtn.className = "btn btn-secondary";
    deleteBtn.textContent = "Del";
    editBtn.textContent = "Edit";
    deleteBtn.onclick = () => {
      deleteUser(newElement.id);
    };
    editBtn.onclick = () => {
      editUser(newElement.id);
    };
    newElement.appendChild(deleteBtn);
    newElement.appendChild(editBtn);
  }
  clearInputs();
}
function editUser(id) {
   
  axios
    .get(
        `https://crudcrud.com/api/bf4fb13dc7ee49b98d8de2eb267b4e1b/expense-tracker/${id}`
    )
    .then(function (resolve) {
     
      const amount = resolve.data.Amount;
      const description = resolve.data.Description;
      document.getElementById("amount").value = amount;
      document.getElementById("description").value = description;
      deleteUser(id);
      
    })
    .catch(function (error) {
      console.log(error);
    });
    
}
function clearInputs() {
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
}
window.addEventListener("DOMContentLoaded", function () {
  displaySavedData();
});
function deleteUser(id) {
  axios
    .delete(
      `https://crudcrud.com/api/bf4fb13dc7ee49b98d8de2eb267b4e1b/expense-tracker/${id}`
    )
    .then(function () {
      console.log("deleted");
    })
    .catch(function (error) {
      console.log("Something went wrong");
    });
}
function displaySavedData() {
  axios
    .get(
      "https://crudcrud.com/api/bf4fb13dc7ee49b98d8de2eb267b4e1b/expense-tracker"
    )
    .then(function (response) {
      const arr = response.data;
      for (let i = 0; i < arr.length; i++) {
        const userId = arr[i]._id;
        const amount = arr[i].Amount;
        const description = arr[i].Description;
        const category = arr[i].Category;
        const component = document.getElementById("uList");
        const newElement = document.createElement("li");
        newElement.className = "fs-5";
        newElement.innerHTML = `${description}  ${amount} ${category}  `;
        component.appendChild(newElement);
        const deleteBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger";
        editBtn.className = "btn btn-secondary";
        deleteBtn.textContent = "Del";
        editBtn.textContent = "Edit";
        newElement.id = userId;
        deleteBtn.onclick = () => {
          deleteUser(newElement.id);
        };
        editBtn.onclick = () => {
          editUser(newElement.id);
        };
        newElement.appendChild(deleteBtn);
        newElement.appendChild(editBtn);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
