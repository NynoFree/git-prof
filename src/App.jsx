import React, { useState } from 'react';
import './App.css';
import useGithubUser from './hooks/useGithubUser';
import FollowButton from './components/FollowButton';

function App() {
    const [username, setUsername] = useState('bradtraversy');
    const [searchTerm, setSearchTerm] = useState('');

    const { user, repos, error, loading } = useGithubUser(username);

    const handleSearch = (e) => {
        e.preventDefault();
        setUsername(searchTerm);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <form className="user-form" id="form" onSubmit={handleSearch}>
                <input
                    type="text"
                    id="search"
                    placeholder="Поиск гит"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </form>

            <main id="main">
                {loading && <div>Загрузка...</div>}

                {error && (
                    <div className="card">
                        <h1>{error}</h1>
                    </div>
                )}

                {user && (
                    <div className="card">
                        <div>
                            <img
                                src={user.avatar_url}
                                alt={user.name}
                                className="avatar"
                            />
                        </div>
                        <div className="user-info">
                            <h2>{user.name}</h2>
                            <p>{user.bio}</p>
                            <ul>
                                <li>
                                    {user.followers} <strong>подписчики</strong>
                                </li>
                                <li>
                                    {user.following} <strong>подписчик</strong>
                                </li>
                                <li>
                                    {user.public_repos} <strong>Repos</strong>
                                </li>
                            </ul>

                            <div id="repos">
                                {repos.slice(0, 10).map((repo) => (
                                    <a
                                        key={repo.id}
                                        href={repo.html_url}
                                        className="repo"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {repo.name}
                                    </a>
                                ))}
                            </div>
                            <FollowButton username={username} />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
