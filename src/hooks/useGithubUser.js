import { useState, useEffect } from 'react';
import axios from 'axios';

const APIURL = 'https://api.github.com/users/';

function useGithubUser(username) {
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError('');
            try {
                const userResponse = await axios.get(APIURL + username);
                setUser(userResponse.data);

                const reposResponse = await axios.get(
                    APIURL + username + '/repos?sort=created&per_page=10'
                );
                setRepos(reposResponse.data);
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 404) {
                    setError('Бедолаги нет');
                } else {
                    setError('Проблема при загрузке данных');
                }
                setUser(null);
                setRepos([]);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUserData();
        } else {
            setUser(null);
            setRepos([]);
            setError('');
            setLoading(false);
        }
    }, [username]);

    return { user, repos, error, loading };
}

export default useGithubUser;
