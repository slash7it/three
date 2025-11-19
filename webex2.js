var app = new window.Webex.Application();

function log(text) {
	console.log(text);
}

app.onReady()
.then(function () {
	document.querySelector("#app").classList.remove('hidden');
	document.querySelector("#errMsg").classList.add('hidden');
	log('App is ready. App info:', app);
})
.catch((err) => { 
  console.err(err);
});

document.querySelector("#submit").onclick = (e) => {
	let session = document.querySelector("#vid").value;
	let url = `https://vevox.app/#/m/${session}`
	document.querySelector("#fr").src = url;
	app.setShareUrl(url, "", "Shared App").then(() => {
        log("Set share URL", url);
		window.location.href = url;
    }).catch((errorcode) => {
        log("Error: ", Webex.Application.ErrorCodes[errorcode])
    });
};

// document.querySelector("#load").onclick = (e) => {
// 	let session = document.querySelector("#vid").value;
// 	let url = `https://vevox.app/#/m/${session}`;
// 	document.querySelector("#fr").src = url;
// };
