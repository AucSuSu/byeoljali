import React from 'react';

function FanModal({ onClose, onPay, onDelete, data }) {
  const handleOverlayClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  // 바로 다운 안되는 방법
  // const downloadImage = () => {
  //   const link = document.createElement('a');
  //   link.href = data.photoUrl;
  //   // Propose a default filename for the image. You can also extract the filename from data.photoUrl if it contains one.
  //   link.download = 'downloadedImage.png';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  // 바로 다운 시도
  const downloadImage = (imageSrc) => {
    fetch(imageSrc)
      .then((response) => response.blob()) // 응답을 Blob으로 변환
      .then((blob) => {
        // Blob 객체를 이용해 Object URL 생성
        const url = window.URL.createObjectURL(blob);
        // Object URL을 사용하여 링크 생성
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'downloadedImage.jpg'); // 다운로드될 파일 이름 설정
        // 링크를 DOM에 추가하고 클릭 이벤트 강제 실행
        document.body.appendChild(link);
        link.click();
        // 사용 후 링크 제거
        document.body.removeChild(link);
        // 브라우저 메모리 해제
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => console.error('이미지 다운로드 중 오류 발생:', err));
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick} // Attach the click event handler here
    >
      <div
        className="bg-black w-80 h-auto p-5 rounded relative flex flex-col z-50"
        onClick={(e) => e.stopPropagation()} // Prevent the modal close function when clicking inside the modal content
      >
        {data.pay === 'N' ? (
          <div className="flex flex-col justify-center items-center">
            <div className="self-start mb-5">
              <div className="text-xl  mb-1">사진 결제</div>
              <div className="border-t-2"></div>
            </div>
            <div className="self-start mb-6">11,000원이 결제됩니다.</div>
            <div className="flex mb-7">
              <div className="mr-3">
                <div>결제</div>
                <button
                  className="mx-2 bg-kakao-yellow font-bold py-2 px-4 rounded border"
                  onClick={onPay}
                >
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                      />
                    </svg>
                    <div>pay</div>
                  </div>
                </button>
              </div>
              <div>
                <div>삭제</div>
                <button
                  className="mx-2 bg-red-500 text font-bold py-2 px-4 rounded border"
                  onClick={onDelete}
                >
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    <div>삭제</div>
                  </div>
                </button>
              </div>
            </div>
            <button
              className="w-14 bg-light-gray border rounded"
              onClick={onClose}
            >
              닫기
            </button>
          </div>
        ) : (
          <>
            <img
              src={data.photoUrl}
              alt="팬싸 사진"
              onContextMenu={(e) => e.preventDefault()}
            />
            <button
              className="self-end mt-2"
              onClick={downloadImage(data.photoUrl)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default FanModal;
