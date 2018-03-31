import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
	state = {
		fishes: {},
		order: {}
	};

	static propTypes = {
		match: PropTypes.object
	};
	componentDidMount() {
		//console.log("mounted!!!");
		const { params } = this.props.match;
		//first reinstate our localstorage
		const localStorageRef = localStorage.getItem(params.storeId);
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}
		//console.log(localStorageRef);

		this.ref = base.syncState(`${params.storeId}/fishes`, {
			context: this,
			state: "fishes"
		});
	}
	componentDidUpdate() {
		//console.log("It updated");
		console.log(this.state.order);
		localStorage.setItem(
			this.props.match.params.storeId,
			JSON.stringify(this.state.order)
		);
	}

	componentWillUnmount() {
		//console.log("Unmounting");
		base.removeBinding = this.ref;
	}

	addFish = fish => {
		//console.log("Adding a fish!");

		//1. Take a copy of the existing state
		const fishes = { ...this.state.fishes };

		//2. Add our new fish to that sishes variable
		fishes[`fish${Date.now()}`] = fish;

		//3. Set the new fishes object to state
		this.setState({ fishes });
	};

	updateFish = (key, updatedFish) => {
		const fishes = { ...this.state.fishes };

		fishes[key] = updatedFish;

		this.setState({ fishes });
	};

	deleteFish = key => {
		const fishes = { ...this.state.fishes };

		fishes[key] = null;

		this.setState({ fishes });
	};

	loadSampleFishes = () => {
		this.setState({ fishes: sampleFishes });
	};

	addToOrder = key => {
		//1.Take A Copy of State
		const order = { ...this.state.order };
		//2.Either add to order or update number in our order
		order[key] = order[key] + 1 || 1;
		//3. Call setstate to update our state object
		this.setState({ order });
	};

	removeFromOrder = key => {
		const order = { ...this.state.order };

		delete order[key];

		this.setState({ order });
	};

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="fishes">
						{Object.keys(this.state.fishes).map(key => (
							<Fish
								key={key}
								index={key}
								details={this.state.fishes[key]}
								addToOrder={this.addToOrder}
							/>
						))}
					</ul>
				</div>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory
					addFish={this.addFish}
					loadSampleFishes={this.loadSampleFishes}
					fishes={this.state.fishes}
					updateFish={this.updateFish}
					deleteFish={this.deleteFish}
					storeId={this.props.match.params.storeId}
				/>
			</div>
		);
	}
}

export default App;
