const selectCompanyNameInvoiceModal = document.querySelector(
    "#selectCompanyNameInvoiceModal"
  ),
  invoiceDataListSuggestions = document.querySelector(
    "#invoiceDataListSuggestions"
  ),
  addInvoiceModalBtn = document.querySelector("#addInvoiceModalBtn"),
  addInvoiceNumberModal = document.querySelector("#addInvoiceNumberModal"),
  addSumNumberModal = document.querySelector("#addSumNumberModal"),
  addInvoiceDateModal = document.querySelector("#addInvoiceDateModal"),
  addInvoiceModal = document.querySelector("#addInvoiceModal"),
  addInvoiceForm = document.querySelector("#addInvoiceForm");

addInvoiceModalBtn.addEventListener("click", () => {
  givingCssToErrorInputs(selectCompanyNameInvoiceModal, "Select Company Name");
  givingCssToErrorInputs(addInvoiceNumberModal, "Enter Invoice Number");
  givingCssToErrorInputs(addSumNumberModal, "Enter Sum");

  let findedCompany = allCompanies.find(
    (el) =>
      el.company.toLowerCase() ===
      selectCompanyNameInvoiceModal.value.toLowerCase()
  );

  if (
    selectCompanyNameInvoiceModal.classList.contains("is-invalid") ||
    addInvoiceNumberModal.classList.contains("is-invalid") ||
    addSumNumberModal.classList.contains("is-invalid") ||
    isNaN(addSumNumberModal.value) ||
    findedCompany === undefined
  ) {
    addSumNumberModal.value = "";
    addSumNumberModal.classList.remove("is-valid");
    addSumNumberModal.classList.add("is-invalid");
    selectCompanyNameInvoiceModal.value = "";
    selectCompanyNameInvoiceModal.classList.remove("is-valid");
    selectCompanyNameInvoiceModal.classList.add("is-invalid");
    return;
  } else {
    bodyRightMain.innerHTML = "";
    createInvoice(
      selectCompanyNameInvoiceModal.value,
      addInvoiceNumberModal.value,
      addInvoiceDateModal.value,
      addSumNumberModal.value
    );
    populatingInvoicesFnc();

    paidOrNotBtnsFnc();
  }
});
$("#addInvoiceModal").on("hidden.bs.modal", function () {
  selectCompanyNameInvoiceModal.classList.remove("is-valid") ||
    selectCompanyNameInvoiceModal.classList.remove("is-invalid");

  addInvoiceNumberModal.classList.remove("is-valid") ||
    addInvoiceNumberModal.classList.remove("is-invalid");

  addSumNumberModal.classList.remove("is-valid") ||
    addSumNumberModal.classList.remove("is-invalid") ||
    $(".error").empty();

  selectCompanyNameInvoiceModal.value = "";
  addInvoiceNumberModal.value = "";
  addSumNumberModal.value = "";
});
blancPageBackBtn.addEventListener("click", () => {
  location.hash = "";
});
