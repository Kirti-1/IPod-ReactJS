import React from 'react';
import Screen from './Screen';
import ZingTouch from 'zingtouch';
import sound from './assets/music/Thug Life.mp3'


class Ipod extends React.Component{

    constructor(){
        super();
        this.state = {
            activeItem : 'NowPlaying',
            activePage : 'Home',
            enter : 0,
            play : true
        }
    }

    rotateWheel = () => {

        var containerElement = document.getElementById('inner-container');
        var activeRegion = new ZingTouch.Region(containerElement);
        var change = 0;
        var self = this;
        self.state.enter = self.state.enter + 1;
        
        if(self.state.enter < 2){
            activeRegion.bind(containerElement, 'rotate', function(event){
                
                // Define the container of rotation
                
                var newAngle = event.detail.distanceFromLast;
                console.log(newAngle);
                
                if(newAngle < 0){
                    // with each mouse over event angle increased and after >15 deg next item in the list item
                    console.log(change);
                    change++;
                    if(change === 15){

                        //Changing the active Itembased on positive vs negative rotation
                        console.log("change state");
                        change = 0;
                        if(self.state.activePage === 'Home'){
                            if(self.state.activeItem === 'NowPlaying'){
                                self.setState({
                                    activeItem : "Music"
                                })
                            }else if(self.state.activeItem === 'Music'){
                                self.setState({
                                    activeItem : "Games"
                                })
                            }else if(self.state.activeItem === 'Games'){
                                self.setState({
                                    activeItem : "Settings"
                                })
                            }else if(self.state.activeItem === 'Settings'){
                                self.setState({
                                    activeItem : "NowPlaying"
                                })
                            }
                        }else if(self.state.activePage === 'Music'){
                            if(self.state.activeItem === 'MyMusic'){
                                self.setState({
                                    activeItem : "Artists"
                                })
                            }else if(self.state.activeItem === 'Artists'){
                                self.setState({
                                    activeItem : "MyMusic"
                                })
                            }
                        }
                    }
                }else{
                    console.log(change);

                    //Anticlock wise rotation
                    change++;
                    if(change === 15){
                        console.log("change state");
                        change = 0;
                        if(self.state.activePage === 'Home'){
                            if(self.state.activeItem === 'NowPlaying'){
                                self.setState({
                                    activeItem : "Settings"
                                })
                            }else if(self.state.activeItem === 'Music'){
                                self.setState({
                                    activeItem : "NowPlaying"
                                })
                            }else if(self.state.activeItem === 'Games'){
                                self.setState({
                                    activeItem : "Music"
                                })
                            }else if(self.state.activeItem === 'Settings'){
                                self.setState({
                                    activeItem : "Games"
                                })
                            }
                        }else if(self.state.activePage === 'Music'){
                            if(self.state.activeItem === 'MyMusic'){
                                self.setState({
                                    activeItem : "Artists"
                                })
                            }else if(self.state.activeItem === 'Artists'){
                                self.setState({
                                    activeItem : "MyMusic"
                                })
                            }
                        }
                    }
                }
                });
        }else{
            console.log("Not allowed to enter")
        }
        
    }

    changePage = () => {

        //Changing the page on enter and re rendering the screen by providing it with props 
        if(this.state.activeItem === 'Music'){
            this.setState({
                activeItem : 'MyMusic',
                activePage : this.state.activeItem
            })
        }else if(this.state.activeItem === 'NowPlaying'){
            this.setState({
                activeItem : 'NowPlaying',
                activePage : 'MyMusic'
            })
        }else{
            this.setState({
                activeItem : this.state.activeItem,
                activePage : this.state.activeItem
            })
        }
        
        
    }

    redirectToHomePage = () => {
        // On click of MENU page changing active item and page and then re rendering
        if(this.state.activeItem === 'MyMusic' || this.state.activeItem === 'Artists'){
            this.setState({
                activeItem : 'Music',
                activePage : 'Home'
            })
        }else{
            this.setState({
                activeItem : this.state.activeItem,
                activePage : 'Home'
            })
        }
        
    }

    toggle = () =>{
        // pause play the music 
        if(this.state.activePage === 'MyMusic'){
            if(this.state.play === true){
                this.state.audio.pause();
                this.setState({
                    play : false
                })
            }else{
                this.state.audio.play();
                this.setState({
                    play : true
                })
            }
            console.log("toggled")
        }
    }

    componentDidMount(){
        let audio = document.getElementsByClassName("audio-element")[0];
        console.log(audio)
        this.setState({
            audio : audio,
        })
        console.log(this.state)
    }

    render(){
        return(
            <div style = {styles.ipodContainer}>

                    <audio className="audio-element">
                        <source src={sound}></source>
                    </audio>
                    
                {/* It Renders the screen based on active item and page and thus props passed with active audio as well */}
                <Screen activeItem={this.state.activeItem} activePage={this.state.activePage} audio={this.state.audio} />


                {/* Rotation Wheel */}
                <div id='inner-container' style = {styles.wheel} onMouseOver={this.rotateWheel}>
                    <div style = {styles.buttonContainer}>
                        <div style = {{alignSelf:'center',cursor:'pointer',fontSize:'20px' }} onClick={this.redirectToHomePage}>
                            MENU
                        </div>
                        
                    </div>
                    <div style = {styles.buttonContainer}>
                        <div style = {{alignItems:'center',alignSelf:'center',width : '100%',display : 'flex',flexDirection : 'row',justifyContent : 'space-between'}}>
                            
                            <img className='playerList' styles={styles.image}  draggable='false' width="30" height="30" src="https://img.icons8.com/material-sharp/24/skip-to-start.png" alt="skip-to-start"/>
                            <div onClick={this.changePage} style={{backgroundImage: 'linear-gradient(50deg, #8c8181, transparent)' , width : '5rem' , height : '5rem' , borderRadius : '50%'}}></div>
                            <img className='playerList' styles={styles.image} draggable='false' width="30" height="30" src="https://img.icons8.com/android/24/end.png" alt="skip-to-start"/>
                            
                            
                        </div>
                    </div>
                    <div style = {styles.buttonContainer}>
                        <div onClick={this.toggle} style = {styles.playButton}>
                        <img  draggable='false' onClick={this.toggle} style={styles.image} width="30" height="30" src="https://img.icons8.com/external-solid-kawalan-studio/24/external-play-pause-user-interface-solid-kawalan-studio.png" alt="end"/>
                        </div>
                    </div>

                
                </div>
            </div>
        );
    }
    
}

const styles = {
    ipodContainer : {
        height : '33rem',
        width : '20rem',
        backgroundColor: '#2C3333',
        margin : '4rem auto',
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'center',
        borderRadius : '24px'
        
    },
    wheel : {
        width : '75%',
        height : '40%',
        margin : '1rem auto',
        backgroundColor : '#4b4e52',
        borderRadius : '55%',
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'center'
    },
    buttonContainer : {
        width : '85%',
        height : '30%',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center'
    },
    menuButton : {
        alignSelf:'center',
        cursor:'pointer'
    },
    playButton : {
        alignSelf:'center'
    },
    image: {
        alignSelf : 'center',
        fontSize: '1.5rem',
        color : 'white'
    }
}

export default Ipod;