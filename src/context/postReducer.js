export const initialState = {
	posts: [],
	loading: true,
	error: null,
	details: null,
	comments: [],
	reactions: [],
};

const postReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_POSTS':
			return {
				...state,
				posts: payload,
				loading: false,
				error: null,
			};

		case 'SET_ERROR':
			return {
				...state,
				error: payload,
				loading: false,
			};

		case 'ADD_POST':
			return {
				...state,
				posts: [...state.posts, payload],
			};

		case 'POST_DETAILS':
			return {
				...state,
				details: payload,
			};

		case 'SET_COMMENTS':
			return {
				...state,
				comments: payload,
			};
		case 'ADD_COMMENT':
			return {
				...state,
				comments: [...state.comments, payload],
			};

		case 'SET_REACTIONS':
			return {
				...state,
				reactions: payload,
			};

		case 'ADD_REACTION':
			return {
				...state,
				reactions: [...state.reactions, payload],
			};

		case 'REMOVE_POST':
			return {
				...state,
				posts: state.posts.filter((post) => post.id !== payload),
			};

		default:
			throw new Error(`No case for type ${type} found in postReducer.`);
	}
};

export default postReducer;
