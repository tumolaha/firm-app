import { EMBED_TO, IMAGE_URL } from './constants';
import PropTypes from 'prop-types';

export const convertErrorCodeToMessage = (errorCode) => {
    if (errorCode === 'auth/email-already-in-use') return 'Your email is already in use.';
    else if (errorCode === 'auth/user-not-found') return 'Your email may be incorrect.';
    else if (errorCode === 'auth/wrong-password') return 'Your password is incorrect.';
    else if (errorCode === 'auth/invalid-email') return 'Your email is invalid';
    else if (errorCode === 'auth/too-many-requests') return 'You request too many times!';
    else return 'Something weird happened.';
};

convertErrorCodeToMessage.prototype = {
    errorCode: PropTypes.string,
};

export const calculateTimePassed = (time) => {
    const unit = {
        year: 12 * 30 * 7 * 24 * 60 * 60 * 1000,
        month: 30 * 7 * 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000,
    };

    const diff = Date.now() - time;
    for (const key in unit) {
        if (diff > unit[key]) {
            const value = unit[key];
            const timePassed = Math.floor(diff / value);
            return `${timePassed} ${key}${timePassed > 1 ? 's' : ''}`;
        }
    }
    return 'Just now';
};

calculateTimePassed.prototype = {
    time: PropTypes.number,
};

export const resizeImage = (imageUrl, width = 'original') => `${IMAGE_URL}/${width}${imageUrl}`;

resizeImage.prototype = {
    imageUrl: PropTypes.string,
    width: PropTypes.string,
};
// export const embedMovie = (id: number): string =>
//   `${EMBED_URL}/movie?tmdb=${id}`;

// export const embedMovie = (id: number): string => `${EMBED_VIDSRC}/${id}`;

export const embedMovie = (id) => `${EMBED_TO}/movie?tmdb=${id}`;

// export const embedTV = (id: number, season: number, episode: number): string =>
//   `${EMBED_URL}/series?tmdb=${id}&sea=${season}&epi=${episode}`;

// export const embedTV = (id: number, season: number, episode: number): string =>
//   `${EMBED_VIDSRC}/${id}/${season}-${episode}`;

embedMovie.prototype = {
    id: PropTypes.number.isRequired,
};

export const embedTV = (id, season, episode) => `${EMBED_TO}/tv?tmdb=${id}&s=${season}&e=${episode}`;

embedTV.prototype = {
    id: PropTypes.number,
    season: PropTypes.number,
    episode: PropTypes.number,
};
