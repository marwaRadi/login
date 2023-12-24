const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const birthYear = document.querySelector("#birthYear");
const Country = document.querySelector("#Country");
const createAccountBtn = document.querySelector("#createAccount");
let lNameMassage = document.querySelector("#lNameMassage"),
  fNameMassage = document.querySelector("#fNameMassage"),
  countyMassage = document.querySelector("#countyMassage");
const requirementList = document.querySelectorAll(".requirements li");

// console.log(
//   firstName,
//   lastName,
//   email,
//   password,
//   birthYear,
//   Country,
//   createAccountBtn
// );
let userInfo;
//!!!!!!!!!!!!!!!!!!!!!!! localStorage !!!!!!!!!!!!!!!!!!!!!/
if (localStorage.getItem("userInfo") != null) {
  userInfo = JSON.parse(localStorage.getItem("userInfo"));
} else {
  userInfo = [];
}
//^^^^^^^^^^^^^^^^^^^^^^ get data function ^^^^^^^^^^^^^^^^^^^^^^^^
createAccountBtn.addEventListener("click", getUserData);

function getUserData() {
  if (
    firstName.value != "" &&
    lastName.value != "" &&
    email.value != "" &&
    password.value != "" &&
    birthYear.value != "" &&
    Country.value != ""
  ) {
    let userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      birthYear: birthYear.value,
      Country: Country.value,
    };
    console.log("true");
    userInfo.push(userData);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    birthYear.classList.remove("is-invalid");
    createAccountBtn.setAttribute("href", "index.html");
  } else {
    const inputs = document.querySelectorAll("#boxInput input:not(#birthYear)");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.add("is-invalid");
    }
  }

  clearInputData();
}

//^^^^^^^^^^^^^^^^^^^^^^ clear data function ^^^^^^^^^^^^^^^^^^^^^^^^

function clearInputData() {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  birthYear.value = "";
  Country.value = "";
}
//^^^^^^^^^^^^^^^^^^^^^^ validation function ^^^^^^^^^^^^^^^^^^^^^^^^
// ??????????????????? name and country validation ?????????????????????/
firstName.addEventListener("keyup", function (e) {
  validationName(e, fNameMassage, firstName);
});
lastName.addEventListener("keyup", function (e) {
  validationName(e, lNameMassage, lastName);
});
Country.addEventListener("keyup", function (e) {
  validationName(e, countyMassage, Country);
});

function validationName(e, massage, input) {
  const currentValue = e.target.value;
  const regex = /^[a-zA-Z]{2,8}[^ ]\D$/g;

  if (regex.test(currentValue) == true) {
    if (currentValue != "") {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
      massage.classList.replace("d-none", "d-block");
      massage.innerHTML = `<p class="text-success"> valid name 👌</P>`;
      return true;
    } else {
      massage.classList.replace("d-block", "d-none");
      input.classList.replace("is-valid", "is-invalid");
    }
  } else {
    if (currentValue === "") {
      massage.innerHTML = `You must enter at least 4 to 10 characters and u cant enter numbers`;
      input.classList.replace("is-valid", "is-invalid");
      return false;
    } else {
      if (currentValue.length > 8) {
        massage.innerHTML = ` <p class="text-danger"> You can only enter 11 characters  🫷</p> `;
        input.classList.replace("is-valid", "is-invalid");
      } else if (currentValue.value < 2) {
        massage.innerHTML = ` <p class="text-danger"> You must enter at least 4 to 10 characters and u cant enter numbers </p> `;
      }
      return false;
    }
  }
}

// ??????????????????? email validation ?????????????????????/
email.addEventListener("keyup", function () {
  emailValidation();
});

function emailValidation() {
  // !!!!!!!!!!!!!!!!!! check email !!!!!!!!!!!!!!!!!!!!!!!!/
  let checkEmail = userInfo.some(function (e) {
    return e.email.includes(email.value);
  });

  const emailMassage = document.querySelector("#emailMassage");
  const regex = /^[\w]+@[a-zA-Z]{1,15}\.[a-zA-z]{2,3}$/gm;
  const currentValue = email.value;
  for (let i = 0; i < userInfo.length; i++) {
    if (checkEmail != true && regex.test(currentValue) === true) {
      if (currentValue != "") {
        email.classList.add("is-valid");
        email.classList.remove("is-invalid");
        emailMassage.classList.replace("d-none", "d-block");
        emailMassage.innerHTML = `<p class="text-capitalize text-success">valid email </P>`;
        console.log("true", checkEmail, "check");
      } else {
        emailMassage.classList.replace("d-none", "d-block");
        email.classList.replace("is-valid", "is-invalid");
        console.log("invalid");
      }
    } else {
      if (currentValue == "") {
        email.classList.replace("is-valid", "is-invalid");
        emailMassage.innerHTML = `<p class="text-capitalize text-danger"> Please enter email </p>`;
      } else {
        if (checkEmail == true) {
          emailMassage.classList.replace("d-none", "d-block");
          emailMassage.innerHTML = `<p class="text-capitalize text-danger"> Please enter another email </p>`;
          console.log("false");
        } else {
          emailMassage.classList.replace("d-none", "d-block");
          emailMassage.innerHTML = `<p class="text-lowercase"> Ex/ name@yahoo.com </p>`;
        }
      }
    }
  }
}

// ??????????????????? password validation ?????????????????????/

const requirements = [
  { regex: /.{8,14}/, index: 0 },
  { regex: /[0-9]/, index: 1 },
  { regex: /[a-z]/, index: 2 },
  { regex: /[^a-zA-Z0-9]/, index: 3 },
  { regex: /[A-Z]/, index: 4 },
];

password.addEventListener("keyup", function (e) {
  for (let i = 0; i < requirements.length; i++) {
    // const iconCheck = document.querySelector("#check");
    const massage = document.querySelector("#passwordTipInfo");
    const isValid = requirements[i].regex.test(e.target.value);
    console.log(isValid);
    const requirementItem = requirementList[requirements[i].index];
    console.log(requirementItem);
    if (isValid && password.value != "") {
      requirementItem.firstElementChild.className = "fa-solid fa-check me-2";
      massage.classList.replace("d-none", "d-block");
    } else {
      massage.classList.replace("d-block", "d-none");

      requirementItem.firstElementChild.className = "fa-solid fa-circle me-2";
    }
  }
});
