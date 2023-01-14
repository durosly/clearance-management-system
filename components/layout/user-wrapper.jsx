import React from "react";
import Header from "./header";

function UserWrapper({ children }) {
	return (
		<>
			<Header />

			{children}
		</>
	);
}

export default UserWrapper;
