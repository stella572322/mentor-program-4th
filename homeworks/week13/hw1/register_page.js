const content_type = "application/json";
let API_URL = "https://student-json-api.lidemy.me";

/*填寫欄位 -> 按送出鍵 -> 註冊 -> 導回首頁*/
document.querySelector(".create_button").addEventListener("click", (e) => {
	const target = e.target.getAttribute("class");
	//console.log(target);
	if (target === "create_submit") {
		const input_nickname = document.querySelector(".create_nickname");
		const input_username = document.querySelector(".create_username");
		const input_password = document.querySelector(".create_password");

		// console.log(input_nickname.value);
		// console.log(input_username.value);
		// console.log(input_password.value);
		const nickname = input_nickname.value.trim();
		const username = input_username.value.trim();
		const password = input_password.value.trim();
		if (!nickname || !username || !password) {
			/*偵測帳號或密碼未填、空白，利用.trim()去除字串前後空白 */
			alert("nickname, username and password are required");
			return; /*終止發Api */
		}
		var xhr = new XMLHttpRequest();
		xhr.open("POST", `${API_URL}/register`, true);
		xhr.setRequestHeader("content-type", content_type);
		xhr.onload = function () {
			if (xhr.status >= 200 && xhr.status < 400) {
				//console.log("成功");
				var result = JSON.parse(xhr.response); /*json文字轉成物件*/
				let token = result.token;
				localStorage.setItem("token", token); /*把通行證token存在localStorage*/
				window.location.replace("index.html"); /*返回首頁*/
			} else {
				let errorMessage = JSON.parse(xhr.response);
				alert(errorMessage.message);
			}
		};
		xhr.send(
			JSON.stringify({
				/*物件轉成文字json*/
				/*查看取得資料的格式，來發資料格式 */
				nickname: nickname,
				username: username,
				password: password,
			})
		);
	}
});

/*取消註冊 -> 導回首頁 */
document.querySelector(".create_button").addEventListener("click", (e) => {
	const target = e.target.getAttribute("class");
	if (target === "create_cancel") {
		window.location.replace("index.html"); /*返回首頁*/
	}
});
