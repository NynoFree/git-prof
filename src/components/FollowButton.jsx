import React from 'react';

function FollowButton({ username }) {
    return (
        <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="github-profile-button"
        >
            Посмотреть профиль на GitHub
        </a>
    );
}

export default FollowButton;

