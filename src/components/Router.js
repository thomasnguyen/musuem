import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import PaintingGrid from "./PaintingGrid";
import PaintingDetail from "./PaintingDetail";

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={PaintingGrid} />
			<Route path='/:paintingID' component={PaintingDetail} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Router;
