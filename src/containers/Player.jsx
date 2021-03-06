import React from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import Moment from 'react-moment';

import { 
    playPlayer,
    pausePlayer,
} from '../actions/podcasts';


class Player extends React.Component {

    state = {
        isDesktop: false
    }
    updatePredicate = this.updatePredicate.bind(this);

    componentDidMount() {
        this.updatePredicate();
        window.addEventListener('resize', this.updatePredicate);
        window.scrollTo(0 ,0);
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updatePredicate);
    };

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 992 });
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { isDesktop } = this.state;
        const { player, pausePlayer, playPlayer } = this.props;
        let viewportHeight = player.isOpen ? '20vh' : '0vh';
        return (
            <footer id='podcast-player' className='fixed-bottom' style={{ display: player.isOpen ? 'block': 'none', viewportHeight }}>
                <div className='container'>
                    { player.episode ? (
                        <ReactPlayer
                        width='0%'
                        height='0%'
                        playing={player.isPlaying}
                        url={player.episode.url} />
                    ) : null}

                    { isDesktop ? (
                        <div className='row mt-2 mb-2'>
                            <div className='col-lg-1 col-3 text-center my-auto' id='controls'>
                                <img alt={player.podcast.img} src={player.podcast.img} height='50' width='50'></img>
                            </div>
                            <div className='col-lg-1 col-3 my-auto'>
                                <i className='fas fa-undo'></i>
                            </div>
                            <div className='col-lg-1 col-3 my-auto'>
                                {player.isPlaying ? (
                                    <i className='fas fa-pause' onClick={() => pausePlayer() }></i>
                                ) : (
                                    <i className='fas fa-play' onClick={() => playPlayer() }></i>
                                )}
                            </div>
                            <div className='col-lg-1 col-3 my-auto'>
                                <i className='fas fa-redo'></i>
                            </div>
                            <div className='col-lg-5 col-12 text-center'>
                                { player.episode ? (
                                    <div className='mt-3 mb-3'>
                                        <div style={{textOverflow: 'ellipsis'}}><b>{ player.episode.name}</b></div>
                                        <div>{ player.podcast.name} - <Moment format='ll'>{player.episode.published_at}</Moment></div>
                                        <input type='range' className='form-control'></input>
                                    </div>
                                ) : null}
                            </div>
                            <div className='col-lg-1 col-4 text-center my-auto'>
                                <span className='btn btn-light'>1x</span>
                            </div>
                            <div className='col-lg-1 col-4 text-center my-auto'>
                                <i className='fas fa-volume-up'></i>
                            </div>
                            <div className='col-lg-1 col-4 text-center my-auto'>
                                <i className='fas fa-bars'></i>
                            </div>
                        </div>
                    ) : (
                        <div className='row mt-3 mb-3'>
                            <div className='col-3 text-center my-auto' id='controls'>
                                <img alt={player.podcast.img} src={player.podcast.img} height='50' width='50'></img>
                            </div>
                            <div className='col-3 my-auto'>
                                <i className='fas fa-undo'></i>
                            </div>
                            <div className='col-3 my-auto'>
                                {player.isPlaying ? (
                                    <i className='fas fa-pause' onClick={() => pausePlayer() }></i>
                                ) : (
                                    <i className='fas fa-play' onClick={() => playPlayer() }></i>
                                )}
                            </div>
                            <div className='col-3 my-auto'>
                                <i className='fas fa-redo'></i>
                            </div>
                        </div>
                    )}
                </div>
            </footer>
        )
    }
}

const mapStateToProps = state => {
    return { player: state.player }
}

export default connect(
    mapStateToProps,
    { playPlayer, pausePlayer }
)(Player);
