const addCompanyNameModalInput = document.getElementById("addCompanyNameModal"),
  addCompanyBankAccModalInput = document.getElementById(
    "addCompanyBankAccModal"
  ),
  addCompanyNumberModal = document.getElementById("addCompanyNumberModal"),
  addCompanyModalBtn = document.getElementById("addCompanyModalBtn"),
  bodyLeftCompanyTable = document.getElementById("bodyLeftCompanyTable"),
  addCompanyModal = document.getElementById("addCompanyModal"),
  formAddCompany = document.querySelector("#formAddCompany");

addCompanyModalBtn.addEventListener("click", () => {
  givingCssToErrorInputs(addCompanyNameModal, "Enter Company Name");
  givingCssToErrorInputs(addCompanyBankAccModal, "Enter Bank Account Number");
  givingCssToErrorInputs(addCompanyNumberModal, "Enter Company Tel Number");

  if (
    addCompanyNameModal.classList.contains("is-invalid") ||
    addCompanyBankAccModal.classList.contains("is-invalid") ||
    addCompanyNumberModal.classList.contains("is-invalid")
  ) {
    return;
  } else {
    bodyLeftCompanyTable.innerHTML = "";
    createCompany(
      addCompanyNameModalInput.value.toLowerCase(),
      addCompanyBankAccModalInput.value.toLowerCase(),
      addCompanyNumberModal.value.toLowerCase()
    );
    populatingLeftTableFnc();
  }
});
$("#addCompanyModal").on("hidden.bs.modal", function () {
  addCompanyNameModalInput.classList.remove("is-valid") ||
    addCompanyNameModalInput.classList.remove("is-invalid");
  addCompanyBankAccModal.classList.remove("is-valid") ||
    addCompanyBankAccModal.classList.remove("is-invalid");
  addCompanyNumberModal.classList.remove("is-valid") ||
    addCompanyNumberModal.classList.remove("is-invalid");
  $(".error").empty();

  addCompanyNameModalInput.value = "";
  addCompanyBankAccModal.value = "";
  addCompanyNumberModal.value = "";
});
