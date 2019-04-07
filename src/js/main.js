window.onload = function() {
	let dataInTable = document.querySelectorAll("table tr"); //Данные которые берём из таблицы
	let sendData = []; //Данные которые отправляются на сервер
	for (let i = 0; i < dataInTable.length; i++) { // цикл для выборки хостов
		dataInTable[i].onclick = function() {
			if(this.cells[0].style.background == "red") {
				this.cells[0].style.background = "";
				for (let i = 0; i < sendData.length; i++) { // проверяем элементы на совпадения и удаляем из массива
					if (sendData[i] == this.cells[0].innerHTML) {
						sendData.splice(i, 1);
						console.log(sendData)
					}
				}
			}
			else {
				sendData.push(this.cells[0].innerHTML);
				this.cells[0].style.background = "red";
				console.log(sendData);
			}
		}
	}

	document.querySelector(".addHost").onclick = function() {
		let hostName = document.querySelector(".text").value;
		if (hostName) {
			let data = {
				"operation": "addHost",
				"listHostname": hostName
			};
			data = JSON.stringify(data);
			ajaxPost(data, function(responseData) {
				 console.log(responseData);
			});
		}
	}

	document.querySelector(".delHost").onclick = function() { // функция для удаления хостов
		ajaxPost("test", function(responseData){
			console.log(responseData);
		});
		// let table = document.querySelector("table");
		// let data = {
		// 		"operation": "del",
		// 		"nameHosts": "del"
		// };

		// data['operation'][0] = "deleteHost";
		// for (var i = 0; i < sendData.length; i++) {
		//  	data["namesHosts"][0] = sendData[i];
		// }
		// data = "test"; 
		// ajaxPost(data, function(responseData) {
		// 	console.log(responseData);
		// 	for (let i = 1; i < table.rows.length; i++) {
		// 		for (let j = 0; j < sendData.length; j++) {
		// 			if (sendData[j] == table.rows[i].cells[0].innerHTML) {
		// 				table.deleteRow(i);
		// 			}
		// 		}
		// 	}
		// }); 
	}


	document.querySelector(".commentOutHost").onclick = function() { // функция для комментирования хостов
		let table = document.querySelector("table");
		let data = {
			"operation": "commentOutHost",
			"listHostname": sendData
		}
		data = JSON.stringify(data);
		ajaxPost(data, function(responseData) {
			for (let i = 1; i < table.rows.length; i++) {
				for (let j = 0; j < sendData.length; j++) {
					if (sendData[j] == table.rows[i].cells[0].innerHTML) {
						table.rows[i].style.color = "#808080";
					}
				}
			}
			console.log(responseData);
		});
	}

	document.querySelector(".uncommentTheHost").onclick = function() { // функция для расскоментирования строк
		let table = document.querySelector("table");
		ajaxPost("uncommentTheHost", sendData, function() {
			for (let i = 1; i < table.rows.length; i++) {
				for (let j = 0; j < sendData.length; j++) {
					if (sendData[j] == table.rows[i].cells[0].innerHTML) {
						table.rows[i].style.color = "#FFEC00";
					}
				}
			}
		});
	}

	function ajaxPost(data, callback) {
		let request = new XMLHttpRequest();
		f = callback || function() {}

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				f(request.responseText);
		 	}
		}
		request.open('POST', 'main.php');
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(data);
	}
}
