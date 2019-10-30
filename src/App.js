import React,{Component} from "react";
import {Container} from "react-bootstrap"

class mms extends Component{
    constructor(){
        super()
        this.state={
            image: null,
            sizeimg: null,
            label: false,
            Color: "Grey",
        }
    }

    componentDidUpdate(){
        //this.RGBtoHex();
    }
    componentDidMount(){
        


    }
   
    upload=(event)=>{
        
        if (event.target.files && event.target.files[0]) {
            var size=event.target.files[0].size;
            var cal=size/1000;
            var mb=cal/1024;
            var cal1=parseFloat(mb).toFixed(3);
            console.log(cal1);
            this.setState({ sizeimg: cal1,
              image: URL.createObjectURL(event.target.files[0],)
            } , ()=>{
                console.log(this.state.image)
            });
          }
       
    }

    RGB=()=>{
        var red=document.getElementById("Red").value;
        var blue=document.getElementById("blue").value;
        var green=document.getElementById("green").value;
        var array={red,green,blue};
        return array;
    }
    
    RGBtoHex=()=>{
        const {red,green,blue}=this.RGB();
        console.log(red);
        let red1=parseInt(red);
        let green1=parseInt(green);
        let blue1=parseInt(blue);
        let one=red1.toString(16);
        let two=green1.toString(16);
        let three=blue1.toString(16);
        if (one.length === 1)
        one = "0" + one;
        if (two.length === 1)
        two = "0" + two;
        if (three.length === 1)
        three = "0" + three;

        let four="#".concat(one,two,three);
        console.log(one, two, three)
        this.setState({Color: four});
        return four;
    }

    Color=()=>{
        var canvas=document.getElementById("canvas");
        var putimage= canvas.getContext("2d");
        var canvastemp=document.getElementById("canvas1");
        var putimagetemp= canvastemp.getContext("2d");
        let img=new Image();
        img.src=this.state.image;
        let hex=this.RGBtoHex();
        this.setState({label: true});
        img.onload=()=>{
                canvas.width=canvastemp.width=img.width;
                canvas.height=canvastemp.height=img.height;
                putimagetemp.drawImage(img,0,0);
                putimagetemp.globalCompositeOperation='source-in';
                console.log(hex)
                putimagetemp.fillStyle=`${hex}`;
                putimagetemp.fillRect(0,0,canvastemp.width,canvastemp.height);
                //putimagetemp.clearRect(0, 0, canvas.width, canvas.height);


                // 
                canvas.width=img.width;
                canvas.height=img.height;

                // use compositing to change the hue of the original image
                putimage.drawImage(img,0,0);
                putimage.globalCompositeOperation='color';
                putimage.drawImage(canvastemp,0,0);

                // always clean up: reset compositing to its default
                //putimage.globalCompositeOperation='source-over';
            
        }

    }
    newColor=()=>{
        
        const {red,green,blue}=this.RGB();
        var canvas=document.getElementById("canvas");
        var putimage= canvas.getContext("2d");
        var canvastemp=document.getElementById("canvas1");
        var putimagetemp= canvastemp.getContext("2d");
        let img=new Image();
        img.src=this.state.image;
        //let hex=this.RGBtoHex();
        img.onload=()=>{
                canvas.width=img.width;
                canvas.height=img.height;
                putimage.drawImage(img,0,0);
        }
        //let R,G,B;
        let image=putimage.getImageData(0,0,canvas.width,canvas.height);
        let imgData=image;
        console.log(imgData.data);
        
        var i;
        for (i = 0; i < imgData.data.length; i += 4) {
          var red1 = ((red * imgData.data[i]))
          var green1=(green * imgData.data[i+1]);
          var blue1=(blue * imgData.data[i+2])
          imgData.data[i] = red1;
          imgData.data[i + 1] = green1;
          imgData.data[i + 2] = blue1;
          imgData.data[i + 3] = imgData.data[i + 3];
          
        }
        
        canvastemp.width=img.width;
        canvastemp.height=img.height;
        putimagetemp.putImageData(imgData, 0, 0);
        
    }
    render(){
        return(
            <div>
                <Container fluid style={{backgroundColor:this.state.Color}} className="one">
                    <h3 className="textp">MMS Project!</h3>
                <label className="r">R</label><input  id="Red" type="range" min="0"   max="255" onChange={this.RGB} className="custom-range"></input>
                <br></br>
                <label className="g">G</label><input  id="green" type="range" min="0"  max="255" onChange={this.RGB} className="custom-range"></input>
                <br></br>
                <label className="b">B</label><input  id="blue" type="range" min="0"   max="255" onChange={this.RGB} className="custom-range"></input>
                </Container>

                <Container className="two">
                    <label className="btn btn-lg btn-success file">Upload!<input id="file" type="file" style={{display: "none"}} onChange={this.upload}></input></label>
                    {/* <label className="btn btn-lg btn-success file" >Upload the image <input type="file" style={{display: "none"}}></input></label> */}
                  
                    
                </Container>
                
                <Container className="three">
                    { this.state.label===true ?  <h3>GrayScale!</h3>: null}
                    <canvas id="canvas" className="can" onClick={this.Color}></canvas>
                    {/* { this.state.label===true ?  <label>FileSize= {this.state.sizeimg} Mb  </label>: null} */}
                    { this.state.label===true ? <h5>FileSize = {this.state.sizeimg}Mb</h5>: null}
                    <canvas style={{display: "none"}} id="canvas1" className="can" onClick={this.Color}></canvas>
                    { this.state.label===true ? <h3>Original!</h3>: null}
                    <img style={{height: "500px"}} src={this.state.image} alt=""></img>
                    {/* { this.state.label===true ?  <label>FileSize= {this.state.sizeimg} Mb  </label>: null} */}
                    { this.state.label===true ? <h5>FileSize = {this.state.sizeimg}Mb</h5>: null}

                </Container>
                
            </div>
            
        )
    }
}
export default mms;