const jobsData = [
    {
        id: 0,
        title: "Pessoa desenvolvedora front-end - React",
        enterprise: "Kenzie",
        location: "Curitiba",
        descrition:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        modalities: "Hibrido",
    },
    {
        id: 1,
        title: "Pessoa desenvolvedora back-end - Node JS",
        enterprise: "Brazilians in Tech",
        location: "Rio de Janeiro",
        descrition:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        modalities: "Presencial",
    },
    {
        id: 2,
        title: "Pessoa desenvolvedora Fullstack - Node JS",
        enterprise: "Brazilians in Tech",
        location: "Rio de Janeiro",
        descrition:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        modalities: "Home Office",
    },
];

const body = document.body;

function saveVacanciesToLocalStorage(vacancies) {
    localStorage.setItem("selectedVacancies", JSON.stringify(vacancies));
}

function loadVacanciesFromLocalStorage() {
    const vacanciesSelecteds = localStorage.getItem("selectedVacancies");
    const buttons = document.querySelectorAll(".button-vacancies");
    if (vacanciesSelecteds) {
        let vacancies = JSON.parse(vacanciesSelecteds);
        vacancies.forEach((e) => {
            buttons.forEach((btn) => {
                let id = Number(btn.getAttribute("data-id"));
                if (e.id === id) {
                    btn.classList.add("active");
                    btn.innerText = "remover candidatura";
                }
            });
        });
        return JSON.parse(vacanciesSelecteds);
    }
    return [];
}

function renderHeader() {
    const header = document.createElement("header");
    const divContainer = document.createElement("div");
    const divInformation = document.createElement("div");
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    const button = document.createElement("button");

    divContainer.className = "container";
    divInformation.className = "div-information-header";
    button.className = "button-header";

    h1.innerText = "Webwomen";
    h2.innerText = "Lugar de mulher é onde ela quiser";
    p.innerText =
        "Está procurando oportunidades de estágio, emprego ou bolsas de estudo? Ou até mesmo oportunidades para atender eventos de tecnologia no Brasil e ao redor do mundo?";
    strong.innerText = "Confere aqui embaixo o que temos para você!";
    button.innerText = "ir para a seção de vagas";

    body.insertBefore(header, body.children[0]);
    header.append(divContainer);
    divContainer.append(h1, divInformation, button);
    divInformation.append(h2, p, strong);
}

function renderMain() {
    const main = document.createElement("main");
    main.className = "container";
    body.insertBefore(main, body.children[0]);
    renderHeader();
    renderListVacancies(jobsData);
    const selectedVacancies = loadVacanciesFromLocalStorage();
    renderVacanciesSelecteds(selectedVacancies);
    eventButtons(jobsData);
}

function renderListVacancies(list) {
    const main = document.querySelector("main");

    const divVacancies = document.createElement("div");
    const h2 = document.createElement("h2");
    const listVacancies = document.createElement("ul");
    const divVacanciesSelecteds = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const listSelecteds = document.createElement("ul");

    divVacancies.append(h3, p, listSelecteds);
    listSelecteds.append(p);
    divVacanciesSelecteds.append(h3, listSelecteds);

    h3.innerText = "Vagas selecionadas";
    p.innerText = "Você ainda não aplicou para nenhuma vaga";
    h2.innerText = "Vagas";
    divVacancies.className = "div-vacancies";
    listVacancies.className = "list-vacancies";
    divVacanciesSelecteds.className = "vacancies-selecteds";
    listSelecteds.className = "list-selecteds";

    list.forEach((element) => {
        const li = document.createElement("li");
        const title = document.createElement("h3");
        const divLocation = document.createElement("div");
        const institution = document.createElement("p");
        const city = document.createElement("p");
        const information = document.createElement("p");
        const divButton = document.createElement("div");
        const typeVacancie = document.createElement("p");
        const button = document.createElement("button");

        title.innerText = element.title;
        institution.innerText = element.enterprise;
        city.innerText = element.location;
        information.innerText = element.descrition;
        typeVacancie.innerText = element.modalities;
        button.innerText = "Candidatar";

        divLocation.className = "div-location";
        information.className = "text-information";
        divButton.className = "div-button";
        button.className = "button-vacancies";

        button.setAttribute("data-id", element.id);

        listVacancies.append(li);
        li.append(title, divLocation, information, divButton);
        divLocation.append(institution, city);
        divButton.append(typeVacancie, button);
    });

    divVacancies.append(h2, listVacancies);
    main.append(divVacancies);
    main.append(divVacanciesSelecteds);
}

let filteredVacancies = [];

function eventButtons(list) {
    let buttonAdd = document.querySelectorAll(".button-vacancies");

    function updateVacancies() {
        const activeButtons = document.querySelectorAll(
            ".button-vacancies.active"
        );

        filteredVacancies = [];

        activeButtons.forEach((activeButton) => {
            let id = Number(activeButton.getAttribute("data-id"));
            activeButton.innerText = "Remover candidatura";

            const selectedVacancy = list.find((vacancie) => vacancie.id === id);
            if (selectedVacancy) {
                filteredVacancies.push(selectedVacancy);
            }
        });

        renderVacanciesSelecteds(filteredVacancies);
        saveVacanciesToLocalStorage(filteredVacancies);
    }

    buttonAdd.forEach((button) => {
        button.addEventListener("click", () => {
            button.classList.toggle("active");
            if (button.classList.contains("active")) {
                button.innerText = "Remover candidatura";
            } else {
                button.innerText = "Candidatar";
            }
            updateVacancies();
        });
    });
}

function renderVacanciesSelecteds(list) {
    const ul = document.querySelector(".list-selecteds");
    ul.innerHTML = "";
    list.forEach((element) => {
        const li = document.createElement("li");
        const divTitle = document.createElement("div");
        const title = document.createElement("h2");
        const buttonDelete = document.createElement("button");
        const figure = document.createElement("figure");
        const imgTrash = document.createElement("img");
        const divLocation = document.createElement("div");
        const institution = document.createElement("p");
        const city = document.createElement("p");

        title.innerText = element.title;
        imgTrash.src = "./assets/trash.png";
        institution.innerText = element.enterprise;
        city.innerText = element.location;

        buttonDelete.setAttribute("data-id", element.id);
        buttonDelete.className = "button-remove";
        buttonDelete.addEventListener("click", () => {
            const id = Number(buttonDelete.getAttribute("data-id"));
            let vacancieIndex = filteredVacancies.findIndex(
                (vacancie) => vacancie.id === id
            );
            if (vacancieIndex !== -1) {
                filteredVacancies.splice(vacancieIndex, 1);
                const button = document.querySelector(
                    `button[data-id='${id}']`
                );
                if (button) {
                    button.innerText = "Candidatar";
                    button.classList.remove("active");
                }
            }
            renderVacanciesSelecteds(filteredVacancies);
            saveVacanciesToLocalStorage(filteredVacancies);
        });

        divTitle.className = "div-title-selecteds";
        divLocation.className = "div-location-selecteds";

        divTitle.append(title, buttonDelete);
        buttonDelete.append(figure);
        figure.append(imgTrash);
        divLocation.append(institution, city);
        li.append(divTitle, divLocation);
        ul.append(li);
    });
}

renderMain();
