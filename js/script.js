//Div with class id of overview
const overview = document.querySelector(".overview");
//GitHub username variable
const username = "faruk-abolurin";
//Repo-List (Unordered List)
const repoList = document.querySelector(".repo-list");


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
    displayRepoInfo(repoData);
};

const displayRepoInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

