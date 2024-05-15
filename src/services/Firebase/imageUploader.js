import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import toast from "react-hot-toast";

const uploadImageToFirebase = (image, folderRute) => {
    const metadata = {
        contentType: "image/jpeg",
    };

    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, folderRute + image.name);
        const uploadTask = uploadBytesResumable(storageRef, image, metadata);

        const intervalId = setInterval(() => {
            const progress =
                (uploadTask.snapshot.bytesTransferred /
                    uploadTask.snapshot.totalBytes) *
                100;
            console.log(`Upload of ${image.name} is ${progress}% done`);

            // Check if upload is complete
            if (progress === 100) {
                clearInterval(intervalId);
            }
        }, 500); // Adjust the interval duration as needed

        uploadTask.on(
            "state_changed",
            () => {},
            (error) => {
                clearInterval(intervalId);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        clearInterval(intervalId);
                        console.log("Uploaded URL:", downloadURL);
                        resolve(downloadURL);
                    })
                    .catch((error) => {
                        clearInterval(intervalId);
                        reject(error);
                    });
            }
        );
    });
};

export default uploadImageToFirebase;