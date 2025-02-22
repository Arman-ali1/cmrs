import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store/store.js";
import AppContainer from "./AppContainer.js";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<AppContainer />
		</Provider>
	</StrictMode>
);
