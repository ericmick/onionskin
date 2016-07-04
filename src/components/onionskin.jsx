import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ContextMenu from './context-menu'

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
	setVideo(video) {
		this.video = video;
		if (video) {
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
	}
	setCanvas(canvas) {
		this.canvas = canvas;
	}
	setMenu(menu) {
		this.menu = menu;
	}
	snapshot(e) {
		if (this.video && this.canvas) {
			const video = ReactDOM.findDOMNode(this.video);
			const canvas = this.canvas;
			const {clientWidth, clientHeight} = video;
			canvas.width = clientWidth;
			canvas.height = clientHeight;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(video, 0, 0, clientWidth, clientHeight);
		}
	}
	render() {
		return (<div>
			<video
				style={videoStyle}
				autoPlay="true"
				ref={(video) => this.setVideo(video)}>
			</video>
			<canvas
				style={canvasStyle}
				onContextMenu={(e) => this.menu.open(e)}
				onClick={(e) => this.menu.close(e)}
				ref={(canvas) => this.setCanvas(canvas)}>
			</canvas>
			<ContextMenu ref={(menu) => this.setMenu(menu)}>
				<button onClick={(e) => this.snapshot(e)}>snapshot</button>
			</ContextMenu>
		</div>);
	}
}