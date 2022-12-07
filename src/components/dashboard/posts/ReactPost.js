import useAxios from '../../../hooks/useAxios';
import React from 'react';

export default function ReactPost({ setReactions, reactions, post }) {
	//console.log(post);
	const http = useAxios();
	const [, setIsSubmitting] = React.useState(false);

	const handleClick = (e) => {
		let test = e.currentTarget;
		test.disabled = true;
		setEmoji(e);
		setTimeout(() => {
			test.disabled = false;
		}, 6000);
	};

	const setEmoji = async (event) => {
		const symbol = event.target.dataset.symbol;

		const findReaction = reactions.find((reaction) => reaction.symbol === symbol);
		setIsSubmitting(true);
		try {
			const response = await http.put(`posts/${post.details.id}/react/${symbol}`);
			if (findReaction) {
				const filterReactions = reactions.filter((reaction) => reaction.symbol !== findReaction.symbol);
				setReactions([...filterReactions, response.data]);
			} else {
				setReactions((prevState) => [...prevState, response.data]);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<div className="reaction">
				<button
					data-symbol="🍌"
					onClick={(e) => {
						handleClick(e);
					}}
				>
					🍌
				</button>
				<button
					data-symbol="❤️"
					onClick={(e) => {
						handleClick(e);
					}}
				>
					❤️
				</button>
				<button
					data-symbol="🙈"
					onClick={(e) => {
						handleClick(e);
					}}
				>
					🙈
				</button>
				<button
					data-symbol="🙉"
					onClick={(e) => {
						handleClick(e);
					}}
				>
					🙉
				</button>
				<button
					data-symbol="🙊"
					onClick={(e) => {
						handleClick(e);
					}}
				>
					🙊
				</button>
			</div>
		</>
	);
}
