import React from "react";
import Header from "./Header";
class PaintingDetail extends React.Component {
	_isMounted = false;
	state = {
		painting: {}
	};

	componentDidMount() {
		this._isMounted = true;

		const { params } = this.props.match;
		// first reinstate our localStorage
		const localStorageRef = localStorage.getItem(params.paintingID);
		if (localStorageRef) {
			this.setState({ painting: JSON.parse(localStorageRef) });
		} else {
			// make call
			this.getData();
		}
	}

	getData() {
		fetch(
			"https://s3-us-west-2.amazonaws.com/s.cdpn.io/207241/artsy-example.json"
		)
			.then(response => {
				return response.json();
			})
			.then(response => {
				// convert response to desired object type
				const artworkArrs = response["_embedded"]["artworks"];
				if (this._isMounted) {
					const artworks = artworkArrs.map(ele => {
						return {
							id: ele.id,
							slug: ele.slug,
							title: ele.title,
							date: ele.date,
							thumbnail: ele["_links"]["thumbnail"]["href"],
							medium: ele.medium,
							dimensionsIN: ele.dimensions.in.text,
							dimensionsCM: ele.dimensions.cm.text
						};
					});

					// save to localStorage so we no need to make call next time
					artworks.forEach(artwork => {
						localStorage.setItem(artwork.slug, JSON.stringify(artwork));
					});

					const paintingID = this.props.match.params.paintingID;
					const painting = artworks.find(
						painting => painting.slug === paintingID
					);

					// change state
					this.setState({ painting });
				}
			});
	}

	viewLarge = () => {
		window.open(this.state.painting.thumbnail);
	};

	render() {
		const painting = this.state.painting;
		return (
			<React.Fragment>
				<Header />

				<div className='detail'>
					<img
						onClick={this.viewLarge}
						className='painting-detail'
						src={this.state.painting.thumbnail}
						alt={this.state.painting.title}
					/>
					<div className='detail-meta'>
						<p>
							<strong>{painting.title}</strong>
						</p>
						<p>{painting.medium}</p>
						<p className='dimensions'>{painting.dimensionsIN}</p>
						<p className='dimensions'>{painting.dimensionsCM}</p>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default PaintingDetail;
