import React from 'react';
import sound from './assets/music/Thug Life.mp3'
import image from './assets/images/jasmineSandlas.png'

class MyMusic extends React.Component{
    
    constructor(){
        super();
        this.state = {
            isMounted : true,
            //index variable to keep track of song currently playing
            index:0
        }
    }

   
    componentDidMount(){
        let self = this;
        self.props.audio[this.state.index].play();

            // on next button for next song -- increase the index of the song in the song list
            document.getElementById('nextnext').addEventListener('click',(e)=>{
                if(this.state.index<[self.props.audio].length){
                    this.setState({
                        index:this.state.index+1
                    })
                }
            })

            // on previous button for previous song -- decrease the index of the song in the song list
            document.getElementById('prevprev').addEventListener('click',(e)=>{
                if(this.state.index>0){
                    this.setState({
                        index:this.state.index-1
                    })
                }
            })

            // console.log(self.props.audio);
            var arr = new Array(self.props.audio);

            //add Event Listener to all the audio elements for timeupdate -- adding functionality for multiple songs
            [...document.querySelectorAll('.audio-element')].forEach(function(aud) {
                console.log(aud);
                aud.addEventListener("timeupdate",function(){
                    if(self.state.isMounted){
                        var pos = aud.currentTime/aud.duration;
                        self.updateTime();
                        let fill = document.getElementById("fill");
                        console.log(fill);
                        if(fill !== null){
                            fill.style.width = pos*100 + "%";
                        }
                    }
                })
            });
        
    }


    updateTime = () =>{
       
        this.setState({
            audio : this.props.audio
        })
    }

    componentWillUnmount(){
        this.state.isMounted = false;
    }

    render(){
         let audio = this.props.audio[this.state.index];

        // at the time of re rendering put active onto that audio which is active
         [...document.querySelectorAll('.audio-element')].forEach(function(item) {
            item.classList.remove('active')
             });
         audio.classList.add('active');




        return(
            <div style={styles.myMusicContainer}>
                <div style={styles.titleBar}>
                        <p style={{fontWeight:'bold'}}>iPod</p>
                            <img style={styles.musicIcon} src="https://img.icons8.com/ios-filled/50/musical-notes.png"></img>
                </div>

                <div style={styles.info}>
                    <img style={styles.image} src={image}></img>
                    <div style={styles.subInfo}>
                        <h4 style={{marginBottom:'0.5rem',fontWeight:'bold'}}>Thug Life</h4>
                        <p style={{marginBottom:'0'}}>Jasmine Sandlas</p>
                    </div>
                    
                </div>
                {/* Status bar og audio if audio is not empty */}
                <div style={styles.statusBar}>
                    <p style={styles.currTime}>{audio !== null ? Math.floor(audio.currentTime/60) +':' +Math.floor(audio.currentTime)%60 : '0 / 0'}</p>
                    <div style={styles.seekBar}>
                        <div style={styles.fill} id='fill'></div>
                    </div>
                    <p style={styles.dur}>{audio != null ? Math.floor(audio.duration/60) +':' + Math.floor(audio.duration)%60 : '0 / 0'}</p>
                </div>
                
            </div>
        );
    }
    
}

const styles = {
    myMusicContainer : {
        height : '100%',
        width : '100%',
        display : 'flex',
        flexDirection : 'column',
        backgroundColor:'black'
    },
    image : {
        height : '70%',
        width : '40%',
        alignSelf : 'center'
    },
    info : {
        height : '70%',
        width : '100%',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        color:'white'
    },
    statusBar : {
        width : '100%',
        height : '10%',
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'space-evenly'
    },
    subInfo : {
        alignSelf : 'center'
    },
    seekBar : {
        width:'70%',
        height:'20%',
        border : '1px solid grey',
        cursor: 'pointer',
        alignSelf : 'center',
        display: 'flex',
    },
    fill : {
        height: '100%',
        backgroundColor: 'royalblue',
    },
    currTime : {
        margin : '0',
        alignSelf : 'center',
        color:'white'
    },
    dur : {
        margin : '0',
        alignSelf : 'center',
        color:'white'
    },
    titleBar : {
        height:'10%',
        width:'95%',
        borderRadius:'10px 0 0 0',
        backgroundColor: '#FFAAC9',
        borderBottom: '1px solid #6c757d',
        padding : '1px 5px 10px 8px',
        display:'flex',
        flexDirecton : 'row',
        justifyContent : 'space-between'

    },
    musicIcon :{
        width : '20px',
        height: '20px',
    }
}


export default MyMusic;