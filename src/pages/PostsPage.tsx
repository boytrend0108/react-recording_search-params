import { Link, useSearchParams } from 'react-router-dom';
import React, { useContext } from 'react';

import { PostList } from '../components/PostList';
import { PostsContext } from '../store/PostsContext';
import { PostFilter } from '../components/PostFilter';
import { Post } from '../types';

function getFilteredPost(posts: Post[], search: URLSearchParams): Post[] {
  const userId = +(search.get('userId') || 0);
  const query = search.get('query') || '';
  const letters = search.getAll('letters');

  return posts.filter(post => {
    const matchUserId = userId ? post.userId === userId : true;
    const matchQuery = post.title.includes(query);
    const matchLetters = letters.length === 0 || letters.some(letter => post.body.includes(letter));

    return matchUserId && matchQuery && matchLetters;
  });
};

export const PostsPage: React.FC = () => {
  const { posts } = useContext(PostsContext);
  const [searchParams] = useSearchParams();

  const visiblePosts = getFilteredPost(posts, searchParams);

  return (
    <div>
      {posts.length > 0 ? <>
        <PostFilter />
        <PostList posts={visiblePosts} />
      </> : (
        <p>There are no posts yet</p>
      )}

      <Link to="new" className="button is-info">
        Create a post
      </Link>
    </div>
  );
};
