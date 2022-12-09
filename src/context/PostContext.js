import { createContext, useReducer, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { URL } from '../const/api';
import PropTypes from 'prop-types';
import postReducer, { initialState } from './postReducer';

const PostContext = createContext(initialState);

const postUrl = URL + 'posts?_author=true&_comments=true&_reactions=true';

export const PostProvider = ({ children }) => {
	const [auth] = useContext(AuthContext);
	const [state, dispatch] = useReducer(postReducer, initialState);

	useEffect(() => {
		async function fetchPosts() {
			const options = {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${auth.accessToken}`,
				},
			};
			try {
				const response = await fetch(postUrl, options);
				if (response.ok) {
					const json = await response.json();
					setPosts(json);
				} else {
					setError('There was an error during the API request');
				}
			} catch (error) {
				setError(error);
			}
		}
		fetchPosts();
		// eslint-disable-next-line
	}, []);

	const addPost = (post) => {
		dispatch({
			type: 'ADD_POST',
			payload: post,
		});
	};

	const setPosts = (posts) => {
		dispatch({
			type: 'SET_POSTS',
			payload: posts,
		});
	};

	const setUserPosts = (userPost) => {
		dispatch({
			type: 'SET_USER_POSTS',
			payload: userPost,
		});
	};

	const removeUserPost = (postId) => {
		dispatch({
			type: 'REMOVE_USER_POST',
			payload: postId,
		});
	};

	const setDetails = (details) => {
		dispatch({
			type: 'POST_DETAILS',
			payload: details,
		});
	};

	const addComment = (comment) => {
		dispatch({
			type: 'ADD_COMMENT',
			payload: comment,
		});
	};

	const setComments = (comments) => {
		dispatch({
			type: 'SET_COMMENTS',
			payload: comments,
		});
	};

	const addReaction = (reaction) => {
		dispatch({
			type: 'ADD_REACTION',
			payload: reaction,
		});
	};

	const setReactions = (reactions) => {
		dispatch({
			type: 'SET_REACTIONS',
			payload: reactions,
		});
	};

	const setUserAvatar = (img) => {
		dispatch({
			type: 'SET_USER_AVATAR',
			payload: img,
		});
	};

	const setError = (error) => {
		dispatch({
			type: 'SET_ERROR',
			payload: error,
		});
	};

	return <PostContext.Provider value={{ state, addPost, setDetails, setUserPosts, removeUserPost, addComment, setComments, addReaction, setReactions, setUserAvatar }}>{children}</PostContext.Provider>;
};

export const useStore = () => useContext(PostContext);

export default useStore;

PostProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
