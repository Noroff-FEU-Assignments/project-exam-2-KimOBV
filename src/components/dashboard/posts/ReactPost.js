import useAxios from '../../../hooks/useAxios';
import React from 'react';

export default function ReactPost({ setReactions, reactions, post }) {
	//console.log(post);
	const http = useAxios();
	const [, setIsSubmitting] = React.useState(false);

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
				<button data-symbol="🍌" onClick={setEmoji}>
					🍌
				</button>
				<button data-symbol="❤️" onClick={setEmoji}>
					❤️
				</button>
				<button data-symbol="🙈" onClick={setEmoji}>
					🙈
				</button>
				<button data-symbol="🙉" onClick={setEmoji}>
					🙉
				</button>
				<button data-symbol="🙊" onClick={setEmoji}>
					🙊
				</button>
			</div>
		</>
	);
}
