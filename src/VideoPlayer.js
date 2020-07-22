import React, { useEffect, useRef, useState } from 'react'
import videojs from 'video.js'
import { Card, Box } from '@material-ui/core'
import 'video.js/dist/video-js.css'

const VideoPlayer = ({ src }) => {
  const playerRef = useRef();

//   useEffect(()=> {    
//     // The mjpeg url.
//     const url = src;

//     const SOI = new Uint8Array(2);
//     SOI[0] = 0xFF;
//     SOI[1] = 0xD8;
//     const CONTENT_LENGTH = 'Content-Length';
//     const TYPE_JPEG = 'image/jpeg';

//     fetch(url)
//     .then(response => {
//         if (!response.ok) {
//             throw Error(response.status+' '+response.statusText)
//         }

//         if (!response.body) {
//             throw Error('ReadableStream not yet supported in this browser.')
//         }
        
//         const reader = response.body.getReader();
//         console.log(response)

//         let headers = '';
//         let contentLength = -1;
//         let imageBuffer = null;
//         let bytesRead = 0;

//         const read = () => {
//             reader.read().then(({done, value}) => {
//                 if (done) {
//                     reader.close();
//                     return;
//                 }
                
//                 for (let index = 0; index < value.length; index++) {
                    
//                     // we've found start of the frame. Everything we've read till now is the header.
//                     if (value[index] === SOI[0] && value[index+1] === SOI[1]) {
//                         // console.log('header found : ' + newHeader);
//                         contentLength = getLength(headers);
//                         console.log('taco ' + contentLength)
//                         // console.log("Content Length : " + newContentLength);
//                         imageBuffer = new Uint8Array(new ArrayBuffer(contentLength));
//                     }
//                     // we're still reading the header.
//                     if (contentLength <= 0) {
//                         headers += String.fromCharCode(value[index]);
//                     }
//                     // we're now reading the jpeg. 
//                     else if (bytesRead < contentLength){
//                         imageBuffer[bytesRead++] = value[index];
//                     }
//                     // we're done reading the jpeg. Time to render it. 
//                     else {
//                         // console.log("jpeg read with bytes : " + bytesRead);
//                         // document.getElementById('image').src = URL.createObjectURL(new Blob([imageBuffer], {type: TYPE_JPEG}));
//                         // playerRef.current.src = URL.createObjectURL(new Blob([imageBuffer], {type: TYPE_JPEG}))
//                         console.log(URL.createObjectURL(playerRef.current))
//                         console.log('tacocat')
//                         frames++;
//                         contentLength = 0;
//                         bytesRead = 0;
//                         headers = '';
//                     }
//                 }
//             }).catch(error => {
//                 console.error(error);
//             })
//         }
//                 // calculating fps. This is pretty lame. Should probably implement a floating window function.
//         let frames = 0; 

//         setInterval(() => {
//           console.log("fps : " + frames);
//           frames = 0;
//           read();
//       }, 1000)
//         read()
//     }).catch(error => {
//         console.error(error);
//     })

//     const getLength = (headers) => {            
//         let contentLength = -1;
//         headers.split('\n').forEach((header) => {
//             let pair = header.split(':');
//             console.log(pair[0])
//             console.log(pair[1])
//             console.log(CONTENT_LENGTH)
//             if (pair[0] === CONTENT_LENGTH) {
//             contentLength = pair[1];
//             }
//         })
//         return contentLength;
//     };
//   })

  return (
        <Box className='VideoPlayer' maxWidth='600px'>
        <Card>
          this is the video player :D
            <img                            
                src={src}
                ref={playerRef} 
            />
          this is also the video player :D
        </Card>
      </Box>
  )
}

export default VideoPlayer