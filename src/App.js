import "./App.css";
import React, { useRef, useState } from "react";
import Notifications, { notify } from "react-notify-toast";

const App = () => {
	let form = useRef(null);
	let [url, setUrl] = useState("");

	const saveToClipBoard = (url) => {
		navigator.clipboard.writeText(url).then(
			() => {
				notify.show("Short url copied!", "success");
			},
			() => {
				notify.show("Error copying short url!", "error");
			}
		);
	};

	const shorten = (event) => {
		event.preventDefault();
		if (!url) return;

		form.current.firstChild.disabled = "disabled";
		fetch("/", {
			method: "POST",
			body: JSON.stringify({ url }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.text())
			.then((id) => {
				let short = window.location.href + id;
				setUrl(short);
				saveToClipBoard(short);
				form.current.firstChild.disabled = "";
			});
	};

	return (
		<div className="app">
			<Notifications />
			<form className="form" onSubmit={shorten} ref={form}>
				<input
					type="url"
					placeholder="Insert your link"
					value={url}
					onChange={({ target }) => setUrl(target.value)}
					size="1"
				/>
				<button className="icon" type="submit">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
						/>
					</svg>
				</button>
			</form>
		</div>
	);
};

export default App;
