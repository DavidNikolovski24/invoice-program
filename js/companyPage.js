const blancH1 = document.querySelector("#blancH1"),
  blancBankAcc = document.querySelector("#blancBankAcc"),
  blancTel = document.querySelector("#blancTel"),
  blancUl = document.querySelector("#blancUl"),
  blancPageBackBtn = document.querySelector("#blancPageBackBtn"),
  blancPageEditBtn = document.querySelector("#blancPageEditBtn"),
  blancPageDeleteBtnOpenModal = document.querySelector(
    "#blancPageDeleteBtnOpenModal"
  ),
  blancPageDeleteBtnOpenModalDiv = document.querySelector(
    "#blancPageDeleteBtnOpenModalDiv"
  ),
  blancPageDeleteBtn = document.querySelector("#blancPageDeleteBtn");

const openBlancModal = (e) => {
  blancUl.innerHTML = "";
  const clicked = e.target.innerText.toLowerCase(),
    clickedCompamny = allCompanies.find(
      (el) => el.company.toLowerCase() === clicked
    );

  location.hash = clicked;
  blancH1.innerText = clickedCompamny.company;
  blancBankAcc.innerText = ` ${clickedCompamny.bankAccNum}`;
  blancTel.innerText = ` ${clickedCompamny.tel}`;

  let filteredArr = allInvoices.filter(
    (el) => el.company === clickedCompamny.company
  );
  filteredArr.forEach((el) => {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      el.paid ? "list-group-item-success" : "list-group-item-danger"
    );
    li.innerHTML = `${el.company} || Invoice Number: ${el.invoiceNum} || Sum: ${
      el.sum
    } || Expiration Date: ${el.date} || Paid: 
      ${el.paid ? `<b>Paid</b>` : `<b>Unpaid</b>`}`;
    blancUl.append(li);
  });
};

let foundIndex;
const deleteCompanyFnc = (e) => {
  let blancCompanyName =
    e.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.innerText;
  foundIndex = allCompanies.findIndex((el) => el.company === blancCompanyName);
};

blancPageDeleteBtn.addEventListener("click", () => {
  let foundedCompany = allCompanies[foundIndex].company;
  allCompanies.splice(foundIndex, 1);
  for (let i = allInvoices.length - 1; i >= 0; i--) {
    let el = allInvoices[i];
    if (el.company === foundedCompany) {
      allInvoices.splice(i, 1);
    }
  }
  $("#blancPageDeleteBtnOpenModalDiv").modal("hide");
  location.hash = "";
  bodyLeftCompanyTable.innerHTML = "";
  bodyRightMain.innerHTML = "";
  populatingLeftTableFnc();
  populatingInvoicesFnc();
  paidOrNotBtnsFnc();
});
const editCompanyInfo = (e) => {
  let blancCompanyName =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling,
    blancCompanyOldAccNum =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .lastChild,
    blancCompanyOldAccNumVal = blancCompanyOldAccNum.innerText,
    blancCompanyOldTelNum =
      e.target.parentElement.previousElementSibling.lastChild,
    blancCompanyOldTelNumVal = blancCompanyOldTelNum.innerText;

  if (e.target.innerText === "Edit Company") {
    e.target.innerText = "Save Changes";
    e.target.classList.remove("btn-warning");
    e.target.classList.add("btn-success");
    blancCompanyOldAccNum.innerHTML = "";
    blancCompanyOldTelNum.innerHTML = "";
    const inputCompanyOldAccNum = document.createElement("input"),
      inputCompanyOldTelNum = document.createElement("input");
    inputCompanyOldAccNum.classList.add("form-control");
    inputCompanyOldTelNum.classList.add("form-control");
    inputCompanyOldAccNum.setAttribute("type", "text");
    inputCompanyOldTelNum.setAttribute("type", "text");
    inputCompanyOldAccNum.value = blancCompanyOldAccNumVal;
    inputCompanyOldTelNum.value = blancCompanyOldTelNumVal;
    blancCompanyOldAccNum.append(inputCompanyOldAccNum);
    blancCompanyOldTelNum.append(inputCompanyOldTelNum);
  } else {
    let blancCompanyNewAccNum = blancCompanyOldAccNum.lastChild.value,
      blancCompanyNewTelNum = blancCompanyOldTelNum.lastChild.value;

    if (blancCompanyNewAccNum === "" || blancCompanyNewTelNum === "") {
      alert("You cant save with empty inputs");
      return;
    }
    e.target.innerText = "Edit Company";
    e.target.classList.add("btn-warning");
    e.target.classList.remove("btn-success");

    let findedCompany = allCompanies.find(
      (el) => el.company === blancCompanyName.innerText
    );

    blancCompanyOldAccNum.innerText = blancCompanyNewAccNum.toLowerCase();
    blancCompanyOldTelNum.innerText = blancCompanyNewTelNum.toLowerCase();

    findedCompany.bankAccNum = blancCompanyNewAccNum;
    findedCompany.tel = blancCompanyNewTelNum;
  }
  window.onhashchange = function () {
    e.target.innerText = "Edit Company";
    e.target.classList.remove("btn-success");
    e.target.classList.add("btn-warning");
  };
};
bodyLeftCompanyTable.addEventListener("click", openBlancModal);
blancPageDeleteBtnOpenModal.addEventListener("click", deleteCompanyFnc);
blancPageEditBtn.addEventListener("click", editCompanyInfo);
