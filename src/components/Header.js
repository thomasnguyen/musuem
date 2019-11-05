import React from "react";

class Header extends React.Component {
	navigateToHome = () => {
		window.location = "/";
	};
	render() {
		return (
			<header onClick={this.navigateToHome}>
				<h1>Musuem of Paintings</h1>
			</header>
		);
	}
}

export default Header;
