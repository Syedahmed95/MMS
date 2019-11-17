import React from "react";
import {Container, Button} from "react-bootstrap"

class mms extends React.Component{
    constructor(){
        super()
        this.state={
            image: null,
            sizeimg: null,
            label: false,
            Color: "Grey",
            jog:false,
            newsave:"",
            canvassize: "",
            button: false,
            R:0.3, G:0.5, B:0.1,
            slider: false,

        }
    }
    upload=(event)=>{
        this.setState({button: true})
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
    
    size2=(event)=>{
     
        setTimeout(()=>{
            let save= this.state.newsave;
        console.log(save);
        this.setState({jog: true});
        let data = save.toDataURL("image/jpeg",0.7);
        // let Window = window.open('about:blank', 'image from canvas');
        // Window.document.write("<img src='"+data+"' alt='from canvas'/>");
        console.log(data.length);
        let size = (data.length/1000)/1024;
        console.log(size);
        let calculate=parseFloat(size).toFixed(3);
        console.log(calculate);
        this.setState({canvassize: calculate});

        },100);
   
        console.log("loadingouter")
        
    }

    newColor=()=>{
        
        this.setState({slider: true});
        var canvas=document.getElementById("canvas");
        var putimage= canvas.getContext("2d");
        var canvastemp=document.getElementById("canvas1");
        var putimagetemp= canvastemp.getContext("2d");
        let img=new Image();
        img.src=this.state.image;
        this.setState({label: true});
        img.onload=()=>{
                canvas.width=img.width;
                canvas.height=img.height;
                putimage.drawImage(img,0,0);
                let image=putimage.getImageData(0,0,canvas.width,canvas.height);
        let imgData=image;
        console.log(imgData);
        
        var i;
        for (i = 0; i < imgData.data.length; i += 4) {
          var red1 = ((this.state.R * imgData.data[i]));
          var green1=(this.state.G * imgData.data[i+1]);
          var blue1=(this.state.B * imgData.data[i+2]);
          let combine = (red1 + green1 + blue1);
          //console.log(red1, green1, blue1)
          imgData.data[i] = combine;
          imgData.data[i + 1] = combine;
          imgData.data[i + 2] = combine;
          imgData.data[i + 3] = imgData.data[i + 3];
          }

        canvastemp.width=img.width;
        canvastemp.height=img.height;
        putimagetemp.putImageData(imgData, 0, 0);
        
        this.setState({newsave: canvastemp});

        }
     
        this.size2();

    }
    
    change=(event)=>{
        event.preventDefault();
        //console.log(event);
        // this.setState({R: event.target.value},console.log(this.state.R));
        // this.setState({G: event.target.value}, console.log(this.state.G));
        if(this.state.slider===true){
            this.setState({
                [event.target.name]:event.target.value
            }, this.newColor())
        }
       
        
        
    }

    render(){
        return(
            <div>
                <Container fluid style={{backgroundColor:this.state.Color}} className="one">
                    <h3 className="textp">MMS Project!</h3>
                <label className="r">R</label><input name="R" value={this.state.R} id="Red" type="range" min="0"  step="0.1"  max="1" onChange={this.change} className="custom-range"></input>
                <br></br>
                <label className="g">G</label><input name="G" value={this.state.G} id="green" type="range" min="0"  step="0.1"  max="1" onChange={this.change} className="custom-range"></input>
                <br></br>
                <label className="b">B</label><input name="B" value={this.state.B} id="blue" type="range" min="0"  step="0.1" max="1" onChange={this.change} className="custom-range"></input>

                </Container>

                <Container className="two">
                    <label className="btn btn-lg btn-success file">Upload!<input id="file" type="file" style={{display: "none"}} onChange={this.upload}></input></label>
                    
                </Container>
                
                <Container className="three">
                    <div style={{display: "flex"}}>
                    <div> 
                    { this.state.button===true ? <h3>Original</h3>: null}
                    <img className="can"  src={this.state.image} alt=""></img>
                    { this.state.button===true ? <h5>FileSize = {this.state.sizeimg}Mb</h5>: null}
                    </div>
                    <div>
                    { this.state.label===true ? <h3>Grayscale</h3>: null}
                    <canvas style={{display: "none"}} id="canvas" className="can" onClick={()=>{this.newColor()}}></canvas>
                    <canvas  id="canvas1" className="can"></canvas>
                    { this.state.jog===true ? <h5 >FileSize = {this.state.canvassize}Mb</h5>: null}
                    </div>
                    
                    </div>

                    <div style={{textAlign: "center"}}> 
                    { this.state.button===true ? <Button  onClick={this.newColor}>Convert to Grayscale!</Button>: null}
                    </div>
                    
                </Container>
                
                </div>
            
        )
    }
}
export default mms;