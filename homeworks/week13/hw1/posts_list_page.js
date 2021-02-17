const content_type = "application/json";
let API_URL = "https://student-json-api.lidemy.me";
let isLogin = false;

function getPostsByPage() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", `${API_URL}/posts?_sort=id&_order=desc&_expand=user`, true);
	xhr.setRequestHeader("content-type", content_type);
	xhr.onload = function () {
		if (xhr.status >= 200 && xhr.status < 400) {
			var result = JSON.parse(xhr.response);
			console.log(result);
			for (let i = 0; i < result.length; i++) {
				let element = document.createElement("li");
				element.classList.add("main_post_list");
				element.innerHTML = `
        <div class="post_list_content">
          <div class="post_content_top">
            <img class="avatar" src="./photo/user-circle.svg" />
            <div class="user_info">
              <span class="nickname"
                >${result[i].user.nickname}</span
              >
              <span class="create_time">${new Date(
								result[i].createdAt
							).toLocaleString()}</span>
            </div>
          </div>
          <div>
            <p class="post_list_title">
            ${result[i].title}
            </p>
          </div>
          <button class="more_button">
            <a href="./single_post.html?id=${
							result[i].id
						}"><div class="more_btn">閱讀全文</div></a>
          </button>
        </div>
        `;
				document.querySelector(".main_inner").appendChild(element);
			}
		}
	};
	xhr.send();
}

getPostsByPage();

/*
監聽navbar功能列的logout
清空token和nickname資料
重新整理
*/
document.querySelector(".nav_title").addEventListener("click", (e) => {
	console.log(e.target);
	const target = e.target.getAttribute("class");
	console.log(target);
	if (target === "nav_logout") {
		localStorage.setItem("token", ""); /*清空token資料*/
		nickname = ""; /*清空nickname資料*/
		window.location.replace("index.html"); /*返回首頁*/
	}
});

/*拿token取得使用者資料 */
function getMe(token) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", `${API_URL}/me`, true);
	xhr.setRequestHeader("authorization", `Bearer ${token}`);
	xhr.onload = function () {
		if (xhr.status >= 200 && xhr.status < 400) {
			var result = JSON.parse(xhr.response); /*json文字轉成物件*/
			//console.log(result);
			if (result.ok === 1) {
				isLogin = true;
				nickname = result.data.nickname;
				//console.log(nickname);
			} else {
				isLogin = false;
			}
		}
		setNavbar();
	};
	xhr.send();
}
/*整個瀏覽器剛載入的時候，利用localstorage拿出的token取得使用者資料 */
let token = localStorage.getItem("token");
getMe(token);

/*確認使用者登入/登出狀態，動態產生對應的navbar的功能列*/
function setNavbar() {
	let create_post = document.createElement("li");
	let register = document.createElement("li");
	let login = document.createElement("li");
	let logout = document.createElement("li");
	let backstage = document.createElement("li");

	if (isLogin === false) {
		register.innerHTML = `
    <a href="./register_page.html" class="nav_register">註冊</a>
	`;
		logout.innerHTML = `
	  <a href="./login_page.html" class="nav_login">登入</a>
	`;
	} else if (isLogin === true) {
		create_post.innerHTML = `
	  <a href="./create_post.html" class="nav_create_posts">新增文章</a>
	`;
		login.innerHTML = `
    <a href="#" class="nav_logout">登出</a>
  `;
		backstage.innerHTML = `
	  <a href="./backstage_page.html" class="backstage">後台</a>
	`;
	}
	document.querySelector(".nav_title_list_left").appendChild(create_post);
	document.querySelector(".nav_title_list_right").appendChild(register);
	document.querySelector(".nav_title_list_right").appendChild(login);
	document.querySelector(".nav_title_list_right").appendChild(logout);
	document.querySelector(".nav_title_list_right").appendChild(backstage);
}
