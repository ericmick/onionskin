import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class ContextMenu extends Component {
	constructor() {
		super();
		this.state = {
			isOpen: false,
			position: {
				x: 0,
				y: 0
			}
		};
	}
	open(e) {
		if (e && typeof e.clientX == 'number' && typeof e.clientY == 'number') {
			this.setState({
				isOpen: true,
				position: {
					x: e.clientX,
					y: e.clientY
				}
			});
		} else {
			this.setState({
				isOpen: true
			});
		}
		e.preventDefault();
	}
	close(e) {
		this.setState({
			isOpen: false
		});
	}
	render() {
		const contextMenuStyle = {
			left: this.state.position.x,
			position: 'absolute',
			top: this.state.position.y,
			visibility: this.state.isOpen ? 'visible' : 'hidden'
		};
		return (<div
			style={contextMenuStyle}>
			{this.props.children}
		</div>);
	}
}