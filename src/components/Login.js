import React from "react";
import PropTypes from "prop-types";

const Login = props => (
	<nav className="Login">
		<h2>Inventory Login</h2>
		<p>Sign in to manage your Store's Inventory.</p>
		<button className="github" onClick={() => props.authenticate("Github")}>
			Login With Github
		</button>
		<button
			className="twitter"
			onClick={() => props.authenticate("Twitter")}
		>
			Login With Twitter
		</button>
	</nav>
);

Login.propTypes = {
	authenticate: PropTypes.func.isRequired
};

export default Login;
