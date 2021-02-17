const content_type = "application/json";
let API_Url = "https://student-json-api.lidemy.me";

/*監聽註冊sumit，串後端api，取得token */
document.querySelector(".submit_btn").addEventListener("click", (e) => {
	const nickname = document
		.querySelector('input[name="nickname"]')
		.value.trim();
	const username = document
		.querySelector('input[name="username"]')
		.value.trim();
	const password = document
		.querySelector('input[name="password"]')
		.value.trim();
	if (!nickname || !username || !password) {
		/*偵測帳號或密碼未填、空白，利用.trim()去除字串前後空白 */
		alert("nickname, username and password are required");
		return; /*終止發Api */
	}
	console.log(nickname, username, password);
	fetch(`${API_Url}/register`, {
		method: "POST",
		headers: {
			"content-type": content_type,
		},
		body: JSON.stringify({
			/*物件轉成文字json*/
			nickname: nickname,
			username: username,
			password: password,
		}),
	})
		.then((res) => res.json())
		.then((result) => {
			let token = result.token;
			localStorage.setItem("token", token); /*把通行證token存在localStorage*/
			window.location.replace("index.html");
		})
		.catch((errorMessage) => alert(errorMessage.message));
});
