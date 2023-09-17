// TODO:
// To add alert/info when expiration date is close.
// mainTable
const bodyRightMain = document.querySelector("#bodyRightMain"),
  mainSearch = document.querySelector("#mainSearch"),
  mainSearchDataListSuggestions = document.querySelector(
    "#mainSearchDataListSuggestions"
  ),
  // sections
  homeSection = document.querySelector("#homeSection"),
  companySection = document.querySelector("#companySection");

class Company {
  constructor(_companyName, _companyBankAccNum, _tel) {
    this.company = _companyName;
    this.bankAccNum = _companyBankAccNum;
    this.tel = _tel;
  }
}

class Invoice extends Company {
  constructor(_companyName, _invoiceNum, _date, _sum) {
    super(_companyName);
    this.invoiceNum = _invoiceNum;
    this.sum = _sum;
    this.date = _date;
    this.paid = false;
  }
}

let allCompanies = [
  new Company("companyName", "companyBankNum123213231", "companyTElNum"),
  new Company("Kvisko", "lviskoBankNum123213231", "kviskoTElNum"),
  new Company("dugam", "dyhaBankNum123213231", "dugaTElNum"),
  new Company("Kviki", "kviki623213213", "kbiki21321132132lNum"),
  new Company(
    "Bitolska Mlekara",
    "Bitolska623213213",
    "kBitolska21321132132lNum"
  ),
  new Company("Vizijana", "Vizijana623213213", "Vizijana1321132132lNum"),
  new Company("Kumanovka", "Kumanovka623213213", "Kumanovka21321132132lNum"),
  new Company("Nestle", "Nestlei623213213", "kNestleki21321132132lNum"),
  new Company(
    "Zdravje Radovo",
    "Zdravje Radovoi623213213",
    "ZdravjeRadovo1321132132lNum"
  ),
  new Company("Eksra mein", "Eksra mein623213213", "Eksra mein1321132132lNum"),
  new Company("Mesara", "iMesara623213213", "Mesara1321132132lNum"),
  new Company("Dauti", "Dauti623213213", "kDauti21321132132lNum"),
  new Company("Kristal", "Kristal23213213", "kKristal21321132132lNum"),
  new Company("Milka", "kMilka3213", "kMilka321132132lNum"),
  new Company("Alma", "kvAlma3213213", "kbAlma21321132132lNum"),
  new Company("Dove", "kvDove13213", "kbDove21321132132lNum"),
  new Company("Izvorksa", "Izvorksa23213213", "Izvorksai21321132132lNum"),
  new Company("Dobra voda", "Dobra23213213", "Dobra21321132132lNum"),
];
let allInvoices = [
  new Invoice("Kviki", "213213231/123", "12/23/12", 1222),
  new Invoice("Kviki", "5523363213231/123", "1/3/21", 10000),
  new Invoice("Kviki", "5523383213231/123", "2/3/21", 10000),
  new Invoice("Kviki", "5523393213231/123", "1/4/21", 10000),
  new Invoice("Kviki", "55233399213231/123", "1/3/22", 10000),
  new Invoice("Kviki", "55233323213231/123", "1/3/21", 10000),
  new Invoice("Kviki", "5523332143231/123", "1/3/21", 10000),
  new Invoice("Kviki", "5523332713231/123", "1/3/21", 10000),
  new Invoice("Kviki", "552333213231/123", "1/3/21", 10000),
  new Invoice("Kviki", "5523332144673231/123", "1/3/21", 10000),
  new Invoice("Kviki", "5523334326913231/123", "1/3/21", 10000),
  new Invoice("Kviki", "55233321367876231/123", "1/3/21", 10000),
  new Invoice("Kviki", "552333945213231/123", "1/3/21", 10000),
  new Invoice("Kviki", "55233321334234231/123", "1/3/21", 10000),
  new Invoice("Kviki", "552333547213231/123", "1/3/21", 10000),
  new Invoice("Kviki", "55233321324331/123", "1/3/21", 10000),
  new Invoice("Kviki", "552333223413231/123", "1/3/21", 10000),
  new Invoice("dugam", "24300041/22", "23/11/2332", 12212),
  new Invoice("companyName", "9387231/123", "6/2/1132", 2200),
  new Invoice("Alma", "938733231/123", "6/2/1222", 2500),
];

