//Div with class id of overview
const overview = document.querySelector(".overview");
//GitHub username variable
const username = "faruk-abolurin";
//Repo-List (Unordered List)
const repoList = document.querySelector(".repo-list");
//Repo class
const allRepos = document.querySelector(".repos")
//Repo data class
const repoData = document.querySelector(".repo-data");


//Async function to fecth API data
const getData = async function () {
    const usersRequest = await fetch(`https://api.github.com/users/${username}`);
    const data = await usersRequest.json();
    console.log(data);
    displayUserInfo(data);
};

getData();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  overview.append(div);
  getRepoData();
};

//Async function to fetch repo data
const getRepoData = async function () {
    const repoRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoRequest.json();
    console.log(repoData);
    displayRepo(repoData);
};

const displayRepo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        //console.log(repoName);
        getRepo(repoName);
    }
});

//Async function to fetch specific repo
const getRepo = async function (repoName) {
    const getInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getInfo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

//Language list
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
    console.log(languages);
  }
  displayRepoInfo(repoInfo, languages);
};

//Display Repo Function
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    repoData.classList.remove("hide");
    allRepos.classList.add("hide");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);
};
