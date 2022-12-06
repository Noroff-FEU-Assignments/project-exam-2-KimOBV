import React from 'react';

function Reactions({ reactions }) {
	return (
		<>
			<div className="r-r">
				{reactions.map((reaction, index) => {
					return (
						<span key={index}>
							<p>
								{reaction.symbol}
								<span>{reaction.count}</span>
							</p>
						</span>
					);
				})}
			</div>
		</>
	);
}

export default Reactions;