const createCompany = (companyName, bankAcc, tel) => {
  let newCompany = new Company(companyName, bankAcc, tel);
  allCompanies.push(newCompany);
  addCompanyNameModalInput.value = "";
  addCompanyBankAccModalInput.value = "";
  addCompanyNumberModal.value = "";
  $("#addCompanyModal").modal("hide");
};

const createInvoice = (companyName, invoiceNum, date, sum) => {
  let newInvoice = new Invoice(companyName, invoiceNum, date, sum);
  allInvoices.push(newInvoice);
  selectCompanyNameInvoiceModal.value = "";
  addInvoiceNumberModal.value = "";
  addSumNumberModal.value = "";
  addInvoiceDateModal.value = "";
  $("#addInvoiceModal").modal("hide");
};

const populateInTableFnc = (
  tbody,
  companyName,
  invoiceNum = "",
  sum = "",
  date = "",
  paid = ""
) => {
  const tr = document.createElement("tr");
  const firstTd = document.createElement("td");
  firstTd.innerText = companyName;
  tr.append(firstTd);
  if (invoiceNum || sum || date || paid) {
    const secondTd = document.createElement("td");
    const thirdTd = document.createElement("td");
    const fourthTd = document.createElement("td");
    const fifthTd = document.createElement("td");

    secondTd.innerText = invoiceNum;
    thirdTd.innerText = sum;
    fourthTd.innerText = date;
    let title = "";
    let btnClass = "";
    paid === false ? (title = "Unpaid") : (title = "Paid");
    paid === false ? (btnClass = "btn-danger") : (btnClass = "btn-success");
    fifthTd.innerHTML = `
    <button class="btn btn-sm ${btnClass} paidBtns">${title}</button> `;
    tr.append(secondTd, thirdTd, fourthTd, fifthTd);
  }
  tbody.append(tr);
  return tr;
};

const paidOrNotBtnsFnc = () => {
  let paidBtns = document.querySelectorAll(".paidBtns");
  paidBtns.forEach((el) => {
    el.addEventListener("click", (e) => {
      let btnClass = e.target.classList.contains("btn-danger");
      let targetInvoiceNum =
        e.target.parentElement.previousElementSibling.previousElementSibling
          .previousElementSibling.innerText;

      let findedPaidInvoice = allInvoices.find(
        (el) => el.invoiceNum === targetInvoiceNum
      );
      let btnElement = e.target;
      const targetedBtnSpan = e.target;
      if (btnClass) {
        btnElement.classList.remove("btn-danger");
        btnElement.classList.add("btn-success");
        findedPaidInvoice.paid = true;
        targetedBtnSpan.innerText = "Paid";
      } else {
        btnElement.classList.remove("btn-success");
        btnElement.classList.add("btn-danger");
        findedPaidInvoice.paid = false;
        targetedBtnSpan.innerText = "Unpaid";
      }
    });
  });
};

const filterArrByStrFnc = (str, parent) => {
  let filteredArr = allCompanies.filter((el) =>
    el.company.toLowerCase().includes(str)
  );

  filteredArr.forEach((el) => {
    const option = document.createElement("option");
    option.value = el.company;
    parent.append(option);
  });
};

const populatingLeftTableFnc = () => {
  allCompanies.forEach((el) => {
    populateInTableFnc(bodyLeftCompanyTable, el.company);
  });
};

const populatingInvoicesFnc = () => {
  allInvoices.forEach((el) => {
    populateInTableFnc(
      bodyRightMain,
      el.company,
      el.invoiceNum,
      el.sum,
      el.date,
      el.paid
    );
  });
};
const onHashChangeHandler = () => {
  if (location.hash === "") {
    homeSection.style.display = "block";
    companySection.style.display = "none";
  } else {
    companySection.style.display = "block";
    homeSection.style.display = "none";
  }
};

