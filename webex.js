var app = new window.Webex.Application();

app.onReady().then(function () {
  log('App is ready. App info:', app);
});

document.onclick = (e) => {
	let url = "https://slash7it.github.io/three/foo.html";
	app.setShareUrl(url, "", "Shared App").then(() => {
        log("Set share URL", url);
    }).catch((errorcode) => {
        log("Error: ", Webex.Application.ErrorCodes[errorcode])
    });
};
