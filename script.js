let searchBtn = document.querySelector(".search-btn");
let usernameInput = document.querySelector(".username-input");
let card = document.querySelector(".profile-card");



function getProfileData(username) {
    return fetch(`https://api.github.com/users/${username}`).then((raw) => {
      if (!raw.ok) {
        throw new Error("User not found");
      }
      return raw.json();
    });
  }
  
  function getRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((raw) => {
      if (!raw.ok) {
        throw new Error("Failed to fetch repos.");
      }
      return raw.json();
    });
  }

  function profiledata(details) {

    let data =`   <img 
              src="${details.avatar_url}"
              alt="Profile Avatar" 
              class="w-32 h-32 rounded-full border-4 border-blue-600"
            />
            <div class="text-center md:text-left">
              <h2 class="text-2xl font-bold">${details.name}</h2>
              <p class="text-gray-400">${details.bio}</p>
              <div class="mt-4 text-sm space-y-1">
                <p><span class="font-semibold">Followers:</span> ${details.followers}</p>
                <p><span class="font-semibold">Following:</span> ${details.following}</p>
                <p><span class="font-semibold">Public Repos:</span> ${details.public_repos}</p>
                <p><span class="font-semibold">${details.location}</p>
              </div>
            </div>`;
    
            card.innerHTML = data;
    
  }
  

  
  searchBtn.addEventListener("click", function (event) {
    event.preventDefault(); // prevent form submission
    const username = usernameInput.value.trim();
  
    if (username.length > 0) {
      getProfileData(username)
        .then((data) => {
          profiledata(data);
        })
        .catch((err) => {
          card.innerHTML = `<p class="text-red-500 font-semibold">⚠️ ${err.message}</p>`;
        });
    } else {
      card.innerHTML = `<p class="text-red-500 font-semibold">⚠️ Please enter a GitHub username.</p>`;
    }
  });
  
  