const givingCssToErrorInputs = (inputField, message) => {
  if (inputField.attributes.type.value === "number") {
    if (inputField.value.trim() === "") {
      inputField.nextElementSibling.innerText = message;
      inputField.classList.add("is-invalid");
      inputField.classList.remove("is-valid");
      return;
    } else {
      if (inputField.value.length < 10 && !isNaN(inputField.value)) {
        inputField.nextElementSibling.innerText = "Enter Min 10 characters";
        inputField.classList.add("is-invalid");
        inputField.classList.remove("is-valid");

        return;
      } else {
        inputField.nextElementSibling.innerText = "";
        inputField.classList.add("is-valid");
        inputField.classList.remove("is-invalid");
      }
    }
  } else if (inputField.attributes.type.value === "tel") {
    if (inputField.value.trim() === "") {
      inputField.nextElementSibling.innerText = message;
      inputField.classList.add("is-invalid");
      inputField.classList.remove("is-valid");

      return;
    } else {
      if (inputField.value.length < 5) {
        inputField.nextElementSibling.innerText = "Enter Min 5 characters";
        inputField.classList.add("is-invalid");
        inputField.classList.remove("is-valid");

        return;
      } else {
        inputField.nextElementSibling.innerText = "";
        inputField.classList.add("is-valid");
        inputField.classList.remove("is-invalid");
      }
    }
  } else {
    if (inputField.value.trim() === "") {
      inputField.nextElementSibling.innerText = message;
      inputField.classList.add("is-invalid");
      inputField.classList.remove("is-valid");
    } else {
      if (inputField.value.length < 3) {
        inputField.nextElementSibling.innerText = "Enter Min 3 characters";
        inputField.classList.add("is-invalid");
        inputField.classList.remove("is-valid");
      } else {
        inputField.nextElementSibling.innerText = "";
        inputField.classList.add("is-valid");
        inputField.classList.remove("is-invalid");
      }
    }
  }
};
let allSortIcons = document.querySelectorAll(".fa-sort");

const sortingMainTableFnc = () => {
  allSortIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      let clickedIcon = e.target.previousSibling.textContent;
      bodyRightMain.innerHTML = "";
      if (clickedIcon == "Company ") {
        allInvoices.sort((a, b) => {
          const companyA = a.company.toUpperCase();
          const companyB = b.company.toUpperCase();
          if (companyA < companyB) {
            return -1;
          }
          if (companyA > companyB) {
            return 1;
          }
          return 0;
        });
      } else if (clickedIcon == "Sum ") {
        allInvoices.sort((a, b) => {
          const companyA = a.sum;
          const companyB = b.sum;
          if (companyA > companyB) {
            return -1;
          }
          if (companyA < companyB) {
            return 1;
          }
          return 0;
        });
      } else if (clickedIcon == "Expiration Date ") {
        allInvoices.sort((a, b) => {
          const dateA = new Date(
            a.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")
          ).getTime();

          const dateB = new Date(
            b.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")
          ).getTime();
          return dateA - dateB;
        });
      } else {
        allInvoices.sort((a, b) => {
          const companyA = a.paid;
          const companyB = b.paid;

          if (companyA < companyB) {
            return -1;
          }
          if (companyA > companyB) {
            return 1;
          }
          return 0;
        });
      }
      populatingInvoicesFnc();
      paidOrNotBtnsFnc();
    });
  });
};
sortingMainTableFnc();
mainSearch.addEventListener("input", () => {
  mainSearchDataListSuggestions.innerHTML = "";
  filterArrByStrFnc(mainSearch.value, mainSearchDataListSuggestions);
});

selectCompanyNameInvoiceModal.addEventListener("input", () => {
  invoiceDataListSuggestions.innerHTML = "";
  filterArrByStrFnc(
    selectCompanyNameInvoiceModal.value,
    invoiceDataListSuggestions
  );
});

mainSearch.addEventListener("input", () => {
  let filteredMainInvoices = allInvoices.filter((el) => {
    return el.company.toLowerCase().includes(mainSearch.value);
  });
  bodyRightMain.innerHTML = "";
  filteredMainInvoices.forEach((el) => {
    populateInTableFnc(
      bodyRightMain,
      el.company,
      el.invoiceNum,
      el.sum,
      el.date,
      el.paid
    );
  });
  paidOrNotBtnsFnc();
});

window.addEventListener("load", populatingInvoicesFnc);
window.addEventListener("load", paidOrNotBtnsFnc);
window.addEventListener("load", populatingLeftTableFnc);
window.addEventListener("hashchange", onHashChangeHandler);
window.addEventListener("load", onHashChangeHandler);
