const mediaOptions = { audio: false, video: true };

if (!navigator.getUserMedia) {
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
}

if (!navigator.getUserMedia) {
	console.error('getUserMedia not supported in this browser.');
}

navigator.getUserMedia(mediaOptions, success, function(e) {
	console.error(e);
});

function success(stream) {
	const video = document.querySelector('video');
	video.src = window.URL.createObjectURL(stream);
	const canvas = document.querySelector('canvas');
	canvas.addEventListener('click', (e) => {
		let {clientWidth, clientHeight} = video;
		canvas.width = clientWidth;
		canvas.height = clientHeight;
		let ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, clientWidth, clientHeight);
	});
}