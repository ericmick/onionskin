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
	drawImage(image) {
		if (this.video && this.canvas) {
			const video = ReactDOM.findDOMNode(this.video);
			const canvas = this.canvas;
			const {clientWidth, clientHeight} = video;
			canvas.width = clientWidth;
			canvas.height = clientHeight;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(image, 0, 0, clientWidth, clientHeight);
		}
	}
	snapshot(e) {
		if (this.video) {
			const video = ReactDOM.findDOMNode(this.video);
			this.drawImage(video);
		}
	}
	inputImageFile(e) {
		const input = e.target;
		if (input.files && input.files[0] && this.canvas) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const image = new Image();
				image.onload = () => {
					this.drawImage(image);
				}
				image.src = e.target.result;
			};
			reader.readAsDataURL(input.files[0]);
		}
		if (this.menu) {
			this.menu.close();
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
				<button onClick={(e) => this.snapshot(e)}>snapshot</button><br/>
				<input type="file" onChange={(e) => this.inputImageFile(e)}/>
			</ContextMenu>
		</div>);
	}
}