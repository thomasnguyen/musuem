import React from "react";
import Painting from "./Painting";

import Header from "./Header";
import NotFound from "./NotFound";

class PaintingGrid extends React.Component {
	_isMounted = false;

	state = {
		artworks: [],
		displayCount: 9,
		searchQuery: ""
	};

	handleScroll = () => {
		var lastPainting = document.querySelector(
			".grid-wrapper > .thumbnail-wrapper:last-child"
		);

		if (!lastPainting) {
			return;
		}
		var lastPaintingOffset = lastPainting.offsetTop + lastPainting.clientHeight;
		var pageOffset = window.pageYOffset + window.innerHeight;
		if (pageOffset > lastPaintingOffset) {
			const displayCount = this.state.displayCount + 3;
			this.setState({ displayCount });
		}
	};

	componentDidMount() {
		this._isMounted = true;
		// getData
		this.getData();

		// add event listner when user scrolls
		window.addEventListener("scroll", e => {
			this.handleScroll(e);
		});
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

					// change state
					this.setState({ artworks });
				}
			});
	}

	componentWillUnmount() {}

	handleSearch = event => {
		const searchQuery = event.currentTarget.value;

		const displayCount = 9;
		this.setState({ searchQuery, displayCount });
	};
	render() {
		const paintings = this.state.artworks
			.slice(0, this.state.displayCount)
			.filter(painting => {
				if (this.state.searchQuery.trim() === "") {
					return true;
				}

				return painting.title
					.toLowerCase()
					.includes(this.state.searchQuery.toLowerCase());
			})
			.map(painting => {
				return (
					<Painting
						key={painting.id}
						{...painting}
						history={this.props.history}></Painting>
				);
			});

		return (
			<div className='wrapper'>
				<Header />
				<input
					className='search-bar'
					type='text'
					onChange={this.handleSearch}
					placeholder='Search...'
					value={this.props.searchQuery}
				/>
				<div className='grid-wrapper'>{paintings}</div>
				{paintings.length || this.state.searchQuery === "" ? "" : <NotFound />}
			</div>
		);
	}
}

export default PaintingGrid;
