import React,{Component} from "react";
import {Container, Button} from "react-bootstrap"

class mms extends Component{
    constructor(){
        super()
        this.state={
            image: null,
            sizeimg: null,
            label: false,
            Color: "Grey",
            save: "",
            size2:"",
            jog:false,
            save2: "",
            newsave:"",
            canvassize: "",
            button: false,
        }
    }

    componentDidUpdate(){
        //this.RGBtoHex();
        //this.size2();
        
    }
    componentDidMount(){
        
    }
   
    upload=(event)=>{
        this.setState({button: true, newsave: null})
        
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
                // let data=canvas.toDataURL("image/jpeg",0.1);
                // document.write('<img src="' + data + '" />');
                // let dataUrl =  canvas.toDataURL('image/jpeg',);
            
                // // this image when saved is
                // document.write('<img src="' + dataUrl + '" />');
            
        }
        this.setState({save: canvas});
        

    }
    downloadsave=()=>{
        this.setState({jog: true});
        var img=this.state.save;
        let test=img.toDataURL("image/jpeg",0.8);
        let Window = window.open('about:blank', 'image from canvas');
        Window.document.write("<img src='"+test+"' alt='from canvas'/>");
        console.log (test.length);
        // let base=test.substr(22);
        // let decode = atob(base);
        // let size = (decode.length/1000)/1024;
        // let calculate=parseFloat(size).toFixed(3);
        // console.log(calculate);
        // this.setState({size2: calculate});
    }

    Size=()=>{
        var img=this.state.save;
        let test=img.toDataURL("img/png");
        let base=test.substr(22);
        let decode = atob(base);
        let size = (decode.length/1000)/1024;
        let calculate=parseFloat(size).toFixed(3);
        console.log(calculate);
    }
    size2=(event)=>{
        
        //console.log(this.state.save2)
        // if(this.state.save === event){
        //     let test=event.toDataURL("img/png");
        //     console.log(test.length);
        //     console.log("test");
        // }
        //let that=this;
        
        //var create = document.createElement("img");
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
        // let save= this.state.newsave;
        // console.log(save);
        // this.setState({jog: true});
        // let data = save.toDataURL("image/jpeg",0.8);
        // // let Window = window.open('about:blank', 'image from canvas');
        // // Window.document.write("<img src='"+data+"' alt='from canvas'/>");
        // console.log(data.length);
        // let size = (data.length/1000)/1024;
        // console.log(size);
        // let calculate=parseFloat(size).toFixed(3);
        // console.log(calculate);
        // this.setState({canvassize: calculate});

        //document.write('<img src="' + data + '" />');

        

        // let test = save.toBlob(function(blob){
        //     let anchor = document.createElement('a');
        //     const url = URL.createObjectURL(blob);
        //     console.log(url,anchor);
        //     anchor.href = url
        //     anchor.download = 'canvas.jpeg'
        //     document.body.appendChild(anchor)
        //     alert(blob.type);
        // },'jpeg',0.1)
        
        
        

    //    var image = new Image();
    //    image.onload=()=>
    //    {
    //     var img=this.state.save;
        
    //     console.log(img);
    //     console.log("loading")
    //    }
            
        
        // window.onload=this.Color=()=>{
        //     var img=this.state.save;
        //     let test=img.toDataURL("img/png");
        //     console.log(test);
        //     console.log("inner")
        // };
        console.log("loadingouter")
        
    }

    newColor=()=>{
        
        const {red,green,blue}=this.RGB();
        var canvas=document.getElementById("canvas");
        var putimage= canvas.getContext("2d");
        var canvastemp=document.getElementById("canvas1");
        var putimagetemp= canvastemp.getContext("2d");
        let img=new Image();
        img.src=this.state.image;
        this.setState({label: true});
        //let hex=this.RGBtoHex();
        img.onload=()=>{
                canvas.width=img.width;
                canvas.height=img.height;
                putimage.drawImage(img,0,0);
                let image=putimage.getImageData(0,0,canvas.width,canvas.height);
        let imgData=image;
        console.log(imgData.data);
        
        var i;
        for (i = 0; i < imgData.data.length; i += 4) {
          var red1 = ((red * imgData.data[i]));
          var green1=(green * imgData.data[i+1]);
          var blue1=(blue * imgData.data[i+2]);
          let combine = (red1 + green1 + blue1);
          //console.log(red1, green1, blue1)
          imgData.data[i] = combine;
          imgData.data[i + 1] = combine;
          imgData.data[i + 2] = combine;
          imgData.data[i + 3] = imgData.data[i + 3];
          
                }
        console.log((imgData.data.length * 3)/4);
        

        canvastemp.width=img.width;
        canvastemp.height=img.height;
        putimagetemp.putImageData(imgData, 0, 0);
        
        this.setState({newsave: canvastemp});
        }
        //let R,G,B;
        
        // let test = canvastemp.toDataURL("img/jpeg",0.5);
        // let base=test.substr(22);
        // let decode = atob(base);
        // let size = (decode.length/1000)/1024;
        // let calculate=parseFloat(size).toFixed(3);
        // console.log(calculate);
        this.size2();
        

    }
    render(){
        return(
            <div>
                <Container fluid style={{backgroundColor:this.state.Color}} className="one">
                    <h3 className="textp">MMS Project!</h3>
                <label className="r">R</label><input  id="Red" type="range" min="0"  step="0.1"  max="1" onChange={this.newColor} className="custom-range"></input>
                <br></br>
                <label className="g">G</label><input  id="green" type="range" min="0" step="0.1" max="1" onChange={this.newColor} className="custom-range"></input>
                <br></br>
                <label className="b">B</label><input  id="blue" type="range" min="0"  step="0.1" max="1" onChange={this.newColor} className="custom-range"></input>
                </Container>

                <Container className="two">
                    <label className="btn btn-lg btn-success file">Upload!<input id="file" type="file" style={{display: "none"}} onChange={this.upload}></input></label>
                    {/* <label className="btn btn-lg btn-success file" >Upload the image <input type="file" style={{display: "none"}}></input></label> */}
                  
                    
                </Container>
                
                <Container className="three">
                    {/* { this.state.jog===true ?  <label>FileSize= {this.state.size2} Mb  </label>: null} */}
                    {/* { this.state.jog===true ? <h5>FileSize = {this.state.size2}Mb</h5>: null} */}
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
                    {/* { this.state.label===true ? <h5>FileSize = {this.state.sizeimg}Mb</h5>: null} */}
                    {/* { this.state.label===true ? <h3 style={{textAlign: "right"}}>Original!</h3>: null} */}
                    </div>
                    
                    </div>
                    
                    {/* { this.state.jog===true ? <h5 style={{float: 'left'}} >FileSize = {this.state.canvassize}Mb</h5>: null} */}

                    {/* { this.state.label===true ? <h5 style={{float: 'right'}}>FileSize = {this.state.sizeimg}Mb</h5>: null} */}

                    {/* { this.state.label===true ?  <label>FileSize= {this.state.sizeimg} Mb  </label>: null} */}
                    {/* <a href="#" className="btn btn-lg btn-success" onClick={(e)=>this.downloadsave(e)}>Save</a> */}
                    {/* {this.state.label===true ? <Button onClick={this.size2} >Size</Button>: null} */}
                    <div style={{textAlign: "center"}}> 
                    { this.state.button===true ? <Button  onClick={this.newColor}>Convert to Grayscale!</Button>: null}
                    </div>
                    
                </Container>

                {/* <Container style={{textAlign: "center"}}>
                    <div>
                    <div >
                    { this.state.label===true ? <h3>Original!</h3>: null}
                    <img className="can"  src={this.state.image} alt=""></img>
                    
                    </div>
                    
                    <div>
                    { this.state.label===true ? <h3 style={{float: 'left'}}>GrayScale!</h3>: null}
                    <canvas style={{display: "none"}} id="canvas" className="can" onClick={()=>{this.newColor()}}></canvas>
                    <canvas  id="canvas1" onClick={this.newColor} className="can"></canvas>
                    </div>
                    </div>
                </Container> */}
            </div>
            
        )
    }
}
export default mms;