import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';
import useAxios from '../../../Web/axios';
import html2canvas from 'html2canvas';

export default function Footer({
  id,
  toggleChat,
  memberFansignId,
  artistFansignId,
  checkChatToggle,
}) {
  const customAxios = useAxios();
  const [count, setCount] = useState(4);
  const [captures, setCaptures] = useState([]);

  useEffect(() => {
    if (count === 0) {
      sendCaptures();
      console.log('사진 전송');
    }
  }, [count]);

  const capture = (id) => {
    checkChatToggle(() => performCapture(id));
  };

  const performCapture = async (id) => {
    if (count > 0) {
      setCount(count - 1);
      captureArea();
    }

    console.log('사진 캡쳐 성공!', id);
  };

  const captureArea = () => {
    if (captures.length < 4) {
      html2canvas(document.querySelector('.bounds')).then((canvas) => {
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCaptures((prevState) => [...prevState, dataUrl]);
      });
    } else {
      alert('사진 4장 다 찍었음');
    }
  };

  const sendCaptures = () => {
    const formData = new FormData();
    captures.forEach((dataUrl, index) => {
      const blob = dataURLtoBlob(dataUrl);
      formData.append(`image${index + 1}`, blob, `capture${index + 1}.jpg`);
    });
    formData.append('memberFansignId', memberFansignId);
    formData.append('artistFansignId', artistFansignId);

    const uploadURL = 'flask/makelife4cut';

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    customAxios
      .post(uploadURL, formData, {
        baseURL: 'https://i10e104.p.ssafy.io/',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
        console.log('Success:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const dataURLtoBlob = (dataUrl) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  };

  return (
    <>
      <div className="bg-black fixed bottom-0 w-full h-15 font-milk text-white font-bold flex items-center justify-between p-4 border-t-2">
        <div>
          <p className="mx-2">남은 촬영 횟수 : {count} / 4</p>
        </div>

        <IconButton onClick={() => capture(id)}>
          <PhotoCameraRoundedIcon className="text-hot-pink rounded-full hover:bg-white hover:scale-[130%]" />
        </IconButton>

        <IconButton onClick={() => toggleChat()}>
          <ChatIcon className="text-hot-pink rounded-full hover:bg-white hover:scale-[130%]" />
        </IconButton>
      </div>
    </>
  );
}
