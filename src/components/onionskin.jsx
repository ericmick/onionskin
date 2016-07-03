import React, {Component} from 'react'
import ReactDOM from 'react-dom'

const mediaOptions = { 
	audio: false,
	video: true
};

const videoStyle = {
	position: "absolute",
	width: "100%",
	height: "auto"
};

const canvasStyle = {
	position: "absolute",
	width: "100%",
	opacity: 0.5
};

const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

export default class Onionskin extends Component {
	constructor() {
		super();
	}
	streamVideo(video) {
		this.video = video;
		if (!getUserMedia) {
			console.error('getUserMedia not supported in this browser.');
			return;
		}
		getUserMedia.call(navigator, mediaOptions, (stream) => {
			video.src = window.URL.createObjectURL(stream);
		}, function(e) {
			console.error(e);
		});
	}
	snapshot(e) {
		if (this.video) {
			const video = ReactDOM.findDOMNode(this.video);
			const canvas = e.target;
			let {clientWidth, clientHeight} = video;
			canvas.width = clientWidth;
			canvas.height = clientHeight;
			let ctx = canvas.getContext('2d');
			ctx.drawImage(video, 0, 0, clientWidth, clientHeight);
		}
	}
	render() {
		return (<div>
			<video style={videoStyle} autoPlay="true" ref={(video) => this.streamVideo(video)}></video>
			<canvas style={canvasStyle} onClick={(e) => this.snapshot(e)}></canvas>
		</div>);
	}
}