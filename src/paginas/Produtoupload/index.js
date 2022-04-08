import { useState } from 'react';
import firebase from 'firebase';

function Produtoupload() {

    var storage = firebase.storage();
    const [image, setImage] = useState('');

    const [imageAsUrl, setImageAsUrl] = useState('');
    const [progress, setProgress] = useState('');

// luciano

    

    const upload = () => {

        const uploadcom = storage.ref(`/imagens/${image.name}`).put(image)

        if (image == null) return;

        uploadcom.on("state_changed" , function(){

            uploadcom.snapshot.ref.getDownloadURL().then( function (newurl) {
                setImageAsUrl(newurl)
                console.log("url:" + newurl)
            })

        }, function(error){
                console.log("Erro ao salvar arquivo!")
        })
    } 
//

/* codigo wellington

const upload = (imagem) => {
    alert(imagem.nome)
    if (imagem == null) return;
    const onProgress = (snapshot) => {
      setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
    }
    const onError = (error) => console.error(error)
    const onSuccess = () => {
      alert('chamou onSuccess')
      storage
        .ref(`/imagens/${imagem.name}`)
        .getDownloadURL().then((newUrl) => {
          setImageAsUrl(newUrl)
          console.log(imageAsUrl)
          alert(imageAsUrl)

        })
    }
0
    storage.ref(`/imagens/${imagem.name}`).put(imagem)
      .on("state_changed", alert("success"), alert);

    }
*/
    return(
        <div>
            <center>
                <input type="file" onChange={(e) =>{setImage(e.target.files[0])}}/>
                <button onClick={upload}>Upload file</button>
            </center>
        </div>   

    );
}

export default Produtoupload;