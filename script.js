const inputBox = document.querySelector("#input");
const qrImage = document.querySelector("#qrimage");
const imageBox = document.querySelector("#image-box");



function generateQR(){

    if(inputBox.value.length > 0){
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + inputBox.value;
        imageBox.classList.add("show-img");

        document.querySelector("#download").style.display = "block"
    }
    else{
        inputBox.classList.add("error");

        setTimeout(()=>{
            inputBox.classList.remove("error")
        },1000)
    }

}


//Download Any File
function downloadFile(){

    if(imageBox.classList.contains("show-img")){
    // if(inputBox.value.length > 0){

        document.querySelector("#download").innerHTML = "Downloading....";

        let url = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + inputBox.value;

        //Fetching file & returing respnse as blob
        fetch(url).then(res=>
            res.blob())
                .then(file=>{

                    //creates a new url of passed object
                    let tempUrl = URL.createObjectURL(file);

                    let aTag = document.createElement("a");
                    //passing the tempUrl in <a> tag
                    aTag.href = tempUrl;
                    aTag.download = "QR" //file name

                    //adding the <a> tag inside the body
                    document.body.appendChild(aTag)

                    //clicking <a> tag so the file download
                    aTag.click();

                    //removing <a> tag once the file downloaded
                    aTag.remove();

                    //removing the tempUrl from the document
                    URL.revokeObjectURL(tempUrl);

                    document.querySelector("#download").innerHTML = "Download QR";
                })
                .catch(()=>{
                    alert("Unable to Download...")
                })
    }
}
