let form = document.getElementById("add");
form.addEventListener("click", addExpense);
function addExpense(e) {
  e.preventDefault();
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  if (amount.trim() === "" || description.trim() === "") {
    alert("Please Enter Valid Text and Amount");
  } else {
    const category = document.getElementById("categories").value;
    var obj = {
      Amount: amount,
      Description: description,
      Category: category,
    };
    axios
      .post(
        "https://crudcrud.com/api/f35fff80a8324aba8c8ddcc310e87368/expense-tracker",
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
    const newBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    newBtn.className = "btn btn-danger";
    editBtn.className = "btn btn-secondary";
    newBtn.textContent = "Del";
    editBtn.textContent = "Edit";
    newBtn.onclick = () => {
      deleteUser(newElement.id);
    };
    editBtn.setAttribute("onclick", "edit(this)");
    newElement.appendChild(newBtn);
    newElement.appendChild(editBtn);
  }
  clearInputs();
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
      `https://crudcrud.com/api/f35fff80a8324aba8c8ddcc310e87368/expense-tracker/${id}`
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
      "https://crudcrud.com/api/f35fff80a8324aba8c8ddcc310e87368/expense-tracker"
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
        const newBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        newBtn.className = "btn btn-danger";
        editBtn.className = "btn btn-secondary";
        newBtn.textContent = "Del";
        editBtn.textContent = "Edit";
        newElement.id = userId;
        newBtn.onclick = () => {
          deleteUser(newElement.id);
        };
        editBtn.setAttribute("onclick", "edit(this)");
        newElement.appendChild(newBtn);
        newElement.appendChild(editBtn);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
