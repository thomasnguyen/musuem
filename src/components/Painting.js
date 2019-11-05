import React from "react";

class Painting extends React.Component {
	navigateToDetail = () => {
		this.props.history.push(`/${this.props.slug}`);
	};

	render() {
		return (
			<div className='thumbnail-wrapper' onClick={this.navigateToDetail}>
				<img
					className='thumbnail'
					src={this.props.thumbnail}
					alt={this.props.title}
				/>
				<div className='thumbnail-meta-data'>
					<strong>{this.props.title}</strong> ({this.props.date})
				</div>
			</div>
		);
	}
}

export default Painting;
